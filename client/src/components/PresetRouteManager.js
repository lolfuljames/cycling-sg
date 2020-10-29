import React from 'react'
import { Paper } from '@material-ui/core';
import PresetRoute from './PresetRoute'
import './PresetRouteManager.css'

export default function PresetRouteManager( {presetList, handlers}) {
    return (
        <div className='presetList'>
            <Paper style={{maxHeight: "70vh", overflow: 'auto'}}>
                {presetList.map(presetRoute => {
                    return <PresetRoute key={presetRoute.id} route={presetRoute} handlers={handlers}/>
                })}
            </Paper>
        </div>
    )
}
