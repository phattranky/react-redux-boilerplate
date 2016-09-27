import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import '../../../../scss/routes/d3-view';

class GroupedBarChart extends Component {

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
    chartId: 'stacked-chart-default-id',
    dateFormat: '%d %b'
  }

  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    // Transform svg, chart position
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    // const transform = `translate(${margin.left}, ${margin.top})`;

    // Modify UI
    const svg = d3.select(this.refs.svgChart);
    // const g = svg.append('g').attr('transform', transform);

    // Scale data
    const x0 = d3.scaleBand()
      .rangeRound([0, width], 0.1);
    const x1 = d3.scaleBand();
    const y = d3.scaleLinear()
      .range([height, 0]);
    const color = d3.scaleOrdinal()
      .range(['#72CAFA', '#FBB4AE', '#249AB8', '#ACF6E3']);

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

    const xAxis = d3.axisBottom()
      .scale(x0);

    const yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat(d3.format('.2s'));

    data.dataSet.forEach((d) => {
      _.assign(d, {
        socials: data.columns.map((name) => (
          {
            name,
            value: d[name]
          }
        ))
      });
    });

    x0.domain(data.dataSet.map((d) => (d.date)));
    x1.domain(data.columns).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data.dataSet,
      (d) => (d3.max(d.socials, (d2) => (d2.value))))]);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Population');

    const dateData = svg.selectAll('.date-data')
      .data(data.dataSet)
      .enter()
      .append('g')
        .attr('class', 'state')
        .attr('transform', (d) => (`translate(${x0(d.date)},0)`));

    dateData.selectAll('rect')
      .data((d) => {
        console.log('DDDDD ', d);
        return d.socials;
      })
      .enter()
      .append('rect')
        .attr('width', x1.bandwidth())
        .attr('x', (d) => (x1(d.name)))
        .attr('y', (d) => (y(d.value)))
        .attr('height', (d) => (height - y(d.value)))
        .style('fill', (d) => (color(d.name)));
  }

  handleMouseMove(d) {
    const xPosition = d3.mouse(this.refs.svgChart)[0] - 15;
    const yPosition = d3.mouse(this.refs.svgChart)[1] - 25;
    this.tooltip.attr('transform', `translate(${xPosition}, ${yPosition})`);
    this.tooltip.select('text').text(d[1]);
  }

  render() {
    return (
      <div className="block-wrapper">
        <div className="grouped-chart-wrapper">
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

export default GroupedBarChart;
