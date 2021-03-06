import * as d3Fetch from "d3-fetch";
import Color from 'chartjs-color';


export interface DataElement {
  url: string;
  switch?: boolean;
  rows?: string | number[];
  columns?: string | number[];
}

export interface MetaElement {
  description?: string;
  source?: string;
  sourceUrl?: string;
}

function _filter(i: number, values: number[]) {
  let pos = (values[0] > 0);
  let sign = (pos) ? 1 : -1;
  let match = (values.indexOf((i+1)*sign) !== -1);
  return (pos) ? match : !match;
};

function _toIntArray(values: string | number[]) {
  return (values) ? toArray(values).map((v) => parseInt(v)) : [];
}

export async function getData(el: DataElement) : Promise<string[][]> {
  let data;

  let res = await d3Fetch.csv(el.url);
  data = res.map((row) => res.columns.map((col) => row[col]));
  data.unshift(res.columns);

  // Transpose rows and columns if necessary.
  if (el.switch)
    data = data[0].map((_col, i) => data.map((row) => row[i]));

  // Filter rows and columns.
  let rows = _toIntArray(el.rows);
  let cols = _toIntArray(el.columns);

  if (rows.length) data = data.filter((_row, r) => _filter(r, rows));
  if (cols.length) data = data.map(
    (row) => row.filter((_col, c) => _filter(c, cols)));

  return data;
}

export function toArray(values: string | any[]) {
  return (typeof values === 'string') ? values.split(',') : values;
}

export function toNumericArray(values: string | number[]) {
  return toArray(values).map((v) => parseFloat(v));
}

export function removeUndefined(obj: any) {
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === 'object') removeUndefined(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  }
  return obj;
}

export function setOpacity(color : string, opacity : number = 0.5) {
  return Color(color).alpha(1 - opacity).rgbString();
}

export function rpcColor(color: string | string[]) {
  let colors = {
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
  if (color === undefined) return color;
  return (typeof color === 'string') ?
    colors[color] || color : color.map((c) => colors[c] || c);
}

export function getMeta(el: MetaElement) {
  let items = [];
  if (el.source) {
    let source = (el.sourceUrl) ?
      <a href={el.sourceUrl}>{el.source}</a> : el.source;
    items.push(<p class="source"><strong>Source:</strong> {source}</p>);
  }
  if (el.description)
    items.push(<p class="description">{el.description}</p>);
  if (items.length) return (<div class="meta">{items}</div>);
}
