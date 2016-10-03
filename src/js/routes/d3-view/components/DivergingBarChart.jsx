import _ from 'lodash';
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
    width: 1300,
    height: 400,
    tickPadding: 20,
    chartId: 'diverging-chart-default-id',
    dateFormat: '%d %b'
  }

  componentDidMount() {
    const margin = { top: 20, right: 20, bottom: 20, left: 80 };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    const data = [
      {
        name: 'facebook',
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
        value: 200,
        value2: 100,
        date: new Date('2016-08-25')
      },
      {
        name: 'youtube',
        value: 500,
        value2: 50,
        date: new Date('2016-08-29')
      }
    ];

    const columns = data.map((d) => (d.name));
    const y = d3.scaleBand()
      .rangeRound([0, height])
      .padding(0.1)
      .align(0.2);

    const svg = d3.select(this.refs.svgChart)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(0,${margin.top})`);

    const maxVal1 = d3.max(data, (d) => (d.value));
    const maxVal2 = d3.max(data, (d) => (d.value2));
    const maxVal = Math.max(maxVal1, maxVal2);

    y.domain(data.map((d) => d.name));

    const gTextLegend = svg.append('g');
    gTextLegend.selectAll('g')
      .data(columns)
      .enter()
      .append('text')
      .attr('class', 'text-legend')
      .text((d) => (d))
      .attr('x', () => (0))
      .attr('y', (d) => (y(d) + (y.bandwidth() / 2)));

    const textAreaWidth = gTextLegend.node().getBBox().width;
    const textLegendHeight = gTextLegend.select('text').node().getBBox().height;

    gTextLegend.attr('transform', `translate(0, ${textLegendHeight / 3})`);

    // const gChart = svg.append('g').attr('transform',
    // `translate(${textAreaWidth + margin.right},0)`);
    // gChart.selectAll('.bar')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', () => (x(0)))
    //   .attr('y', (d) => (y(d.name)))
    //   .attr('width', (d) => (Math.abs(x(d.value) - x(0))))
    //   .attr('height', y.bandwidth());

    const self = this;

    const xBarText = d3.scaleLinear().range([0, width - textAreaWidth]);
    xBarText.domain([-maxVal, maxVal]);

    // Positive Bar Text
    const gBarText = svg.append('g');
    gBarText.selectAll('.bar-text').data(data).enter()
        .append('text')
        .attr('class', 'bar-text-1')
        .attr('x', (d) => xBarText(d.value))
        .attr('y', (d) => (y(d.name) + (y.bandwidth() / 2)))
        .text((d) => (d.value));

    const textValueHeight = gBarText.select('text').node().getBBox().height;
    const barTextMaxWidth = d3.max(gBarText.node().querySelectorAll('text'),
      (d) => d.getBBox().width);
    gBarText.attr('transform', `translate(${textAreaWidth},
      ${textValueHeight / 3})`);

    const barTextNodes = gBarText.selectAll('.bar-text-1').nodes();
    _.forEach(barTextNodes, (node) => {
      d3.select(node).attr('transform', `translate(${node.getBBox().width}, 0)`);
    });

    const x = d3.scaleLinear().range([0, width - barTextMaxWidth - textAreaWidth - margin.left]);
    x.domain([-maxVal, maxVal]);
    const xAxis = d3.axisTop(x);

    const gChart = svg.append('g').attr('transform',
    `translate(${textAreaWidth + margin.left},0)`);

    const positiveBar = gChart.selectAll('.bar')
      .data(data);

    positiveBar.enter()
      .append('path')
      .attr('class', 'bar')
      .attr('d', (d) => (self.rightRoundedRect(x(0), y(d.name),
          Math.abs(x(d.value) - x(0)), y.bandwidth(), 20)
      ));
    // End Positive Bar Text

    // gChart.selectAll('.bar2')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'bar2')
    //   .attr('x', (d) => (x(Math.min(0, -d.value2))))
    //   .attr('y', (d) => (y(d.name)))
    //   .attr('width', (d) => (Math.abs(x(-d.value2) - x(0))))
    //   .attr('height', y.bandwidth());
    gChart.selectAll('.bar2')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'bar2')
      .attr('d', (d) => (self.leftRoundedRect(x(Math.min(0, -d.value2)), y(d.name),
          Math.abs(x(-d.value2) - x(0)), y.bandwidth(), 20)
      ));

    const gBarText2 = gChart.append('g');
    gBarText2.selectAll('.bar-text2').data(data).enter()
        .append('text')
        .attr('class', 'bar-text-2')
        .attr('x', (d) => (x(Math.min(0, -d.value2))))
        .attr('y', (d) => (y(d.name) + (y.bandwidth() / 2)))
        .text((d) => d3.format('.3s')(d.value2));

    const barText2Nodes = gBarText2.selectAll('.bar-text-2').nodes();
    _.forEach(barText2Nodes, (node) => {
      d3.select(node).attr('transform', `translate(${-node.getBBox().width}, 0)`);
    });
    // const maxWidthBarTextNode2 = d3.max(barText2Nodes, (d) => (d.getBBox().width));

    gBarText2.attr('transform', `translate(0, ${textValueHeight / 3})`);

    gChart.append('g')
        .attr('class', 'x axis')
        .call(xAxis);

    gChart.append('g')
        .attr('class', 'y axis')
        .append('line')
        .attr('x1', x(0))
        .attr('x2', x(0))
        .attr('y2', height)
        .attr('stroke-width', 1)
        .attr('stroke', '#fff');
  }

  rightRoundedRect(x, y, width, height, radius) {
    return `M${x},${y}h${(width - radius)}
      a${radius}, ${radius} 0 0 1 ${radius},${radius}
      v${(height - 2 * radius)}
      a${radius},${radius} 0 0 1 ${-radius},${radius}
      h${(radius - width)}z`;
  }

  leftRoundedRect(x, y, width, height, radius) {
    return `M${x},${y + radius}
      a${radius}, ${radius} 0 0 1 ${radius},${-radius}
      h${(width - radius)}
      v${(height)}
      h${(radius - width)}
      a${radius},${radius} 0 0 1 ${-radius},${-radius}
      z`;
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
