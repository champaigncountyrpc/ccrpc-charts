import { Component, Element, Listen, Prop } from '@stencil/core';
import { default as ChartJS } from 'chart.js';
import { ChartOptions, ChartType, InteractionMode, PositionType, ScaleType }
  from 'chart.js';
import { getData, removeUndefined, rpcColor, setOpacity, toArray,
  toNumericArray } from '../../utils';


ChartJS.defaults.global.defaultFontFamily =
  "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

@Component({
  tag: 'rpc-chart',
  styleUrl: 'chart.css',
  shadow: true
})
export class Chart {
  canvas?: HTMLCanvasElement;
  chart?: ChartJS;

  @Element() el: HTMLElement;

  @Prop() animationDuration: number = 0;
  @Prop() aspectRatio: number = 2;
  @Prop() height: number;
  @Prop() width: number;
  @Prop() responsive: boolean = true;

  @Prop({mutable: true}) labels: string[];

  @Prop() url: string;
  @Prop() rows: string;
  @Prop() columns: string;
  @Prop() switch: boolean;

  @Prop() type: ChartType = 'bar';
  @Prop() chartTitle: string;
  @Prop() description: string;
  @Prop() source: string;
  @Prop() sourceUrl: string;

  @Prop() legend: boolean = true;
  @Prop() legendPosition: PositionType = 'top';

  @Prop() colors: string | string[] = [
    'red', 'blue', 'lime', 'orange', 'indigo', 'green',
    'violet', 'yellow', 'gray', 'brown'];
  @Prop() gridLines: boolean;
  @Prop() xLabel: string;
  @Prop() xType: ScaleType;
  @Prop() yType: ScaleType;
  @Prop() yLabel: string;

  @Prop() lineWidth: number = 2;
  @Prop() fill: boolean | number | string = false;
  @Prop() stacked: boolean;
  @Prop() tooltip: boolean = true;
  @Prop() tooltipIntersect: boolean = false;
  @Prop() tooltipMode: InteractionMode;

  async componentDidLoad() {
    let datasetsCreated = await this.createDatasets();
    let scalesCreated = this.createXYScales();
    this.createTable();
    if (!(datasetsCreated || scalesCreated)) this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  @Listen('window:resize')
  handleResize() {
    if (this.responsive) this.chart.resize();
  }

  @Listen('keydown')
  handleKeyDown(e: KeyboardEvent){
    if (this.tooltip && e.key === 't') {
      this.handleTooltipKey();
    } else if (this.legend && !isNaN(+e.key)) {
      this.handleLegendKey(+e.key);
    }
  }

  handleLegendKey(keyNum: number) {
    let chart = this.chart as any;
    let legendItems = chart.legend.legendItems;
    if (keyNum > 0 && keyNum <= legendItems.length)
      chart.options.legend.onClick.bind(chart)({}, legendItems[keyNum - 1]);
  }

  handleTooltipKey() {
    let chart = this.chart as any;
    let datasetIndex = 0;
    let index = -1;
    if (chart.active && chart.active.length > 0) {
      datasetIndex = chart.active[0]._datasetIndex;
      index = chart.active[0]._index;
    }
    index++;

    let target = this.getTooltipTarget(datasetIndex, index);
    if (!target) {
      chart.eventHandler({
        target: this.canvas,
        type: 'mouseout',
        native: true
      });
      return;
    }

    let center = target.getCenterPoint();
    chart.eventHandler({
      target: this.canvas,
      type: 'mousemove',
      x: center.x,
      y: center.y,
      native: true
    });
  }

  getTooltipTarget(d: number, i: number) {
    let chart = this.chart as any;

    let dataset = chart.data.datasets[d];
    if (!dataset) return;
    if (!chart.isDatasetVisible(d)) return this.getTooltipTarget(d + 1, 0);

    let meta = chart.getDatasetMeta(d);
    let element = meta.data[i];
    if (!element && ['point', 'nearest'].indexOf(this.tooltipMode) !== -1)
      return this.getTooltipTarget(d + 1, 0);
    if (element && element.hidden) return this.getTooltipTarget(d, i + 1);

    return element;
  }

  updateChart() {
    let config = {
      type: this.type,
      data: this.getData(),
      options: this.getOptions()
    };

    if (this.chart) this.chart.destroy();
    this.chart = new ChartJS(this.canvas.getContext('2d'), config);
  }

  getOptions() {
    let options : ChartOptions = {
      animation: {
        duration: this.animationDuration
      },
      aspectRatio: this.aspectRatio,
      legend: {
        display: this.legend,
        position: this.legendPosition
      },
      responsive: this.responsive,
      scales: {
        xAxes: this.getAxes('x'),
        yAxes: this.getAxes('y')
      },
      title: {
        display: this.chartTitle != null,
        text: this.chartTitle,
        fontFamily:
          "'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontSize: 18
      },
      tooltips: {
        enabled: this.tooltip,
        mode: this.tooltipMode ||
          (this.type === 'pie' || this.type === 'doughnut') ?
            'nearest' : 'index',
        intersect: this.tooltipIntersect
      }
    };
    return removeUndefined(options);
  }

  getAxes(axis: 'x' | 'y') {
    return Array.from(this.canvas.querySelectorAll('rpc-scale'))
      .filter((scale) => scale.axis === axis)
      .map((scale) => {
        return {
          display: scale.display,
          gridLines: {
            display: scale.gridLines
          },
          labels: toArray(scale.labels),
          ticks: {
            autoSkip: scale.autoSkip,
            max: scale.max,
            min: scale.min
          },
          offset: scale.offset,
          position: scale.position,
          scaleLabel: {
            display: scale.scaleLabel != null,
            labelString: scale.scaleLabel,
            fontStyle: 'bold'
          },
          stacked: scale.stacked,
          type: scale.type,
          weight: scale.weight
        };
      });
  }

  getData() {
    let datasets = this.queryDatasets();

    return {
      labels: toArray(this.labels),
      datasets: datasets.map((dataset) => this.getDataset(dataset))
    };
  }

  getDataset(dataset: HTMLRpcDatasetElement) {
    return removeUndefined({
      backgroundColor: rpcColor(dataset.backgroundColor),
      borderColor: rpcColor(dataset.borderColor),
      borderWidth: dataset.borderWidth,
      data: toNumericArray(dataset.data),
      fill: dataset.fill,
      label: dataset.label,
      pointRadius: dataset.pointRadius,
      type: dataset.type
    });
  }

  queryDatasets() {
    let datasets = [
      ...Array.from(this.canvas.querySelectorAll('rpc-dataset')),
      ...Array.from(this.el.querySelectorAll('rpc-dataset'))
    ];

    let unique = [];
    for (let dataset of datasets)
      if (unique.indexOf(dataset) === -1) unique.push(dataset);

    unique.sort((a, b) => a.order - b.order);
    return unique;
  }

  async createDatasets() {
    if (!this.url) return false;

    let data = await getData(this.url, {
      rows: this.rows,
      columns: this.columns,
      switch: this.switch
    });

    let labels = [];
    let datasets;
    let colors = toArray(this.colors);

    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      if (i == 0) {
        row.shift();
        datasets = row.map((label, j) => this.createDataset(j, label, colors));
      } else {
        labels.push(row.shift());
        for (let j = 0; j < row.length; j++) {
          let dataset = datasets[j];
          if (dataset)
            dataset.data.push(parseFloat(row[j].replace(/[^0-9-\.]/g, '')));
        }
      }
    }

    this.labels = labels;
    return true;
  }

  createDataset(index: number, label: string, colors: string[]) {
    let dataset = document.createElement('rpc-dataset');
    let color = colors[index % colors.length];

    let backgroundColor;
    if (this.type === 'line' && this.fill != false) {
      backgroundColor = setOpacity(rpcColor(color));
    } else if (this.type === 'pie' || this.type === 'doughnut') {
      backgroundColor = colors;
    } else {
      backgroundColor = color;
    }

    dataset.backgroundColor = backgroundColor;
    dataset.borderColor = color;
    dataset.borderWidth = (this.type === 'line') ? this.lineWidth : 0;
    dataset.data = [];
    dataset.fill = this.fill;
    dataset.label = label;
    dataset.order = index + 1;
    this.canvas.appendChild(dataset);
    return dataset;
  }

  createXYScales() {
    if (['line', 'bar', 'horizontalBar', 'bubble', 'scatter']
      .indexOf(this.type) === -1) return false;

    let scales = Array.from(this.canvas.querySelectorAll('rpc-scale'));
    let hasX = false;
    let hasY = false;

    for (let scale of scales) {
      if (scale.axis = 'x') hasX = true;
      if (scale.axis = 'y') hasY = true;
    }

    if (!hasX) this.createXYScale('x');
    if (!hasY) this.createXYScale('y');

    return !hasX || !hasY;
  }

  createXYScale(axis: 'x' | 'y') {
    let scale = document.createElement('rpc-scale');
    scale.axis = axis;
    scale.stacked = this.stacked;

    let label = this[axis + 'Label'];
    if (label) scale.scaleLabel = label;

    let xDefault : ScaleType =
      (this.type === 'horizontalBar') ? 'linear' : 'category';
    let yDefault : ScaleType =
      (this.type === 'horizontalBar') ? 'category' : 'linear';
    scale.type = (axis === 'x') ?
      this.xType || xDefault : this.yType || yDefault;

    this.canvas.appendChild(scale);
  }

  createTable() {
    let rows = toArray(this.labels).map((label) => [label]);
    let header = [this.xLabel || ''];
    let datasets = this.queryDatasets();
    for (let dataset of datasets) {
      let values = toArray(dataset.data);
      for (let r in rows) rows[r].push((values[r] || '').toString());
      header.push(dataset.label);
    }

    let table = document.createElement('table');
    if (this.chartTitle) {
      let caption = document.createElement('caption');
      caption.textContent = this.chartTitle;
      table.appendChild(caption);
    }

    let thead = document.createElement('thead');
    thead.appendChild(this.createRow(header, 'th'));
    table.appendChild(thead);

    let tbody = document.createElement('tbody');
    for (let row of rows) tbody.appendChild(this.createRow(row, 'td'));
    table.appendChild(tbody);

    this.canvas.appendChild(table);
  }

  createRow(values: string[], tag: 'td' | 'th') {
    let tr = document.createElement('tr');
    for (let value of values) {
      let td = document.createElement(tag);
      td.textContent = value;
      tr.appendChild(td);
    }
    return tr;
  }

  getMeta() {
    let items = [];
    if (this.source) {
      let source = (this.sourceUrl) ?
        <a href={this.sourceUrl}>{this.source}</a> : this.source;
      items.push(<p class="source"><strong>Source:</strong> {source}</p>);
    }
    if (this.description)
      items.push(<p class="description">{this.description}</p>);
    if (items.length) return (<div class="meta">{items}</div>);
  }

  hostData() {
    let attrs = {};
    if (this.legend || this.tooltip) attrs['tabindex'] = 0;
    return attrs;
  }

  render() {
    let canvasAttrs = {};
    if (this.height) canvasAttrs['height'] = this.height;
    if (this.width) canvasAttrs['width'] = this.width;

    return ([
      <canvas ref={(r) => this.canvas = r} {...canvasAttrs}>
        <slot />
      </canvas>,
      this.getMeta()
    ]);
  }
}
