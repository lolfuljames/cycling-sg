import React from 'react'
import PresetRoute from './PresetRoute'
import './PresetList.css'

export default function PresetList( {presetList, handlers}) {
    return (
        <div className='presetList'>
            {presetList.map(presetRoute => {
                return <PresetRoute key={presetRoute.id} route={presetRoute} handlers={handlers}/>
            })}
        </div>
    )
}
