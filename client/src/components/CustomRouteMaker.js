import React, { useState } from 'react'
import AutocompleteInput from './AutocompleteInput'
import './CustomRouteMaker.css'

export default function CustomRouteMaker() {
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);

    console.log(startLocation);
    console.log(endLocation);
    return (
        <div>
            <div id="start-pac">
                <div className="pac-title">Start Point</div>
                <AutocompleteInput handler={setStartLocation} placeholder={"Enter Start Point"}/>
            </div>
            
            <div id="end-pac">
                <div className="pac-title">End Point</div>
                <AutocompleteInput handler={setEndLocation} placeholder={"Enter End Point"}/>
            </div>
        </div>
    )
}
