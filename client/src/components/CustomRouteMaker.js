import React from 'react'
import AutocompleteInput from './AutocompleteInput'
import './CustomRouteMaker.css'
import { SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab'
import { LocalDining, Search, FilterHdr, Store, Clear } from '@material-ui/icons'
import { Grid, Button } from '@material-ui/core'
import PlaceOfInterest from './PlaceOfInterest'
import axios from 'axios';

const POITypes = [
    { icon: <LocalDining />, name: 'Food & Beverages', key: 'restaurant'},
    { icon: <FilterHdr />, name: 'Attractions', key: 'tourist_attraction'},
    { icon: <Store />, name: 'Convenience Stores', key: 'convenience_store'},
];

/**
 * Get route in GeoJSON format.
 * Returns an axios post request promise.
 * Post request response will be the route (located in data field) in GeoJSON format.
 *  
 * @param {number[][]} coordinates - Array of coordinates including startLocation, endLocation and all POIs (in the format of [lng, lat])
 */
const getRouteGeoJSON = coordinates => {
    let url = 'https://api.openrouteservice.org/v2/directions/cycling-regular/geojson';
    let headers = { Authorization: '5b3ce3597851110001cf62484de2cf33999b4e06a16c3242e98d4443' };
    return axios.post(url, { coordinates: coordinates }, { headers: headers });
}

/**
 * Call backend for POIs recommendation.
 * Returns an axios post request promise.
 * Post request response will be an array of POIs object (located in data field) if successful.
 * 
 * -------------------------WARNING--------------------------
 * | This will be billed every time the function is called. |
 * -------------------------WARNING--------------------------
 * 
 * @param {number[][]} coordinates - Array of coordinates which will be used to search for POIs (in the format of [lat, lng])
 */
const getPOIs = (coordinates, POIType) => axios.post('/poi/poiRec', { coordinates: coordinates, radius: 1500, type: POIType })


export default function CustomRouteMaker(props) {
    const [open, setOpen] = React.useState(false);
    const [speedDialClassName, setSpeedDialClassName] = React.useState(null); 
    const [chosenRoute, setChosenRoute] = props.chosenRoute
    const [startLocation, setStartLocation] = props.startLocation
    const [endLocation, setEndLocation] = props.endLocation
    const [chosenPOI, setChosenPOI] = props.chosenPOI
    const [POIType, setPOIType] = props.POIType
    const [recPOI, setRecPOI] = props.recPOI
    
    const handleOpen = () => {
        setOpen(true);
        setSpeedDialClassName('MuiSpeedDial-open');
    };
    const handleClose = () => {
        setOpen(false);
        setSpeedDialClassName(null);
        };

    function handleSelect(selectedType) {
        if (POIType === selectedType) {
            setPOIType(null);
        } else {
            setPOIType(selectedType);
        }
        setRecPOI([]);
    };
    
    function handleSearchCustomRoute() {
        if (!startLocation) {
            window.alert("Please enter your start point before proceeding.")
            return
        }
        if (!endLocation) {
            window.alert("Please enter your end point before proceeding.")
            return
        }
        console.log('Generating route.....')

        let coordinates = chosenPOI.map(place => {
            return [place.geometry.location.lng, place.geometry.location.lat];
        });
        coordinates = [[startLocation.lng, startLocation.lat], ...coordinates ,[endLocation.lng, endLocation.lat]];
        getRouteGeoJSON(coordinates).then(res => {
            setChosenRoute(res.data);
            console.log('Done generating route.');
            // Add coordinates which will be used to perform nearby search into searchCoordinates. 
            // --------------------------------------------------WARNING--------------------------------------------------
            // | Only uncomment the code below when you need it for development as each call will be billed accordingly. |
            // --------------------------------------------------WARNING--------------------------------------------------
            // if (POIType) {
            //     let searchCoordinates = res.data.features[0].geometry.coordinates.map(coordinate => {
            //         return {lat: coordinate[1], lng: coordinate[0]}
            //     })
            //     searchCoordinates = searchCoordinates.filter((coordinate, index) => index % 100 === 0)
            //     getPOIs(searchCoordinates, POIType).then(res => {
            //         console.log("POI: ", res.data);
            //         setRecPOI(res.data);
            //     }).catch(err => {
            //         console.log(err);
            //     })
            // } else {
            //     setRecPOI([]);
            // }
        }).catch(err => {
            console.log(err);
        });

    }

    return (
        <div>
            <div id="add-poi">
                <SpeedDial
                    ariaLabel="Place of Interest Type SpeedDial"
                    icon={ (!POIType && <SpeedDialIcon />) || (POIType === 'tourist_attraction' && <FilterHdr/> ) || (POIType === 'restaurant' && <LocalDining/> ) || (POIType === 'convenience_store' && <Store/> )}
                    className={speedDialClassName}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    transitionDuration={800}
                >
                    {POITypes.map((type) => (
                    <SpeedDialAction
                        key={type.key}
                        icon={ (POIType !== type.key && type.icon) || (POIType === type.key && <Clear/>)}
                        tooltipTitle={type.name}
                        tooltipPlacement = "left"
                        // tooltipOpen
                        onClick={() => handleSelect(type.key)}
                    />
                    ))}
                </SpeedDial>
            </div> 
            <div id="start-pac">
                <div className="pac-title">Start Point</div>
                <AutocompleteInput handler={setStartLocation} placeholder={"Enter Start Point"}/>
            </div>
            <div id="end-pac">
                <div className="pac-title">End Point</div>
                <AutocompleteInput handler={setEndLocation} placeholder={"Enter End Point"}/>
            </div>
            <Grid id="poi-container">
                {chosenPOI.map((place) => {
                    return <PlaceOfInterest key={place.place_id} place={place} chosenPOI={[chosenPOI, setChosenPOI]}/>
                })}
            </Grid>
            <Button id="search-route-button" onClick={handleSearchCustomRoute} color="primary" variant="contained" component="span">
                        <Search />
            </Button>
        </div>
    )
}
