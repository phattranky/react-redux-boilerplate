import * as d3 from 'd3';
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import '../../../../scss/routes/d3-view';

class StackedColumn extends Component {

  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    colorRanges: PropTypes.array,
    height: PropTypes.number.isRequired
  }

  test() {

  }

  render() {
    const renderedStackBlock = [];
    const { keys, data, xScale, colorRanges, height } = this.props;
    let previousItemValue = 0;
    const y = d3.scaleLinear()
      .rangeRound([height, 0]);
    y.domain([0, data.total]);

    _.forEach(keys, (keyValue, index) => {
      renderedStackBlock.push(
        <rect
          key={index}
          width={xScale.bandwidth()}
          height={y(data[keyValue])}
          x={xScale(data.date)}
          y={y(previousItemValue) - y(data[keyValue])}
          fill={colorRanges[index]}
        >
        </rect>
      );
      previousItemValue = data[keyValue];
    });

    return (
      <g>
        {renderedStackBlock}
      </g>
    );
  }
}

export default StackedColumn;
