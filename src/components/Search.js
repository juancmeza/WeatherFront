import React, { Component } from 'react';
import Script from 'react-load-script';
import SearchBar from 'material-ui-search-bar';

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: '',
      latitude: '',
      longitude: ''
    };

  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(['address_components', 'formatted_address', 'geometry']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  
  handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    const latitude = addressObject.geometry.location.lat();
    const longitude = addressObject.geometry.location.lng();


    if (address) {
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
          latitude: latitude,
          longitude: longitude
        }
      );
    }
    this.props.fetchSelectedForecast(this.state.city)
  }


  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmMaqC6p2dtotPRk_nO-AiHG8uohYYxFI&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        
        <div>
          <SearchBar id="autocomplete" placeholder="Search City" hintText="Search City" value={this.state.query}
            style={{
              margin: '0 auto',
              minWidth: 400,
            }}
          />
        </div>
      </div>
    );
  }
}

export default Search;