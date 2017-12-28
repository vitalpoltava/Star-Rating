import React from 'react';
import Star from './star';
import '../styles/stars.css'

/**
 * @name Stars
 * @description
 * Component to display all rating items (stars by default)
 *
 */
class Stars extends React.Component {
  constructor(props) {
    super(props);

    this.selectedColor = props['sel-color'] || 'gold';
    this.backColor = props['back-color'] || 'white';
    this.starBackColor = props['item-back-color'] || 'lightgray';
    this.radius = parseInt(props['radius'], 10) || 30;
    this.items = parseInt(props['items'], 10) || 5;
    this.percent = parseInt(props['percent'], 10) || 0;
    this.starsSelected = parseFloat(props['items-selected']) || 0;
    this.disabled = !!props['disabled'];
    this.type = props['type'] || 'star';
    this.exposeStarsState = props['exposeStarsState'] || (() => {});

    this.securedWidth = this.starsSelected ? 100 / this.items * this.starsSelected + '%' : this.percent + '%';

    // initial rating state setup
    this.state = {
      selectedWidth: this.securedWidth,
      percent: this.percent,
      starsSelected: this.starsSelected,
    }
  }

  componentDidMount() {
    this.elDimensions = this.nativeEl.getBoundingClientRect();
  }

  componentDidUpdate() {
    // Here we expose component's state outside
    this.exposeStarsState(this.state);
  };

  leaveRating = () => {
    this.percent = parseInt(this.securedWidth, 10);
    this.starsSelected = this.percent / (100 / this.items);

    this.setState({
      selectedWidth: this.securedWidth,
      percent: this.percent,
      starsSelected:this.starsSelected,
    });
  };

  secureNewRating = () => {
    if (!this.disabled) {
      this.securedWidth = this.percent + '%';
    }
  };

  changeRating = event => {
    if (!this.disabled) {
      this.percent = parseInt(this.state.selectedWidth, 10) / this.radius * 2 * this.items;
      this.starsSelected = this.percent / (100 / this.items);

      this.setState({
        selectedWidth: event.clientX - this.elDimensions.left + 'px',
        percent: this.percent,
        starsSelected:this.starsSelected,
      });
    }
  };

  render() {
    const itemsIterative = Array.from(Array(this.items).keys());
    const styleWrapper = {backgroundColor: this.starBackColor};
    const styleSelected = {width: this.state.selectedWidth, backgroundColor: this.selectedColor};

    return (
      <div
        className="stars"
        style={styleWrapper}
        onMouseMove={this.changeRating}
        onMouseLeave={this.leaveRating}
        onClick={this.secureNewRating}
        ref={wrapper => this.nativeEl = wrapper}>
        <div className="stars-selected" style={styleSelected}/>
        {itemsIterative.map(item =>
          <Star
            key={item}
            type={this.type}
            backColor={this.backColor}
            radius={this.radius}/>)}
      </div>
    )
  }
}

export default Stars;
