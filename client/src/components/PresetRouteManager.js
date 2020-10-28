import React from 'react'
import PresetRoute from './PresetRoute'
import './PresetRouteManager.css'

export default function PresetRouteManager( {presetList, handlers}) {
    return (
        <div className='presetList'>
            {presetList.map(presetRoute => {
                return <PresetRoute key={presetRoute.id} route={presetRoute} handlers={handlers}/>
            })}
        </div>
    )
}
