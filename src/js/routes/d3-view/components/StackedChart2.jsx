import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import '../../../../scss/routes/d3-view';

import StackedColumn from './StackedColumn';
import Axis from './Axis';

class StackedChart extends Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    chartId: PropTypes.string,
    dateFormat: PropTypes.string,
    tickPadding: PropTypes.number,
    colorRanges: PropTypes.array
  }

  static defaultProps = {
    width: 900,
    height: 400,
    tickPadding: 20,
    chartId: 'stacked-chart-default-id',
    dateFormat: '%d %b',
    colorRanges: ['#72CAFA', '#FBB4AE', '#249AB8', '#ACF6E3']
  }

  renderStackedColumn(data, keys, xScale, yScale, index) {
    return (
      <StackedColumn
        xScale={xScale}
        yScale={yScale}
        keys={keys}
        data={data}
        key={index}
        height={(data.total / this.subTotal * this.props.height)}
        colorRanges={this.props.colorRanges}
      />
    );
  }

  render() {
    // Transform svg, chart position
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    // Scale data
    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .align(0.1);

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);

    const data = {
      columns: ['adword', 'facebook', 'instagram', 'twitter'],
      dataSet: [{
        adword: 1500,
        facebook: 2000,
        instagram: 1250,
        twitter: 2800,
        date: new Date('2016-08-05')
      }, {
        adword: 2150,
        facebook: 1200,
        instagram: 2250,
        twitter: 2200,
        date: new Date('2016-08-12')
      }, {
        adword: 2650,
        facebook: 2200,
        instagram: 1250,
        twitter: 1500,
        date: new Date('2016-08-25')
      }, {
        adword: 1150,
        facebook: 2600,
        instagram: 2650,
        twitter: 2200,
        date: new Date('2016-08-29')
      }]
    };

    _.forEach(data.dataSet, (item) => {
      let total = 0;
      _.forEach(data.columns, (socialItem) => {
        total += item[socialItem];
      });
      _.assign(item, { total });
    });

    this.subTotal = d3.max(data.dataSet, (d) => (d.total));

    x.domain(data.dataSet.map((d) => (d.date)));
    y.domain([0, this.subTotal]);

    const renderedColumnStack = [];
    _.forEach(data.dataSet, (item, index) => {
      renderedColumnStack.push(this.renderStackedColumn(item, data.columns, x, y, index));
    });

    // Axis - Start
    const yAxis = d3.axisLeft()
      .scale(y)
      .ticks(5);

    const xAxis = d3.axisBottom()
      .scale(x)
      .ticks(4);
    // Axis - End

    return (
      <div className="block-wrapper">
        <div className="stacked-chart-wrapper">
          <svg id={this.props.chartId} width={this.props.width} height={this.props.height}>
            {renderedColumnStack}
            <Axis h={height} axis={yAxis} axisType="y" />
            <Axis h={height} axis={xAxis} axisType="x" />
          </svg>
        </div>
      </div>
    );
  }
}

export default StackedChart;
