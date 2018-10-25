import { Component, Prop } from '@stencil/core';
import { TextAlignemnt } from './interface';
import { getData, getMeta, toArray } from '../../utils';


@Component({
  tag: 'rpc-table',
  styleUrl: 'table.css',
  shadow: true
})
export class Scale {
  data?: string[][];

  @Prop() url: string;
  @Prop() rows: number[] | string;
  @Prop() columns: number[] | string;
  @Prop() switch: boolean;
  @Prop() description: string;
  @Prop() header: number = 1;
  @Prop() footer: number = 0;
  @Prop() scrollY: boolean = true;
  @Prop() source: string;
  @Prop() sourceUrl: string;
  @Prop() tableTitle: string;
  @Prop() tableSubtitle: string;
  @Prop() textAlignment: TextAlignemnt[] | string = 'l';

  async componentWillLoad() {
    this.data = await getData(this);
  }

  getCaption() {
    let items = [];
    if (this.tableTitle)
      items.push(<span class="title">{this.tableTitle}</span>);
    if (this.tableSubtitle)
      items.push(<span class="subtitle">{this.tableSubtitle}</span>);
    if (items.length) return (<caption>{items}</caption>);
  }

  getRow(data: string[], Cell: string) {
    let align = toArray(this.textAlignment).map((a) => {
      return {
        'c': 'center',
        'l': 'left',
        'r': 'right'
      }[a] || a;
    });
    let defaultAlign = align[align.length - 1] || 'left';

    let cells = data.map((value, i) =>
      <Cell class={'align-' + (align[i] || defaultAlign)}>{value}</Cell>);
    return (<tr>{cells}</tr>);
  }

  getSection(data: string[][], Parent: string, Cell: string) {
    if (!data.length) return;
    let rows = data.map((row) => this.getRow(row, Cell));
    return (<Parent>{rows}</Parent>);
  }

  render() {
    let body = [...this.data];
    let head = body.splice(0, this.header);
    let foot = body.splice(body.length - 1 - this.footer, this.footer);

    return ([
      <div class={`wrapper ${(this.scrollY) ? 'scroll-y' : 'no-scroll-y'}`}>
        <table>{[
          this.getCaption(),
          this.getSection(head, 'thead', 'th'),
          this.getSection(body, 'tbody', 'td'),
          this.getSection(foot, 'tfoot', 'td')]}
        </table>
      </div>,
      getMeta(this)
    ]);
  }
}
