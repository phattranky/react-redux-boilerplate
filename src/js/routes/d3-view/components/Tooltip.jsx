import React, { Component, PropTypes } from 'react';

class Tooltip extends Component {

  static propTypes = {
    tooltip: PropTypes.object
  }

  static defaultProps = {
    tooltip: {
      display: false,
      data: {
        key: '',
        value: ''
      }
    }
  }

  render() {
    const { tooltip } = this.props;

    let visibility = 'hidden';
    let transform = '';
    let x = 0;
    let y = 0;
    const width = 150;
    const height = 70;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const translateHeight = halfHeight - 5;
    const transformText = `translate(${halfWidth},${translateHeight})`;
    let transformArrow = '';

    if (tooltip.display) {
      const position = tooltip.pos;
      x = position.x;
      y = position.y;
      visibility = 'visible';
      if (y > height) {
        const translateWidth = x - halfWidth;
        const yTranslateHeight = y - height - 20;
        const arrowTranslateWidth = x - halfWidth;
        const arrowTranslateHeight = height - 2;
        transform = `translate(${translateWidth},${yTranslateHeight})`;
        transformArrow = `translate(${arrowTranslateWidth},${arrowTranslateHeight})`;
      } else if (y < height) {
        const translateWidth = x - halfWidth;
        const yTranslateHeight = Math.round(y) + 20;
        const arrowTranslateWidth = halfWidth - 20;
        transform = `translate(${translateWidth}, ${yTranslateHeight})`;
        transformArrow = `translate(${arrowTranslateWidth},0) rotate(180,20,0)`;
      }
    } else {
      visibility = 'hidden';
    }

    return (
      <g transform={transform}>
        <rect
          className="shadow"
          width={width}
          height={height}
          rx="5"
          ry="5"
          visibility={visibility}
          fill="#6391da"
          opacity=".9"
        />
        <polygon
          className="shadow"
          points="10,0 30,0  20,10"
          transform={transformArrow}
          fill="#6391da" opacity=".9"
          visibility={visibility}
        />
        <text
          visibility={visibility}
          transform={transformText}
        >
          <tspan
            x="0"
            textAnchor="middle"
            fontSize="15px"
            fill="#ffffff"
          >
            {tooltip.data.key}
          </tspan>
          <tspan
            x="0"
            textAnchor="middle"
            dy="25"
            fontSize="20px"
            fill="#a9f3ff"
          >
            {`${tooltip.data.value} visits`}
          </tspan>
        </text>
      </g>
    );
  }
}

export default Tooltip;
