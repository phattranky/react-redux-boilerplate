import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import '../../../../scss/routes/d3-view';

class StackedChart extends Component {

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

    const transform = `translate(${margin.left}, ${margin.top})`;

    // Modify UI
    const svg = d3.select(`svg#${this.props.chartId}`);
    const g = svg.append('g').attr('transform', transform);

    // Scale data
    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .align(0.1);

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);

    const z = d3.scaleOrdinal()
      .range(['#72CAFA', '#FBB4AE', '#249AB8', '#ACF6E3']);

    const stack = d3.stack();

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

    x.domain(data.dataSet.map((d) => (d.date)));
    y.domain([0, d3.max(data.dataSet, (d) => (d.total))]).nice();
    z.domain(data.columns.slice(1));

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSizeInner(-height)
        .tickFormat((d) => d3.timeFormat(this.props.dateFormat)(d))
        .tickPadding(this.props.tickPadding));

    // Tooltip
    // Prep the tooltip bits, initial display is hidden
    this.tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    this.tooltip.append('rect')
      .attr('width', 30)
      .attr('height', 20)
      .attr('fill', 'white')
      .style('opacity', 0.5);

    this.tooltip.append('text')
      .attr('x', 15)
      .attr('dy', '1.2em')
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold');

    g.append('g').selectAll('.serie')
      .data(stack.keys(data.columns)(data.dataSet))
      .enter()
      .append('g')
        .attr('class', 'serie')
        .attr('fill', (d) => (z(d.key)))
      .selectAll('rect')
      .data((d) => (d))
      .enter()
      .append('rect')
        .attr('x', (d) => (x(d.data.date)))
        .attr('y', (d) => (y(d[1])))
        .attr('height', (d) => (y(d[0]) - y(d[1])))
        .attr('width', x.bandwidth())
      .on('mouseover', () => { this.tooltip.style('display', null); })
      .on('mouseout', () => { this.tooltip.style('display', 'none'); })
      .on('mousemove', this.handleMouseMove);

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10, 's'))
      .append('text')
        .attr('x', 2)
        .attr('y', y(y.ticks(10).pop()))
        .attr('dy', '0.35em')
        .attr('text-anchor', 'start')
        .attr('fill', '#000')
        .text('Cost');

    const legend = g.selectAll('.legend')
      .data(data.columns.reverse())
      .enter()
      .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => (`translate(0,${i * 20})`))
        .style('font', '10px sans-serif');

    legend.append('rect')
        .attr('x', width - 18)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', z);

    legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .text((d) => (d));
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
        <div className="stacked-chart-wrapper">
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

export default StackedChart;
