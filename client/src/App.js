import React, { useState }from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Maps from './components/Maps'
import SidePanel from './components/SidePanel'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  const [chosenRoute, setChosenRoute] = useState(null);
  const [startLocation, setStartLocation] = useState({lat: null, lng: null});
  const [endLocation, setEndLocation] = useState({lat: null, lng: null});
  const [recPOI, setRecPOI] = useState([]);
  const [chosenPOI, setChosenPOI] = useState([]);
  const [POIType, setPOIType] = useState(null);
  const [userLocation, setUserLocation] = React.useState({lat: null, lng: null});

  return (
    <div>
      <Maps userLocation={[userLocation, setUserLocation]} chosenPOI={[chosenPOI, setChosenPOI]} recPOI={[recPOI, setRecPOI]} POIType={[POIType, setPOIType]} route={[chosenRoute, setChosenRoute]} startLocation={[startLocation, setStartLocation]} endLocation={[endLocation, setEndLocation]}/>
      <SidePanel chosenPOI={[chosenPOI, setChosenPOI]} recPOI={[recPOI, setRecPOI]} POIType={[POIType, setPOIType]} chosenRoute={[chosenRoute, setChosenRoute]} startLocation={[startLocation, setStartLocation]} endLocation={[endLocation,setEndLocation]}/>
    </div>
  );
}

export default App;
