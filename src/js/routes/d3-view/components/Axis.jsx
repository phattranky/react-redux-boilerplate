import React, { Component } from 'react';
import * as d3 from 'd3';

class Axis extends Component {

  static propTypes = {
    h: React.PropTypes.number,
    axis: React.PropTypes.func,
    axisType: React.PropTypes.oneOf(['x', 'y'])
  }

  constructor(props) {
    super(props);

    this.renderAxis = this.renderAxis.bind(this);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    d3.select(this.refs.axis).call(this.props.axis);
  }

  render() {
    const { h, axisType } = this.props;
    const translate = `translate(0,${h})`;

    return (
      <g ref="axis" className="axis" transform={axisType === 'x' ? translate : ''}>
      </g>
    );
  }
}

export default Axis;
