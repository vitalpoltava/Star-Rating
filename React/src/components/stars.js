import React from 'react';
import Star from './star';
import '../styles/stars.css'

class Stars extends React.Component {
  constructor(props) {
    super(props);

    this.selectedColor = props['sel-color'] || 'gold';
    this.backColor = props['back-color'] || 'white';
    this.starBackColor = props['item-back-color'] || 'lightgray';
    this.radius = parseInt(props['radius'], 10) || 30;
    this.items = parseInt(props['items'], 10) || 5;
    this.percent = (props['percent'] || '0') + '%';
    this.starsSelected = parseFloat(props['items-selected']) || 0;
    this.disabled = !!props['disabled'];
    this.type = props['type'] || 'star';
    this.securedWidth = this.starsSelected ? 100 / this.items * this.starsSelected + '%' : this.percent;

    // initial rating setup
    this.state = {
      selectedWidth: this.securedWidth,
    }
  }

  componentDidMount() {
    this.elDimensions = this.nativeEl.getBoundingClientRect();
  }

  leaveRating = () => {
    this.setState({selectedWidth: this.securedWidth});
  };

  secureNewRating = () => {
    if (!this.disabled) {
      this.securedWidth = this.percent;
    }
  };

  changeRating = (e) => {
    if (!this.disabled) {
      this.setState({selectedWidth: e.clientX - this.elDimensions.left + 'px'});
      this.percent = parseInt(this.state.selectedWidth, 10) / this.radius * 2 * this.items + '%';
    }
  };

  render() {
    const itemsIterative = Array.from(Array(this.items).keys());
    const stylesWrapper = {backgroundColor: this.starBackColor};
    const stylesSelected = {width: this.state.selectedWidth, backgroundColor: this.selectedColor};

    return (
      <div
        className="stars"
        style={stylesWrapper}
        onMouseMove={this.changeRating}
        onMouseLeave={this.leaveRating}
        onClick={this.secureNewRating}
        ref={wrapper => this.nativeEl = wrapper}>
        <div className="stars-selected" style={stylesSelected}/>
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