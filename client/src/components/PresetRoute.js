import React from 'react'
import './PresetRoute.css';

import Button from '@material-ui/core/Button'

export default function PresetRoute( {route}) {
    return (
        <div className="presetRoute">
            <Button fullWidth>
                <div className="routeName routeAttribute"> {route.name} </div>
                <div className="routeDistance routeAttribute"> {route.distance/1000 + '\nKM'} </div>
                <div className="routeCalories routeAttribute"> {route.calories/1000 + '\nCal'} </div>
            </Button>
        </div>
    )
}
