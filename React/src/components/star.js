import React from 'react';
import '../styles/star.css';
import figures from '../helpers/figures';
import helpers from '../helpers/helpers';

/**
 * @name Star
 * @description
 * Component to display single rating item (star by default)
 *
 */
class Star extends React.Component {
  constructor(props) {
    super(props);

    this.backColor = props.backColor;
    this.type = props.type;
    this.radius = props.radius;
  }

  componentDidMount() {
    const ctx = this.refElement.getContext("2d");

    helpers.drawRect(ctx, this.radius * 2, this.backColor);
    helpers.drawItem(figures[this.type] || figures.star,  ctx, this.radius);
  }

  render() {
    return (
      <canvas
        className="star"
        ref={(el) => {this.refElement = el;}}
        height={this.radius*2}
        width={this.radius*2 }/>
    )
  }
}

export default Star;
