/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  ChartType,
  InteractionMode,
  PositionType,
  ScaleType,
} from 'chart.js';
import {
  TextAlignemnt,
} from './components/table/interface';


export namespace Components {

  interface RpcChart {
    'animationDuration': number;
    'aspectRatio': number;
    'chartTitle': string;
    'colors': string | string[];
    'columns': string;
    'description': string;
    'fill': boolean | number | string;
    'gridLines': boolean;
    'height': number;
    'labels': string[];
    'legend': boolean;
    'legendPosition': PositionType;
    'lineWidth': number;
    'responsive': boolean;
    'rows': string;
    'source': string;
    'sourceUrl': string;
    'stacked': boolean;
    'switch': boolean;
    'tooltip': boolean;
    'tooltipIntersect': boolean;
    'tooltipMode': InteractionMode;
    'type': ChartType;
    'url': string;
    'width': number;
    'xLabel': string;
    'xType': ScaleType;
    'yLabel': string;
    'yType': ScaleType;
  }
  interface RpcChartAttributes extends StencilHTMLAttributes {
    'animationDuration'?: number;
    'aspectRatio'?: number;
    'chartTitle'?: string;
    'colors'?: string | string[];
    'columns'?: string;
    'description'?: string;
    'fill'?: boolean | number | string;
    'gridLines'?: boolean;
    'height'?: number;
    'labels'?: string[];
    'legend'?: boolean;
    'legendPosition'?: PositionType;
    'lineWidth'?: number;
    'responsive'?: boolean;
    'rows'?: string;
    'source'?: string;
    'sourceUrl'?: string;
    'stacked'?: boolean;
    'switch'?: boolean;
    'tooltip'?: boolean;
    'tooltipIntersect'?: boolean;
    'tooltipMode'?: InteractionMode;
    'type'?: ChartType;
    'url'?: string;
    'width'?: number;
    'xLabel'?: string;
    'xType'?: ScaleType;
    'yLabel'?: string;
    'yType'?: ScaleType;
  }

  interface RpcDataset {
    'backgroundColor': string;
    'borderColor': string;
    'borderWidth': number;
    'data': number[] | string;
    'fill': boolean | number | string;
    'label': string;
    'order': number;
    'pointRadius': number;
    'type': ChartType;
  }
  interface RpcDatasetAttributes extends StencilHTMLAttributes {
    'backgroundColor'?: string;
    'borderColor'?: string;
    'borderWidth'?: number;
    'data'?: number[] | string;
    'fill'?: boolean | number | string;
    'label'?: string;
    'order'?: number;
    'pointRadius'?: number;
    'type'?: ChartType;
  }

  interface RpcScale {
    'autoSkip': boolean;
    'axis': 'x' | 'y';
    'display': boolean;
    'gridLines': boolean;
    'labels': string[] | string;
    'max': number;
    'min': number;
    'offset': boolean;
    'position': PositionType;
    'scaleLabel': string;
    'stacked': boolean;
    'type': ScaleType;
    'weight': number;
  }
  interface RpcScaleAttributes extends StencilHTMLAttributes {
    'autoSkip'?: boolean;
    'axis'?: 'x' | 'y';
    'display'?: boolean;
    'gridLines'?: boolean;
    'labels'?: string[] | string;
    'max'?: number;
    'min'?: number;
    'offset'?: boolean;
    'position'?: PositionType;
    'scaleLabel'?: string;
    'stacked'?: boolean;
    'type'?: ScaleType;
    'weight'?: number;
  }

  interface RpcTable {
    'columns': number[] | string;
    'description': string;
    'footer': number;
    'header': number;
    'rows': number[] | string;
    'scrollY': boolean;
    'source': string;
    'sourceUrl': string;
    'switch': boolean;
    'tableSubtitle': string;
    'tableTitle': string;
    'textAlignment': TextAlignemnt[] | string;
    'url': string;
  }
  interface RpcTableAttributes extends StencilHTMLAttributes {
    'columns'?: number[] | string;
    'description'?: string;
    'footer'?: number;
    'header'?: number;
    'rows'?: number[] | string;
    'scrollY'?: boolean;
    'source'?: string;
    'sourceUrl'?: string;
    'switch'?: boolean;
    'tableSubtitle'?: string;
    'tableTitle'?: string;
    'textAlignment'?: TextAlignemnt[] | string;
    'url'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'RpcChart': Components.RpcChart;
    'RpcDataset': Components.RpcDataset;
    'RpcScale': Components.RpcScale;
    'RpcTable': Components.RpcTable;
  }

  interface StencilIntrinsicElements {
    'rpc-chart': Components.RpcChartAttributes;
    'rpc-dataset': Components.RpcDatasetAttributes;
    'rpc-scale': Components.RpcScaleAttributes;
    'rpc-table': Components.RpcTableAttributes;
  }


  interface HTMLRpcChartElement extends Components.RpcChart, HTMLStencilElement {}
  var HTMLRpcChartElement: {
    prototype: HTMLRpcChartElement;
    new (): HTMLRpcChartElement;
  };

  interface HTMLRpcDatasetElement extends Components.RpcDataset, HTMLStencilElement {}
  var HTMLRpcDatasetElement: {
    prototype: HTMLRpcDatasetElement;
    new (): HTMLRpcDatasetElement;
  };

  interface HTMLRpcScaleElement extends Components.RpcScale, HTMLStencilElement {}
  var HTMLRpcScaleElement: {
    prototype: HTMLRpcScaleElement;
    new (): HTMLRpcScaleElement;
  };

  interface HTMLRpcTableElement extends Components.RpcTable, HTMLStencilElement {}
  var HTMLRpcTableElement: {
    prototype: HTMLRpcTableElement;
    new (): HTMLRpcTableElement;
  };

  interface HTMLElementTagNameMap {
    'rpc-chart': HTMLRpcChartElement
    'rpc-dataset': HTMLRpcDatasetElement
    'rpc-scale': HTMLRpcScaleElement
    'rpc-table': HTMLRpcTableElement
  }

  interface ElementTagNameMap {
    'rpc-chart': HTMLRpcChartElement;
    'rpc-dataset': HTMLRpcDatasetElement;
    'rpc-scale': HTMLRpcScaleElement;
    'rpc-table': HTMLRpcTableElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
