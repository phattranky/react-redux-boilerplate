import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

import '../../../../scss/routes/d3-view';

class DivergingBarChart extends Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    chartId: PropTypes.string,
    dateFormat: PropTypes.string,
    tickPadding: PropTypes.number
  }

  static defaultProps = {
    width: 900,
    height: 400,
    tickPadding: 20,
    chartId: 'diverging-chart-default-id',
    dateFormat: '%d %b'
  }

  componentDidMount() {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    const data = [
      {
        name: 'facebok',
        value: 120,
        value2: 300,
        date: new Date('2016-08-05')
      },
      {
        name: 'twitter',
        value: 100,
        value2: 450,
        date: new Date('2016-08-12')
      },
      {
        name: 'instagram',
        value: 1750,
        value2: 2500,
        date: new Date('2016-08-25')
      },
      {
        name: 'youtube',
        value: 80,
        value2: 50,
        date: new Date('2016-08-29')
      }
    ];

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleBand()
      .rangeRound([0, height])
      .padding(0.1)
      .align(0.2);

    const xAxis = d3.axisTop(x);

    const svg = d3.select(this.refs.svgChart)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const maxVal1 = d3.max(data, (d) => (d.value));
    const maxVal2 = d3.max(data, (d) => (d.value2));
    const maxVal = Math.max(maxVal1, maxVal2);

    x.domain([-maxVal, maxVal]);
    y.domain(data.map((d) => d.name));

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => (x(Math.min(0, d.value))))
      .attr('y', (d) => (y(d.name)))
      .attr('width', (d) => (Math.abs(x(d.value) - x(0))))
      .attr('height', y.bandwidth());

    svg.selectAll('.bar2')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar2')
      .attr('x', (d) => (x(Math.min(0, -d.value2))))
      .attr('y', (d) => (y(d.name)))
      .attr('width', (d) => (Math.abs(x(-d.value2) - x(0))))
      .attr('height', y.bandwidth());

    svg.append('g')
        .attr('class', 'x axis')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .append('line')
        .attr('x1', x(0))
        .attr('x2', x(0))
        .attr('y2', height)
        .attr('stroke-width', 1)
        .attr('stroke', '#fff');
  }

  render() {
    return (
      <div className="block-wrapper">
        <div className="diverging-barchart-wrapper">
          <svg
            ref="svgChart"
            id={this.props.chartId}
            width={this.props.width}
            height={this.props.height}
          >
          </svg>
        </div>
      </div>
    );
  }
}

export default DivergingBarChart;
