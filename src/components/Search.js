import React, { Component } from 'react';
import { OutlinedInput } from '@material-ui/core';
import Script from 'react-load-script';
import SearchIcon from '@material-ui/icons/Search';
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
          // latitude: latitude,
          // longitude: longitude
        }
      );
    }
  }

  // updateQuery = (e) => {
  //   this.setState({
  //     query: e.target.value
  //   })
  // }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEGn6nA3Fp8RZUR4HSQz5KAck0am-JJ5c&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <div>
          <SearchIcon />
          <SearchBar id="autocomplete" placeholder="Search City" hintText="Search City" value={this.state.query}
            style={{
              margin: '0 auto',
              maxWidth: 800,
            }}
          // onChange={() => this.updateQuery}
          />
        </div>
      </div>
    );
  }
}

export default Search;