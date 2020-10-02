import React, { useEffect, useState } from 'react'
import './PresetRoute.css';
import Button from '@material-ui/core/Button'



export default function PresetRoute( {route, handlers}) {
    const [chosenRoute, setChosenRoute] = handlers
    const [className, setClass] = useState("presetRoute")

    function handleClickPreset() {
        setChosenRoute(route.json)
        console.log("Route chosen: ", route.name)
    }

    const activeClass = "presetRoute active-preset-route"
    const inactiveClass = "presetRoute"

    useEffect(() => {
        console.log("doing effect button")
        if (chosenRoute && chosenRoute === route.json && className !== activeClass) {
            setClass(activeClass)
            console.log("active yo!")
        } else if (className !== inactiveClass) {
            setClass(inactiveClass)
            console.log(route.name, ": inactive now")
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
