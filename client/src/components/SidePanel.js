import React, { useEffect, useState } from 'react'
import './SidePanel.css';
import PresetList from './PresetList'
import CustomRouteMaker from './CustomRouteMaker'
import { Add,Search,ArrowBack }  from '@material-ui/icons';
import { Button } from '@material-ui/core';
import axios from 'axios';

/**
 * Get route in GeoJSON format.
 * Returns an axios post request promise.
 * Post request response will be the route (located in data field) in GeoJSON format.
 * 
 * @param {number[][]} coordinates - Array of coordinates including startLocation, endLocation and all POIs (in the format of [lng, lat])
 */
const getRouteGeoJSON = coordinates => {
    let url = 'https://api.openrouteservice.org/v2/directions/cycling-regular/geojson';
    let headers = { Authorization: '5b3ce3597851110001cf62484de2cf33999b4e06a16c3242e98d4443' };
    return axios.post(url, { coordinates: coordinates }, { headers: headers });
}

/**
 * Call backend for POIs recommendation.
 * Returns an axios post request promise.
 * Post request response will be an array of POIs object (located in data field) if successful.
 * 
 * -------------------------WARNING--------------------------
 * | This will be billed every time the function is called. |
 * -------------------------WARNING--------------------------
 * 
 * @param {number[][]} coordinates - Array of coordinates which will be used to search for POIs (in the format of [lat, lng])
 */
const getPOIs = coordinates => axios.post('/poi/poiRec', { coordinates: coordinates })

export default function SidePanel(props) {
    const [chosenRoute, setChosenRoute] = props.handlers
    const [startLocation, setStartLocation] = props.startLocation
    const [endLocation, setEndLocation] = props.endLocation
    const [presetList, setPresetList] = useState([]);
    const [mode, setMode] = useState('preset')

    // Fetch preset route from database through backend and populate presetList on init
    useEffect(() => {
        axios.get('/preset/getRoutes').then(res => {
            setPresetList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    function handleChangeButton() {
        if (mode === 'preset') setMode('custom')
        else setMode('preset')
        setChosenRoute(null)
        setStartLocation(null)
        setEndLocation(null)
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
        console.log('Generating route.....')

        let coordinates = [[startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]];
        getRouteGeoJSON(coordinates).then(res => {
            setChosenRoute(res.data);
            console.log('Done generating route.');
        }).catch(err => {
            console.log(err);
        });

        // Add coordinates which will be used to perform nearby search into searchCoordinates. 
        let searchCoordinates = [{lat: startLocation.lat, lng: startLocation.lng}, {lat: endLocation.lat, lng: endLocation.lng}];
        // --------------------------------------------------WARNING--------------------------------------------------
        // | Only uncomment the code below when you need it for development as each call will be billed accordingly. |
        // --------------------------------------------------WARNING--------------------------------------------------
        // getPOIs(searchCoordinates).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    if (mode === 'preset'){
        return (
            <div id="side-panel-container">
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Button id="custom-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary">Custom Route<Add /></Button>
                    <PresetList presetList={presetList} handlers={[chosenRoute,setChosenRoute, setStartLocation, setEndLocation]}/>
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
