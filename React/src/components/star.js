import React from 'react';
import '../styles/star.css';
import figures from '../helpers/figures';
import helpers from '../helpers/helpers';

/**
 * Component
 */
class Star extends React.Component {

  componentDidMount() {
    const backColor = this.props.backColor;
    const type = this.props.type || 'star';
    const radius = this.props.radius;
    const ctx = this.refElement.getContext("2d");

    helpers.drawRect(ctx, radius * 2, backColor);
    helpers.drawItem(figures[type] || figures.star,  ctx, radius);
  }

  render() {
    const radius = this.props.radius;

    return (
      <canvas
        className="star"
        ref={ (el) => { this.refElement = el; }}
        height={ radius*2 }
        width={ radius*2 }></canvas>
    )
  }
}

export default Star;