import React, { useEffect, useState } from 'react'
import './PresetRoute.css';
import Button from '@material-ui/core/Button'



export default function PresetRoute( {route, handlers}) {
    const [chosenRoute, setChosenRoute, setStartLocation, setEndLocation] = handlers
    const [className, setClass] = useState("presetRoute")

    function handleClickPreset() {
        setChosenRoute(route.json)
        setStartLocation(route.startLocation)
        setEndLocation(route.endLocation)
        console.log("Route chosen: ", route.name)
    }

    const activeClass = "presetRoute active-preset-route"
    const inactiveClass = "presetRoute"

    useEffect(() => {
        if (chosenRoute && chosenRoute === route.json && className !== activeClass) {
            setClass(activeClass)
        } else if (className !== inactiveClass) {
            setClass(inactiveClass)
        }
    }, [chosenRoute])

    return (
        <div className={className}>
            <Button fullWidth onClick={handleClickPreset}>
                <div className="routeName routeAttribute"> {route.name} </div>
                <div className="routeDistance routeAttribute"> {route.distance/1000 + '\nKM'} </div>
                <div className="routeCalories routeAttribute"> {route.calories/1000 + '\nCal'} </div>
            </Button>
        </div>
    )
}
