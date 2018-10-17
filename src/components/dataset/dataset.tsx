import { Component, Prop } from '@stencil/core';
import { ChartType } from 'chart.js';


@Component({
  tag: 'rpc-dataset'
})
export class Dataset {
  @Prop() backgroundColor: string;
  @Prop() borderColor: string;
  @Prop() borderWidth: number;
  @Prop() data: number[] | string;
  @Prop() fill: boolean | number | string;
  @Prop() label: string;
  @Prop() type: ChartType;
}
