import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

class Dots extends Component {

  static propTypes = {
    data: PropTypes.array,
    x: PropTypes.func,
    y: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.renderCircle = this.renderCircle.bind(this);
  }

  renderCircle(d, i) {
    const { x, y, showTooltip, hideTooltip } = this.props;

    return (<circle
      className="dot"
      r="7"
      cx={x(d.date)}
      cy={y(d.count)}
      fill="#7dc7f4"
      stroke="#3f5175"
      strokeWidth="5px"
      key={i}
      data-key={d3.timeParse('%b %e')(d.date)}
      data-value={d.count}
      onMouseOver={showTooltip}
      onMouseOut={hideTooltip}
    />);
  }

  render() {
    let { data } = this.props;

    // remove last & first point
    data = data.splice(1);
    data.pop();

    return (
      <g>
        {data.map(this.renderCircle)}
      </g>
    );
  }
}

export default Dots;
