import React from 'react'
import Grid from '@material-ui/core/Grid';
import {Delete, Stars} from '@material-ui/icons'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import P from 'pino';

export default function PlaceOfInterest(props) {
    const place = props.place;
    const [chosenPOI, setChosenPOI] = props.chosenPOI;

    function handleRemovePOI(place) {
        let index = chosenPOI.findIndex(chosenPlace => chosenPlace === place)
        if (index === -1) {
            // the POI has not been chosen
            console.error("Removing POI which hasn't been chosen")
        } else {
            // the POI was chosen previously, remove instead
            let new_chosenPOI = [...chosenPOI]
            new_chosenPOI.splice(index, 1)
            setChosenPOI(new_chosenPOI)
        }
    }

    return (
        <div>
            <Grid container spacing={2} className="poi-card">
                <Grid item xs={12} sm container>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                            {place.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <Stars/>{(place.rating && place.rating.toFixed(1)) || 'Not available'}
                        </Typography>
                    </Grid>
                    <Grid item>
                    <IconButton aria-label="delete" onClick={() => handleRemovePOI(place)}>
                        <Delete/>
                    </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
