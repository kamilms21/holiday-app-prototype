import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { 
      address: '',
      place: ''
     }
  }
 
  handleChange = (address) => {
    this.setState({ address })
    this.props.getLocation(this.state.address)
  }
 
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        console.log(results[0])
        this.setState(() => ({place: results[0].place_id})) 
        return getLatLng(results[0])
      })
      .then((latLng) =>  {
        this.props.getLocation(latLng, this.state.place)
      }
    )
      .catch(error => console.error('Error', error))
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;