const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    "name": { type: String },
    "id": { type: Number },
    "area": { type: String },
    "startLocation": {
        "lat": Number,
        "lng": Number
    },
    "endLocation": {
        "lat": Number,
        "lng": Number
    },
    "calories": { type: Number },
    "distance": { type: Number },
    "json": {
        "type": { type: String },
        "features": [{
            "bbox": [Number],
            "type": { type: String },
            "properties": {
                "segments": [{
                    "distance": Number,
                    "duration": Number,
                    "steps": [{
                        "distance": Number,
                        "duration": Number,
                        "type": { type: Number },
                        "instruction": String,
                        "name": String,
                        "way_points": [Number]
                    }]
                }],
                "summary": {
                    "distance": Number,
                    "duration": Number
                },
                "way_points": [Number]
            },
            "geometry": {
                "coordinates": [[Number]],
                "type": { type: String }
            }
        }],
        "bbox": [Number],
        "metadata": {
            "attribution": String,
            "service": String,
            "timestamp": Number,
            "query": {
                "coordinates": [[Number]],
                "profile": String,
                "format": String
            },
            "engine": {
                "version": String,
                "build_date": String,
                "graph_date": String
            }
        }
    },
});

const PresetRoute = mongoose.model('PresetRoute', schema, 'presetRoutes');

module.exports = { PresetRoute };