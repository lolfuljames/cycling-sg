import React from 'react'
import AutocompleteInput from './AutocompleteInput'
import './CustomRouteMaker.css'
import { SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab'
import { LocalDining, FilterHdr, Store } from '@material-ui/icons'
import PlaceOfInterest from './PlaceOfInterest'


const POITypes = [
    { icon: <LocalDining />, name: 'Food & Beverages', key: 'restaurant'},
    { icon: <FilterHdr />, name: 'Attractions', key: 'tourist_attraction'},
    { icon: <Store />, name: 'Convenience Stores', key: 'convenience_store'},
];

export default function CustomRouteMaker(props) {
    const [open, setOpen] = React.useState(false);
    const [speedDialClassName, setSpeedDialClassName] = React.useState(null); 
    const [setStartLocation, setEndLocation, setPOIType] = props.handlers;
    const [chosenPOI, setChosenPOI] = props.chosenPOI
    
    const handleOpen = () => {
        setOpen(true);
        setSpeedDialClassName('MuiSpeedDial-open');
    };
    const handleClose = () => {
        setOpen(false);
        setSpeedDialClassName(null);
        };

    function handleSelect(selectedType) {
        setPOIType(selectedType)
    };

    return (
        <div>
            <div id="poi">
                <SpeedDial
                    ariaLabel="Place of Interest Type SpeedDial"
                    icon={<SpeedDialIcon />}
                    className={speedDialClassName}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    transitionDuration={800}
                >
                    {POITypes.map((type) => (
                    <SpeedDialAction
                        key={type.key}
                        icon={type.icon}
                        tooltipTitle={type.name}
                        tooltipPlacement = "right"
                        tooltipOpen
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
            <div id="poi-container">
                {chosenPOI.map((place) => {
                    return <PlaceOfInterest key={place.place_id} place={place}/>
                })}
            </div>
        </div>
    )
}
