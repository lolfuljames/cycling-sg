const axios = require('axios');
const pino = require('pino');
const express = require('express');
const router = express.Router();
const { API_KEY, LOG_LEVEL } = require('../config');
const logger = pino({
    level: LOG_LEVEL || 'info',
    prettyPrint: {
        colorize: true,
        translateTime: 'SYS:standard'
    }
});

// Endpoint for POI recommendation (Nearby Search API)
router.post('/poiRec', (req, res) => {
    let body = req.body;

    // Nearby Search API URL
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    let coordinates = body.coordinates;
    let radius = body.radius ? body.radius : null;
    let type = body.type ? body.type : 'cafe';

    let results = [];
    let placeIDs = new Set();

    // This is where we actually call the Nearby Search API
    const getPOIs = async (url, coordinates, radius, type) => {
        return Promise.all(coordinates.map(async curr => {
            let lat = curr.lat ? curr.lat : null;
            let lng = curr.lng ? curr.lng : null;
            let loc = `${lat},${lng}`;
    
            let params = {
                location: loc,
                type: type,
                key: API_KEY
            }
    
            // Set rankby to 'distance' if radius is not passed from frontend
            // If radius is defined, rankby must not be 'distance' (as stated in Nearby Search API documentation)
            // Rankby is 'prominence' by default
            if (radius) {
                params['radius'] = radius;
            } else {
                params['rankby'] = 'distance'
            }
    
            return axios.get(url, { params: params });
        }))
    }

    // Deduplicate results returned from different coordinate nearby search
    const dedupe = (data, results, placeIDs) => {
        let deduped = 0;
        data.forEach(curr => {
            if (!placeIDs.has(curr.place_id)) {
                results.push(curr);
                placeIDs.add(curr.place_id);
            } else {
                deduped++;
            }
        })
        logger.debug(`[Nearby Search Deduping] Deduped ${deduped} item(s).`);
        return results;
    }

    // Callback function to deal with the response returned from Nearby Search API
    const getPOICallback = data => {
        let statusCodes = data.reduce((acc, curr, idx) => {
            if (curr.data && curr.data.status) {
                logger.info(`[Nearby Search API] Status for request #${idx + 1}: ${curr.data.status}`);
                if (curr.data && curr.data.status === 'OK') {
                    logger.info(`[Nearby Search API] Recommended place for request #${idx + 1}: ${curr.data.results.length}`);
                    results = dedupe(curr.data.results, results, placeIDs);
                }
                acc.add(curr.data.status);
            } else {
                logger.debug('[Nearby Search API] Missing status in result returned.');
                acc.add('NO_STATUS');
            }
            return acc;
        }, new Set())

        logger.info("[Nearby Search API] Total number of recommended place: " + results.length)

        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            if (statusCodes.has('ZERO_RESULTS')) {
                res.status(200).send('ZERO_RESULTS');
            } else if (statusCodes.has('OVER_QUERY_LIMIT')) {
                res.status(403).send('OVER_QUERY_LIMIT');
            } else if (statusCodes.has('REQUEST_DENIED')) {
                res.status(401).send('REQUEST_DENIED');
            } else if (statusCodes.has('INVALID_REQUEST')) {
                res.status(400).send('INVALID_REQUEST');
            } else if (statusCodes.has('UNKNOWN_ERROR')) {
                res.status(500).send('UNKNOWN_ERROR');
            } else if (statusCodes.has('NO_STATUS')) {
                res.status(500).send('NO_STATUS');
            }
        }
    }

    getPOIs(url, coordinates, radius, type).then(getPOICallback).catch(err => {
        logger.error(err);
        res.status(500).send();
    })
});

// Endpoint for place details retrieval
router.get('/poiInfo', (req, res) => {
    let query = req.query;
    let placeID = query.placeID;

    // Place Details API URL
    let url = 'https://maps.googleapis.com/maps/api/place/details/json';

    // All fields in basic category included, fields that fall outside basic category will be charged.
    let fields = 'address_component,adr_address,business_status,formatted_address,geometry,icon,name,photo,place_id,plus_code,type,url,utc_offset,vicinity';

    let params = {
        key: API_KEY,
        place_id: placeID,
        fields: fields
    }

    axios.get(url, { params: params }).then(response => {
        let data = response.data;
        if (data && data.status) {
            logger.info(`[Place Details API] Status returned: ${data.status}`);
            switch (data.status) {
                case 'OK':
                    res.status(200).send(data.result);
                    break;
                case 'UNKNOWN_ERROR':
                    res.status(500).send(data.status);
                    break;
                case 'ZERO_RESULTS':
                    res.status(200).send(data.status);
                    break;
                case 'OVER_QUERY_LIMIT':
                    res.status(403).send(data.status);
                    break;
                case 'REQUEST_DENIED':
                    res.status(401).send(data.status);
                    break;
                case 'INVALID_REQUEST':
                    res.status(400).send(data.status);
                    break;
                case 'NOT_FOUND':
                    res.status(200).send(data.status);
                    break;
            }
        }
    });
});

module.exports = router;