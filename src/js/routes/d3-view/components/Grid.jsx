import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

class Grid extends Component {

  static propTypes = {
    h: PropTypes.number,
    grid: PropTypes.func,
    gridType: PropTypes.oneOf(['x', 'y'])
  }

  constructor(props) {
    super(props);

    this.renderGrid = this.renderGrid.bind(this);
  }

  componentDidMount() {
    this.renderGrid();
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  renderGrid() {
    d3.select(this.refs.grid).call(this.props.grid);
  }

  render() {
    const { h, gridType } = this.props;
    const translate = `translate(0,${h})`;

    return (
      <g ref="grid" className="y-grid" transform={gridType === 'x' ? translate : ''}>
      </g>
    );
  }
}

export default Grid;
