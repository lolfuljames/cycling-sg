import React, { useState } from 'react'
import './SidePanel.css';
import PresetList from './PresetList'
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

export default function SidePanel() {
    const [presetList, updatePresetList] = useState([{name:'hello',
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
    return (
        <div id="side-panel-container">
            <div id="side-panel">
                <div id="side-panel-title">
                    {/* Routes */}
                </div>
                <Button id="custom-route-transition-button" variant="contained" color="primary" round>Custom Route<Add /></Button>
                <PresetList presetList={presetList}/>
            </div>
        </div>
    )
}
