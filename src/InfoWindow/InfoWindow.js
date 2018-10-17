import React, { Component } from 'react';
import PropTypes from 'prop-types';
// A simple component for making elements draggable.
import Draggable from 'react-draggable';

// All Markers Infowindow is draggable with coffee shop info
class InfoWindow extends Component {
  
  static propTypes = {
    place: PropTypes.object.isRequired,
    foursquare: PropTypes.object.isRequired,
    hideInfoWindow: PropTypes.func.isRequired,
  };

  render() {
    const { place } = this.props;

    return (
    <Draggable>
      <div className='info-window' tabIndex='1'>
        <h2 className='info-name'>{place.name}</h2>
        <p
          onClick={() => {this.props.hideInfoWindow()}}
          className='close-window'>X</p>
        <p className='info-address'>Address: {place.location.address}, {place.location.city}</p>
        <p className='info-rating'>Rating: {place.rating} ({place.likes.summary})</p>
        {place.bestPhoto && (
          <img
            className='info-picture'
            arial-label={place.name}
            alt={place.name}
            src={`${place.bestPhoto.prefix}300x200${place.bestPhoto.suffix}`}
            onDragStart={event => event.preventDefault()}></img>
        )}
      </div>
    </Draggable>
    )
  }
}

export default InfoWindow;