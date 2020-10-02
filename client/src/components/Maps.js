import React, { useEffect } from 'react'
import { GoogleMap, LoadScript, Data } from '@react-google-maps/api';

const containerStyle = {
  width: "100%",
  height: "100vh"
};

const center = {
  lat: 1.3878,
  lng: 103.8266
};
const libraries = ["places"]

// function to get boundary points
function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof window.google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof window.google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(function(g) {
      processPoints(g, callback, thisArg);
    });
  }
}

export default function Maps(props) {
  const route = props.route
  const [map, setMap] = React.useState(null)
  const [data, setData] = React.useState(null)
  const [features, setFeatures] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
    console.log("Maps:", map)
    const bounds = new window.google.maps.LatLngBounds({ lat: 1.17, lng: 103.6 }, { lat: 1.46, lng: 104.1 });
    map.fitBounds(bounds);
  }, [])

  useEffect(() => {
    console.log("effect called")
    if (features) {
      for (var i = 0; i < features.length; i++)
        data.remove(features[i]);
    }
    if (data){
      const routeFeature = data.addGeoJson(route)
      setFeatures(routeFeature)
    }
  }, [route])

  const onLoadData = data => {
    setData(data)
    console.log("loaded data")
  }

  // function that runs whenever new route is selected
  const onAddFeatureData = e => {
    console.log("added featuredata: ", e)
    var bounds = new window.google.maps.LatLngBounds();
    processPoints(e.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
    map.setZoom(map.getZoom() * 0.9)
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDXyYgpyHPB77RyblUo6jF7WDMLfH0VeS0"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <>
          <Data onLoad={onLoadData} onAddFeature={onAddFeatureData}/>
        </>
      </GoogleMap>
    </LoadScript>
  )
}
