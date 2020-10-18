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
const getPOIs = (coordinates, POIType) => axios.post('/poi/poiRec', { coordinates: coordinates, radius: 1500, type: POIType })

export default function SidePanel(props) {
    const [chosenRoute, setChosenRoute] = props.chosenRoute
    const [startLocation, setStartLocation] = props.startLocation
    const [endLocation, setEndLocation] = props.endLocation
    const [presetList, setPresetList] = useState([]);
    const [mode, setMode] = useState('preset')
    const [POIType, setPOIType] = props.POIType;
    const [recPOI, setRecPOI] = props.recPOI
    const [chosenPOI, setChosenPOI] = props.chosenPOI

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
        setRecPOI([]);
        setChosenPOI([]);
        setPOIType(null);
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

        let coordinates = chosenPOI.map(place => {
            return [place.geometry.location.lng, place.geometry.location.lat];
        });
        coordinates = [[startLocation.lng, startLocation.lat], ...coordinates ,[endLocation.lng, endLocation.lat]];
        getRouteGeoJSON(coordinates).then(res => {
            setChosenRoute(res.data);
            console.log('Done generating route.');
            // Add coordinates which will be used to perform nearby search into searchCoordinates. 
            // --------------------------------------------------WARNING--------------------------------------------------
            // | Only uncomment the code below when you need it for development as each call will be billed accordingly. |
            // --------------------------------------------------WARNING--------------------------------------------------
            if (POIType) {
                let searchCoordinates = res.data.features[0].geometry.coordinates.map(coordinate => {
                    return {lat: coordinate[1], lng: coordinate[0]}
                })
                searchCoordinates = searchCoordinates.filter((coordinate, index) => index % 100 === 0)
                getPOIs(searchCoordinates, POIType).then(res => {
                    console.log("POI: ", res.data);
                    setRecPOI(res.data);
                }).catch(err => {
                    console.log(err);
                })
            } else {
                setRecPOI([]);
            }
        }).catch(err => {
            console.log(err);
        });

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
                    <CustomRouteMaker POIType={[POIType, setPOIType]} chosenPOI={[chosenPOI, setChosenPOI]} handlers={[setStartLocation, setEndLocation,setRecPOI]}/>
                    <Button id="search-route-button" onClick={handleSearchCustomRoute} color="primary" variant="contained" component="span">
                        <Search />
                    </Button>
                    {/* <PresetList presetList={presetList}/> */}
                </div>
            </div>
        )
    }
}
