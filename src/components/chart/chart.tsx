import { Component, Element, Prop } from '@stencil/core';
import { default as ChartJS } from 'chart.js';
import { ChartOptions, ChartType, InteractionMode, PositionType, ScaleType }
  from 'chart.js';
import { getData, removeUndefined, setOpacity, toArray, toNumericArray }
  from '../../utils';


const COLORS = {
  red: '#be1e2d',
  blue: '#24abe2',
  lime: '#8dc53f',
  orange: '#f6921e',
  indigo: '#2e3191',
  green: '#009345',
  violet: '#9122bf',
  yellow: '#edd95f',
  gray: '#848484',
  brown: '#754d3f'
};


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

  @Prop() fill: boolean | number | string = false;
  @Prop() stacked: boolean;
  @Prop() tooltip: boolean = true;
  @Prop() tooltipIntersect: boolean = false;
  @Prop() tooltipMode: InteractionMode = 'index';

  async componentDidLoad() {
    let datasetsCreated = await this.createDatasets();
    let scalesCreated = this.createXYScales();
    if (!(datasetsCreated || scalesCreated)) this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    if (this.chart) {

    } else {
      this.chart = new ChartJS(this.canvas.getContext('2d'), {
        type: this.type,
        data: this.getData(),
        options: this.getOptions()
      });
    }
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
        text: this.chartTitle
      },
      tooltips: {
        enabled: this.tooltip,
        mode: this.tooltipMode,
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
            labelString: scale.scaleLabel
          },
          stacked: scale.stacked,
          type: scale.type,
          weight: scale.weight
        };
      });
  }

  getData() {
    let datasets = Array.from(this.canvas.querySelectorAll('rpc-dataset'));
    return {
      labels: toArray(this.labels),
      datasets: datasets.map((dataset) => this.getDataset(dataset))
    };
  }

  getDataset(dataset: HTMLRpcDatasetElement) {
    return removeUndefined({
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
      borderWidth: dataset.borderWidth,
      data: toNumericArray(dataset.data),
      fill: dataset.fill,
      label: dataset.label
    });
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
    let colorName = colors[index % colors.length];
    let color = COLORS[colorName] || colorName

    dataset.backgroundColor = (this.type === 'line' && this.fill != false) ?
      setOpacity(color, 0.5) : color;
    dataset.borderColor = color;
    dataset.data = [];
    dataset.fill = this.fill;
    dataset.label = label;
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

    scale.type = (axis === 'x') ?
      this.xType || 'category' : this.yType || 'linear';

    this.canvas.appendChild(scale);
  }

  render() {
    let canvasAttrs = {};
    if (this.height) canvasAttrs['height'] = this.height;
    if (this.width) canvasAttrs['width'] = this.width;

    return (
      <canvas ref={(r) => this.canvas = r} {...canvasAttrs}>
        <slot />
      </canvas>
    );
  }
}
