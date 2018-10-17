import React, { Component } from 'react';
import GoogleMaps from './components/GoogleMaps';
import PropTypes from "prop-types";

// When has been loaded successfully, change to true
function onMapLoaded() {
  console.log('map loaded and working');
  window.isMapLoaded = true;
}

class Map extends Component {

  static propTypes = {
    places: PropTypes.array.isRequired,
    hideInfoWindow: PropTypes.func.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    onError: PropTypes.func
  };

  componentDidMount() {
    // Default value to false
    window.isMapLoaded = false;

    // When map is loaded, set to true
    window.onMapLoaded = onMapLoaded;

    // Safe Zone | After 10 seconds, if the map has not be loaded, than error would show
    setTimeout(() => {
      if (!window.isMapLoaded) {
        this.props.onError();
      }
    }, 10000);
  }

  render() {
    return <div
      role='region'
      aria-label='map'
      className='map-container'
      style={{marginLeft: '250px'}}>
      <GoogleMaps
        isMarkerShown={this.props.places.length > 0}
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBH22_gy7-nw4S4g9sDyB61Cz8MDwMI1pY&v=3.exp&libraries=geometry,drawing,places&callback=onMapLoaded'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        places={this.props.places}
        hideInfoWindow={this.props.hideInfoWindow}
        onMarkerClick={this.props.onMarkerClick}
      />
    </div>;
  }
}

// AIzaSyDMN3vYLdl_ef-N6qMbeonQm-nThMg_ZV8

export default Map;