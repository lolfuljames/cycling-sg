import React from 'react'
import AutocompleteInput from './AutocompleteInput'
import './CustomRouteMaker.css'
import { SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab'
import { LocalDining, FilterHdr, Store, Clear } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import PlaceOfInterest from './PlaceOfInterest'


const POITypes = [
    { icon: <LocalDining />, name: 'Food & Beverages', key: 'restaurant'},
    { icon: <FilterHdr />, name: 'Attractions', key: 'tourist_attraction'},
    { icon: <Store />, name: 'Convenience Stores', key: 'convenience_store'},
];

export default function CustomRouteMaker(props) {
    const [open, setOpen] = React.useState(false);
    const [speedDialClassName, setSpeedDialClassName] = React.useState(null); 
    const [setStartLocation, setEndLocation] = props.handlers;
    const [chosenPOI, setChosenPOI] = props.chosenPOI
    const [POIType, setPOIType] = props.POIType
    
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
    };

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
                        tooltipPlacement = "right"
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
        </div>
    )
}
