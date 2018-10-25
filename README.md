# CCRPC Charts and Visualizations

Charts and visualizations for the Champaign County Regional Planning Commission
based on [Chart.js](https://chartjs.org/).

## Tables
The `rpc-table` element creates a table using data from a CSV file.

### Parameters
The `rpc-table` element accepts the following parameters:

#### Data Parameters
* `url`: path to a CSV file containing the table data
* `rows`: comma-separated list of row numbers to include. Negative numbers
  can be used to remove the corresponding rows.
  Row selection occurs after row/column switching, if enabled.
* `columns`: comma-separated list of column numbers to include.
  Negative numbers can be used to remove the corresponding columns.
  Column selection occurs after row/column switching, if enabled.
* `switch`: switch rows and columns: `false` (default) or `true`

#### Table Formatting Parameters
* `table-title`: table title
* `table-subtitle`: table subtitle
* `header`: number of header rows (default: `1`)
* `footer`: number of footer rows (default: `0`)
* `text-alignment`: comma-separated list of alignment values:
  `left` or `l` (default), `center` or `c`, and `right` or `r`. If the
  list is shorter than the number of columns, the final alignment value
  is used for all subsequent columns.
* `scroll-y`: show a horiontal scroll bar if the table is too wide for the
  content area: `false` or `true` (default)

#### Metadata Parameters
* `description`: summary of the table
* `source`: data source
* `sourceUrl`: data source URL

### Example
```html
<rpc-table url="data.csv"
  table-title="Table Example"
  table-subtitle="Team Results, 2001 - 2005"
  source="CCRPC"
  source-url="https://ccrpc.org/"
  text-alignment="l,r"></rpc-table>
```

## Charts
The `rpc-chart` element creates a chart using the
[Chart.js](https://www.chartjs.org/) JavaScript library.

### Parameters
The `rpc-chart` element accepts the following parameters:

#### Data Parameters
* `url`: path to a CSV file containing the chart data
* `rows`: comma-separated list of row numbers to include. Negative numbers
  can be used to remove the corresponding rows.
  Row selection occurs after row/column switching, if enabled.
* `columns`: comma-separated list of column numbers to include.
  Negative numbers can be used to remove the corresponding columns.
  Column selection occurs after row/column switching, if enabled.
* `switch`: switch rows and columns: `false` (default) or `true`
* `labels`: a comma-separated list of row labels (default: first
  value in each row)

#### Chart Formatting Parameters
* `type`: `bar` (default), `bubble`, `doughnut`, `horizontalBar`, `line`,
  `pie`, `polarArea`, `radar`, or `scatter`
* `chart-title`: chart title
* `colors`: comma-separated list of color names or hexidecimal values
  (default: `red`, `blue`, `lime`, `orange`, `indigo`, `green`, `violet`,
  `yellow`, `gray`, `brown`)
* `animation-duration`: length of animations in seconds (default: `0`)

#### Chart Size Parameters
* `aspect-ratio`: ratio of width to height (default: `2`, ignored if
  `height` and `width` are specified)
* `height`: height in pixels
* `width`: width in pixels
* `responsive`: scale the chart to fit the width of its container:
  `false` or `true` (default)

#### Legend Parameters
* `legend`: `false` or `true` (default)
* `legend-position`: `left`, `right`, `bottom`, or `top` (default)

#### Tooltip Parameters
* `tooltip`: show tooltips: `false` or `true` (default)
* `tooltip-intersect`: only show tooltips when the mouse intersects a chart
  element: `false` (default) or `true`
* `tooltip-mode`: `dataset`, `index`, `label`, `nearest`, `point`, `single`,
  `x-axis`, `x`, or `y` (see the
  [interaction modes documentation](http://www.chartjs.org/docs/latest/general/interactions/modes.html#interaction-modes)
  for details)

#### Metadata Parameters
* `description`: summary of the chart
* `source`: data source
* `sourceUrl`: data source URL

#### Axis Parameters
Charts types with X and Y axes, such as `bar` and `line`, accept the
following additional parameters:

* `grid-lines`: show grid lines: `false` or `true` (default)
* `x-label`: axis label for the x-axis
* `x-type`: x-axis type: `category`, `linear`, `logarithmic`, `radialLinear`
  or `time`
* `y-label`: axis label for the y-axis
* `y-type`: y-axis type: `category`, `linear`, `logarithmic`, `radialLinear`
  or `time`

### Data Preparation
Chart data should be structured with the x-axis values (if applicable) in the
first column, and the y-axis values in subsequent columns. For example:

| Date       | Best    | Good    |
|------------|--------:|--------:|
| 03/05/2015 |   $2.99 |   $2.54 |
| 04/12/2016 |   $3.49 |   $3.22 |
| 06/06/2017 |   $4.25 |   $3.54 |


### Chart Types
The examples below illustrate the use of various chart types. Some types accept
additional parameters.

#### Bar Chart and Horizontal Bar Chart
The `bar` and `horizontalBar` chart types accept the following additional
parameters:

* `stacked`: stacked bars: `false` (default) or `true`

```html
<rpc-chart url="data.csv"
  chart-title="Bar Chart"
  x-label="Year"
  y-label="Score"
  type="bar"
  source="CCRPC"
  source-url="https://ccrpc.org/"></rpc-chart>

<rpc-chart url="data.csv"
  chart-title="Stacked Bar Chart"
  x-label="Year"
  y-label="Score"
  type="bar"
  stacked="true"
  legend-position="right"
  aspect-ratio="3"
  description="These are the results of the team competition for the years 2001 to 2005."></rpc-chart>

<rpc-chart url="data.csv"
  chart-title="Horizontal Bar Chart"
  type="horizontalBar"
  x-label="Score"
  y-label="Year"></rpc-chart>
```

#### Line Chart
The `line` chart type accepts the following additional parameters:

* `line-width`: line width in pixels (default: `2`)
* `fill`: where to begin shading for an area chart: `start`, `end`, `origin`,
  or `false` (default)

```html
<rpc-chart url="data.csv"
  chart-title="Line Chart"
  x-label="Year"
  y-label="Score"
  type="line"></rpc-chart>

<rpc-chart url="data.csv"
  chart-title="Area Chart"
  x-label="Year"
  y-label="Score"
  type="line"
  fill="origin"></rpc-chart>
```

#### Pie Chart and Doughnut Chart
These examples illustrate the use of the `pie` and `doughnut` chart types:

```html
<rpc-chart url="data.csv"
  columns="-3"
  chart-title="Pie Chart"
  type="pie"></rpc-chart>

<rpc-chart url="data.csv"
  columns="-2"
  chart-title="Doughnut Chart"
  type="doughnut"></rpc-chart>
```

#### Scatter Chart
This example illustrates the use of the `scatter` chart type:

```html
<rpc-chart url="data.csv"
  chart-title="Scatter Chart"
  type="scatter"
  x-label="Score"
  y-label="Year"
  tooltip-mode="nearest"></rpc-chart>
```

### Advanced Charts
Advanced charts can be created using the `rpc-dataset` and `rpc-scale` elements.
These elements can add to or override the datasets and scales automatically
generated by the `rpc-chart` element.

#### Custom Datasets
The `rpc-dataset` element accepts the following parameters:

* `background-color`: a fill color name or hexidecimal value
* `border-color`: a line color name or hexidecimal value
* `border-width`: width of the line in pixels
* `data`: a comma-separated list of values
* `fill`: where to begin shading for an area chart: `start`, `end`, `origin`,
  or `false` (default)
* `label`: dataset label used in the legend
* `order`: controls the order of this dataset compared to other datasets
  in the chart (default: `0`)
* `point-radius`: the radius of the points in line or scatter charts
* `type`: `bar` (default), `bubble`, `doughnut`, `horizontalBar`, `line`,
  `pie`, `polarArea`, `radar`, or `scatter`

In this example, a line dataset is overlaid on a bar chart:

```html
<rpc-chart url="data.csv"
  chart-title="Multiple Types Chart"
  x-label="Year"
  y-label="Score"
  type="bar">
  <rpc-dataset label="Baseline"
    type="line"
    data="4,4,4,4,4"
    fill="false"
    border-color="lime"
    point-radius="0"></rpc-dataset>
</rpc-chart>
```

#### Custom Scales
The `rpc-scale` element accepts the following parameters:

* `auto-skip`: automatically drop some labels when space is limited:
  `false` or `true` (default)
* `axis`: `x` or `y`
* `display`: show the scale: `false` or `true` (default)
* `grid-lines`: show grid lines: `false` or `true` (default)
* `labels`: comma-separated list of tick labels
* `max`: maximum tick value
* `min`: minimum tick value
* `offset`: add extra space between the ends of the scale and the chart edge:
  `false` or `true`
* `position`: `left`, `right`, `bottom`, or `top`
* `scale-label`: label for the entire scale
* `stacked`: stacked bars: `false` or `true`
* `type`: scale type: `category`, `linear`, `logarithmic`, `radialLinear`
  or `time`
* `weight`: used to sort scales (higher = further from the chart area)

## Credits
CCRPC Charts was developed by Matt Yoder for the [Champaign County Regional
Planning Commission](https://ccrpc.org/).

## License
CCRPC Charts is available under the terms of the [BSD 3-clause
license](https://github.com/champaigncountyrpc/ccrpc-charts/blob/master/LICENSE.md).
