import React, { useEffect, useState } from 'react'
import './SidePanel.css';
import PresetList from './PresetList'
import CustomRouteMaker from './CustomRouteMaker'
import { Add,ArrowBack }  from '@material-ui/icons';
import HelpIcon from '@material-ui/icons/Help';
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


    const [tutorial, setTut] = useState(false)
    const steps= [
        {
            element: '#help-button',
            intro: 'This is the help button',
        },
        {
            element: '.presetRoute',
            intro: 'Click here for some routes near you',
        },
        {
            element: '#custom-route-transition-button',
            intro: 'Click here to create your own route',
        },
    ]

    const stepsCustom= [
        {
            element: '[placeholder="Enter Start Point"]',
            intro: 'Enter your Start point',
        },
        {
            element: '[placeholder="Enter End Point"]',
            intro: 'Enter your End point, you can drag the waypoint to fine tune your location too!',
        },
        {
            element: '[aria-label="Place of Interest Type SpeedDial"]',
            intro: 'Click here to add stops inbetween your destinations',
        },
        {
            element: '#search-route-button',
            intro: 'Click here to find your route',
        },
    ]

    function hideTut(){
        setTut(false)
    }
    function showTut(){
        setTut(true)
    }

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
                    <Button id="help-button" onClick={showTut} variant="contained" color="primary"><HelpIcon/></Button>
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
                    <Steps enabled={tutorial} steps={stepsCustom} initialStep={0} onExit={hideTut}/>
                    <Button id="preset-route-transition-button" onClick={handleChangeButton} variant="contained" color="primary"><ArrowBack/>Back</Button>
                    <Button id="custom-help-button" onClick={showTut} variant="contained" color="primary"><HelpIcon/></Button>
                    <CustomRouteMaker recPOI={[recPOI, setRecPOI]} chosenRoute={[chosenRoute,setChosenRoute]} POIType={[POIType, setPOIType]} chosenPOI={[chosenPOI, setChosenPOI]} startLocation={[startLocation, setStartLocation]} endLocation={[endLocation,setEndLocation]} recPOI={[recPOI, setRecPOI]}/>
                    {/* <PresetList presetList={presetList}/> */}
                </div>
            </div>
        )
    }
}
