import React, { useState } from 'react'
import './SidePanel.css';
import PresetList from './PresetList'
import CustomRouteMaker from './CustomRouteMaker'
import Add from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

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

    function handleButton() {
        if (mode === 'preset') setMode('custom')
        else setMode('preset')
    }

    if (mode === 'preset'){
        return (
            <div id="side-panel-container">
                <div id="side-panel">
                    <div id="side-panel-title">
                        {/* Routes */}
                    </div>
                    <Button id="custom-route-transition-button" onClick={handleButton} variant="contained" color="primary">Custom Route<Add /></Button>
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
                    <Button id="preset-route-transition-button" onClick={handleButton} variant="contained" color="primary"><ArrowBack/>Back</Button>
                    <CustomRouteMaker/>
                    {/* <PresetList presetList={presetList}/> */}
                </div>
            </div>
        )
    }
}
