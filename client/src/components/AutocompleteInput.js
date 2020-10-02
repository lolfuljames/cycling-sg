
import { Autocomplete } from '@react-google-maps/api';
import React, {Component} from 'react'

class AutocompleteInput extends Component {
  constructor (props) {
    super(props)
    this.setLocation = props.handler
    this.placeholder = props.placeholder
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      var place = this.autocomplete.getPlace()
      this.setLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  render () {
    return (
        <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
            bounds={new window.google.maps.LatLngBounds({lat: 1.17, lng: 103.6}, {lat: 1.46, lng: 104.1})}
        >
            <input
            type="text"
            placeholder={this.placeholder}
            style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
            }}
            />
        </Autocomplete>
    )
  }
}

export default AutocompleteInput