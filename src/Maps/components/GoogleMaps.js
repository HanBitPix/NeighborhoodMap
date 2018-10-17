import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GoogleMaps = withScriptjs(withGoogleMap(props => (
  
  <GoogleMap
    defaultZoom={10}
    defaultCenter={props.places.length > 0 ? props.places[0] : {lat: 38.495944, lng: -121.522069}}
    defaultOptions={{mapTypeControl: false}}
    onClick={props.hideInfoWindow}
    >
    {props.isMarkerShown && (props.places.map((place, index) =>
      <Marker
        key={index}
        position={place}
        animation={place.clicked ?
          window.google.maps.Animation.BOUNCE : 0}
        onClick={() => {props.onMarkerClick(index)}} /> ))
    }
  </GoogleMap>
)
))

export default GoogleMaps;