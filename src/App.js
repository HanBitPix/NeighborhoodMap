import React, { Component } from 'react';
import List from './List/List';
import Map from './Maps/Map';
import InfoWindow from './InfoWindow/InfoWindow';
import './App.css';

const FOURSQUARE = require('react-foursquare')({
  clientID: 'QYVXUXG0DCPSW3AATXPZO3GGLMD45DPOB1HUZAVEBJ4HUBVC',
  clientSecret: 'NYMISJCLMJQDZRHFYDZD4NCUMH3ZTDRGCUEMDGHDW34RLX3F'
});
class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  // Set Markers according to received places array
  handleSetMarkers = (places) => {
    this.setState({ places });
  }

  // Handles a marker when clicked on
  handleMarkerClick = (marker) => {
    // 1. Update places and mark the clicked one
    const places = this.state.places.map((p, index) => {
      if (index === marker) {
        p.clicked = true;
      } else {
        p.clicked = false;
      }
      return p;
    });

    // 2. Get info details from external provider
    this.getInfo(this.state.places[marker])
      .then(response => {
        // Set state of the component
        this.setState({
          places: places,
          selectedPlace: response.response.venue
        });

        // Focuses on the selected info window
        document.querySelector('.info-window').focus();
      })
      .catch(error => {
        this.showError();
        console.log(error);
      });
  }

  // Hides the modal window to default value like the rest
  handleHidingInfoWindow = () => {
    // Update places
    const places = this.state.places.map((p, index) => {
      p.clicked = false;
      return p;
    });

    // Updates to default state
    this.setState({ places: places, selectedPlace: null });
  }

  // Get Promise with Foursquare API
  getInfo = (place) => {
    return FOURSQUARE.venues.getVenue({
      'venue_id': place.id
    })
  }

  // Error Modal
  showError = () => {
    const block = document.querySelector('.error');
    block.style.opacity = 1;
    setTimeout(() => {
      block.style.opacity = 0;
    }, 3000);
  }

  render() {
    const placesInfo = this.state.places.map(v => {
      return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked }
    });

    return (
      <div className='app-container'>
        <List
          foursquare={FOURSQUARE}
          setMarkers={this.handleSetMarkers}
          onPlaceClick={this.handleMarkerClick} />
        <Map
          places={placesInfo}
          hideInfoWindow={this.handleHidingInfoWindow}
          onMarkerClick={this.handleMarkerClick}
          onError={this.showError}
           />
        {this.state.selectedPlace && (<InfoWindow
          place={this.state.selectedPlace}
          foursquare={FOURSQUARE}
          hideInfoWindow={this.handleHidingInfoWindow} />)}
        <div
          style={{ opacity: 0 }}
          className='error'>Something went wrong</div>
      </div>
    );
  }
}

export default App;