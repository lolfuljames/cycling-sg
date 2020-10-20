const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    "Name": { type: String },
    "properties": { 
        "Name": { type: String },
        "description": { type: String },
        "altitudeMode": { type: String },
        "ED_Code": { type: String },
        "FID": {type : String },
        "ED_DESC": { type : String },
        "Field_1": { type : String }
    },
    "geometry" : {
        "type": { type : String },
        "coordinates" : [[[[Number]]]]
    },
});

const MapBoundary = mongoose.model('MapBoundary', schema, 'boundaryMap');

module.exports = { MapBoundary };