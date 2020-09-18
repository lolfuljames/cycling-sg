import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: "100%",
  height: "100vh"
};

const center = {
  lat: 1.3878,
  lng: 103.8266
};

export default function Maps() {
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
    const bounds = new window.google.maps.LatLngBounds({lat: 1.17, lng: 103.6}, {lat: 1.46, lng: 104.1});
    map.fitBounds(bounds);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  console.log('done')

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDXyYgpyHPB77RyblUo6jF7WDMLfH0VeS0"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
