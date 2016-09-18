import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import { assign } from 'lodash';
import Dots from './Dots';
import Grid from './Grid';
import Axis from './Axis';
import ToolTip from './Tooltip';

import '../../../../scss/routes/LineChart';

class LineChart extends Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    chartId: PropTypes.string
  }

  static defaultProps = {
    width: 800,
    height: 300,
    chartId: 'line-chart-default-id'
  }

  constructor(props) {
    super(props);

    this.state = {
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        }
      }
    };

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip(e) {
    e.target.setAttribute('fill', '#FFFFFF');

    this.setState({ tooltip: {
      display: true,
      data: {
        key: e.target.getAttribute('data-key'),
        value: e.target.getAttribute('data-value')
      },
      pos: {
        x: e.target.getAttribute('cx'),
        y: e.target.getAttribute('cy')
      }
    }
    });
  }

  hideTooltip(e) {
    e.target.setAttribute('fill', '#7dc7f4');
    this.setState({ tooltip: { display: false, data: { key: '', value: '' } } });
  }

  renderLineChart(data) {
    const margin = { top: 5, right: 50, bottom: 20, left: 50 };
    const w = this.props.width - (margin.left + margin.right);
    const h = this.props.height - (margin.top + margin.bottom);

    const parseDate = d3.timeParse('%m-%d-%Y');

    data.forEach((d) => {
      assign(d, {
        date: parseDate(d.day)
      });
    });

    const x = d3.scaleTime()
      .domain(d3.extent(data, (d) => (
        d.date
      )))
      .rangeRound([0, w]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => (
        d.count + 100
      ))])
      .range([h, 0]);

    // Axis - Start
    const yAxis = d3.axisLeft()
      .scale(y)
      .ticks(5);

    const xAxis = d3.axisBottom()
      .scale(x)
      .tickValues(data.map((d, i) => {
        if (i > 0) {
          return d.date;
        }
        return '';
      }).splice(1))
      .ticks(4);
    // Axis - End

    // Grid - Start
    const yGrid = d3.axisLeft()
      .scale(y)
      .ticks(5)
      .tickSize(-w, 0, 0)
      .tickFormat('');
    // Grid - End

    const line = d3.line()
      .x((d) => (
        x(d.date)
      ))
      .y((d) => (
        y(d.count)
      ));

    const transform = `translate(${margin.left}, ${margin.top})`;

    return (
      <div className="line-chart-wrapper">
        <svg id={this.props.chartId} width={this.props.width} height={this.props.height}>
          <g transform={transform}>
            <Grid h={h} grid={yGrid} gridType="y" />
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
            <path className="line-chart shadow" d={line(data)} strokeLinecap="round" />
            <Dots
              data={data}
              x={x}
              y={y}
              showTooltip={this.showTooltip}
              hideTooltip={this.hideTooltip}
            />
            <ToolTip
              tooltip={this.state.tooltip}
            />
          </g>
        </svg>
      </div>
    );
  }

  render() {
    const data = [
      { day: '02-11-2016', count: 180 },
      { day: '02-12-2016', count: 250 },
      { day: '02-13-2016', count: 150 },
      { day: '02-14-2016', count: 496 },
      { day: '02-15-2016', count: 140 },
      { day: '02-16-2016', count: 380 },
      { day: '02-17-2016', count: 100 },
      { day: '02-18-2016', count: 150 }
    ];

    return (
      <div className="block-wrapper">
        {this.renderLineChart(data)}
      </div>
    );
  }
}

export default LineChart;
