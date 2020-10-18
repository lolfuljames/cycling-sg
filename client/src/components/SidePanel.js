import React, { useEffect, useState } from 'react'
import './SidePanel.css';
import PresetList from './PresetList'
import CustomRouteMaker from './CustomRouteMaker'
import { Add,ArrowBack }  from '@material-ui/icons';
import { Button } from '@material-ui/core';
import axios from 'axios';

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
                    <CustomRouteMaker recPOI={[recPOI, setRecPOI]} chosenRoute={[chosenRoute,setChosenRoute]} POIType={[POIType, setPOIType]} chosenPOI={[chosenPOI, setChosenPOI]} startLocation={[startLocation, setStartLocation]} endLocation={[endLocation,setEndLocation]} recPOI={[recPOI, setRecPOI]}/>
                    {/* <PresetList presetList={presetList}/> */}
                </div>
            </div>
        )
    }
}
