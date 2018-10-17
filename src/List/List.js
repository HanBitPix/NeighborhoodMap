import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';
import PropTypes from 'prop-types';

Geocode.setApiKey('AIzaSyBH22_gy7-nw4S4g9sDyB61Cz8MDwMI1pY');

class List extends Component {

  static propTypes = {
    foursquare: PropTypes.object.isRequired,
    setMarkers: PropTypes.func.isRequired,
    onPlaceClick: PropTypes.func.isRequired,
  };

  state = {
    places: [],
    query: ''
  }
  // Using Google's Geocode with react
  componentDidMount() {
    Geocode.fromAddress("Googleplex").then(
      response => {
        this.props.foursquare.venues.getVenues({
          'near': 'Sacramento, CA',
          'categoryId': '4bf58dd8d48988d1e0931735',
          'limit': 50
        }).then(response => {
          const venues = response.response.venues;
          this.props.setMarkers(venues);
          this.setState({ places: venues });
        });
      }
    );
  }

  // Handles query update in the filter search input
  handleQueryUpdate = (query) => {
    this.setState({ query }, () => {
      const filtered = this.getFilteredCoffeeShops();
      this.props.setMarkers(filtered);
    });
  }

  // Handles Coffee-Menu Button Click | to toggle open | close
  handleCoffeeMenuClick = () => {
    const map = document.querySelector('.map-container');
    map.style.marginLeft = map.style.marginLeft === '250px' ? '0' : '250px';

    const sandwich = document.querySelector('.coffee-menu-button');
    sandwich.style.left = sandwich.style.left === '250px' ? '0' : '250px';
  }

  // Inputs User Searched Places and outputs to query found | filtering
  getFilteredCoffeeShops() {
    const { query, places } = this.state;

    if (!query) {
      return places;
    }

    const match = new RegExp(escapeRegExp(query), 'i');
    return places.filter(p => match.test(p.name));
  }

  // Changes the state of query to the matched input field
  getInputField = () => {
    const { query } = this.state;

    return <input
      tabIndex={1}
      className='filter-places'
      type='text'
      value={query}
      onChange={event => this.handleQueryUpdate(event.target.value)}
      placeholder='Search' />
  }

  // Returns All Coffee Shops Founds near given location
  getPlaceList = () => {
    let filteredPlaces = this.getFilteredCoffeeShops();

    return (
      <ol className='coffee-shops' aria-label='List of places'>
        {filteredPlaces.map((p, index) =>
          <li
            tabIndex={index + 2}
            key={index}
            className='coffee-shop'
            onClick={() => {this.props.onPlaceClick(index)}}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                this.props.onPlaceClick(index);
              }
            }}>
              {p.name}
          </li>
        )}
      </ol>
    )
  }

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div className='heading' role='heading'>
            <h1 className='title'>
              Coffee Shops
            </h1>
            {this.getInputField()}
          </div>
          <div className='coffee-shop-list' role='region'>
            {this.getPlaceList()}
          </div>
        </div>
        <div
          tabIndex='-1'
          style={{left: '250px'}}
          className='coffee-menu-button'
          onClick={this.handleCoffeeMenuClick}>
          <img
            src='coffee-menu.svg'
            alt='Toggle menu' />
        </div>
      </div>
    );
  }
}

export default List;