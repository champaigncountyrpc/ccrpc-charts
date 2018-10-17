import { Component, Prop } from '@stencil/core';
import { PositionType, ScaleType } from 'chart.js';


@Component({
  tag: 'rpc-scale'
})
export class Scale {
  @Prop() autoSkip: boolean = true;
  @Prop() axis: 'x' | 'y';
  @Prop() display: boolean = true;
  @Prop() gridLines: boolean = true;
  @Prop() labels: string[] | string;
  @Prop() max: number;
  @Prop() min: number;
  @Prop() offset: boolean;
  @Prop() position: PositionType;
  @Prop() scaleLabel: string;
  @Prop() stacked: boolean;
  @Prop() type: ScaleType;
  @Prop() weight: number = 0;
}
