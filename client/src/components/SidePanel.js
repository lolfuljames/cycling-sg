import React, { useEffect, useState } from 'react'
import './SidePanel.css';
import PresetRouteManager from './PresetRouteManager'
import CustomRouteManager from './CustomRouteManager'
import { Add,ArrowBack,Visibility,VisibilityOff,Help }  from '@material-ui/icons';
import { Button } from '@material-ui/core';

import axios from 'axios';

import "intro.js/introjs.css";
import { Steps } from "intro.js-react";

export default function SidePanel(props) {
    const [chosenRoute, setChosenRoute] = props.chosenRoute
    const [startLocation, setStartLocation] = props.startLocation
    const [endLocation, setEndLocation] = props.endLocation
    const [presetList, setPresetList] = useState([]);
    const [mode, setMode] = useState('preset')
    const [POIType, setPOIType] = props.POIType;
    const [recPOI, setRecPOI] = props.recPOI
    const [chosenPOI, setChosenPOI] = props.chosenPOI
    const userLocation = props.userLocation;
    const [showUi, setUi] = useState(true)
    const [presetRouteLoaded, setLoaded] = useState(false);

    const [tutorial, setTut] = useState(false)
    const steps = [
        {
            element: '#help-button',
            intro: 'Click this to start this tutorial again',
        },
        {
            element: '.presetRoute',
            intro: 'Click here for some routes near you',
        },
        {
            element: '#hide-button',
            intro: 'Click here to hide the UI',
        },
        {
            element: '#custom-route-transition-button',
            intro: 'Click here to create your own route',
        },
    ]

    const stepsCustom= [
        {
            element: '[placeholder="Enter Start Point"]',
            intro: 'Enter your Start point, a draggable waypoint will appear on the map to fine-tune the location!',
        },
        {
            element: '[placeholder="Enter End Point"]',
            intro: 'Enter your End point, a draggable waypoint will appear on the map to fine-tune the location!',
        },
        {
            element: '[aria-label="Place of Interest Type SpeedDial"]',
            intro: 'Click here to select categories for a detour in-between your destinations, then press the search button! ',
        },
        {
            element: '#search-route-button',
            intro: 'Click here to find your route! It also shows our recommended places you should visit if you chose a detour category in step 3!',
        },
    ]

    function hideTut(){
        setTut(false)
    }
    function showTut(){
        setTut(true)
    }

    function toggleUi() {
        var x = document.getElementById("side-panel");
        if (showUi) {
          x.style.display = "none";
          setUi(false);
        } else {
          x.style.display = "block";
          setUi(true);
        }
      }
    

    // sorts preset list when userLocation is available, only runs once per session
    useEffect(() => {
        if (!userLocation || presetRouteLoaded || presetList.length === 0) {
            return;
        }
        let sortedPresetList = [...presetList];
        // sort according to shortest distance
        sortedPresetList.sort(function (a, b) {
            return (Math.pow(userLocation.lat - a.startLocation.lat, 2) + Math.pow(userLocation.lng - a.startLocation.lng, 2)) - (Math.pow(userLocation.lat - b.startLocation.lat,2) + Math.pow(userLocation.lng - b.startLocation.lng,2));
        })
        setPresetList(sortedPresetList);
        setLoaded(true);
    }, [userLocation])


    // Fetch preset route from database through backend and populate presetList on init
    useEffect(() => {
        axios.get('/preset/getRoutes').then(res => {
            setPresetList(res.data);
            // while(!userLocation) {
            //     console.log('wait');
            //     await new Promise(r => setTimeout(r, 500));
            // }
            // console.log('done');
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
        hideTut()
    }

    if (mode === 'preset'){
        return (
            <div id="side-panel-container">
                
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Steps enabled={tutorial} steps={steps} initialStep={0} onExit={hideTut}/>
                    <Button id="help-button" onClick={showTut} variant="contained" color="primary"><Help/></Button>
                    <Button id="custom-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary">Custom Route<Add /></Button>
                    <PresetRouteManager presetList={presetList} handlers={[chosenRoute,setChosenRoute, setStartLocation, setEndLocation]}/>
                </div>
                <Button id="hide-button" onClick={toggleUi} variant="contained" color="primary">{showUi ? <VisibilityOff /> : <Visibility /> }</Button>
            </div>
        )
    } else {
        return (
            <div id="side-panel-container">
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Steps enabled={tutorial} steps={stepsCustom} initialStep={0} onExit={hideTut}/>
                    <Button id="preset-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary"><ArrowBack/>Back</Button>
                    <Button id="custom-help-button" onClick={showTut} variant="contained" color="primary"><Help/></Button>
                    <CustomRouteManager recPOI={[recPOI, setRecPOI]} chosenRoute={[chosenRoute,setChosenRoute]} POIType={[POIType, setPOIType]} chosenPOI={[chosenPOI, setChosenPOI]} startLocation={[startLocation, setStartLocation]} endLocation={[endLocation,setEndLocation]} recPOI={[recPOI, setRecPOI]}/>
                    {/* <PresetList presetList={presetList}/> */}
                </div>
                <Button id="hide-button" onClick={toggleUi} variant="contained" color="primary">{showUi ? <VisibilityOff /> : <Visibility /> }</Button>
            </div>
        )
    }
}
