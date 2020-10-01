import React, { useState } from 'react'
import './SidePanel.css';
import PresetList from './PresetList'
import CustomRouteMaker from './CustomRouteMaker'
import { Add,Search,ArrowBack }  from '@material-ui/icons';
import { Button } from '@material-ui/core';

function getRouteJsonUrl(startLocation, endLocation) {
    // startLocation [lng, lat]
    // endLocation [lng, lat]
    const url = new URL('https://api.openrouteservice.org/v2/directions/cycling-regular');

    const params = {
        api_key: '5b3ce3597851110001cf62484de2cf33999b4e06a16c3242e98d4443',
        start:  startLocation, //userMarker.position.lng() + ',' + userMarker.position.lat(),
        end: endLocation
      };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}

export default function SidePanel(props) {
    const [setChosenRoute] = props.handlers
    const [presetList, setPresetList] = useState([{name:'hello',
                                                      id: 1,
                                                      area: 'somewhere',
                                                      calories: 400,
                                                      distance: 5320,
                                                      json: "test json here"
                                                     }, 
                                                     {name: 'test',
                                                      id: 2,
                                                      area: 'somewhere2',
                                                      calories: 700,
                                                      distance: 1230,
                                                      json: "test json2 here"
                                                      }])
    const [mode, setMode] = useState('preset')
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);

    function handleChangeButton() {
        if (mode === 'preset') setMode('custom')
        else setMode('preset')
    }

    function handleSearchCustomRoute() {
        if (!startLocation) {
            window.alert("Please enter your start point before proceeding.")
            return
        }
        if (!endLocation) {
            window.alert("Please enter your end point before proceeding.")
            return
        }
        var url = getRouteJsonUrl([startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]);
        fetch(url).then(response => {
            response.json().then(
                routeJson => {
                    console.log(routeJson)
                    setChosenRoute(routeJson)
                }
            )
        })
        console.log('done generating')
        console.log(startLocation)
        console.log(endLocation)
    }

    if (mode === 'preset'){
        return (
            <div id="side-panel-container">
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Button id="custom-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary">Custom Route<Add /></Button>
                    <PresetList presetList={presetList}/>
                </div>
            </div>
        )
    } else {
        return (
            <div id="side-panel-container">
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Button id="preset-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary"><ArrowBack/>Back</Button>
                    <CustomRouteMaker handlers={[setStartLocation, setEndLocation]}/>
                    <Button id="search-route-button" onClick={handleSearchCustomRoute} color="primary" variant="contained" component="span">
                        <Search />
                    </Button>
                    {/* <PresetList presetList={presetList}/> */}
                </div>
            </div>
        )
    }
}
