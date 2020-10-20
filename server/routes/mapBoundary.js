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


const { MapBoundary } = require('../models/MapBoundary');

// Endpoint to get all the preset routes in database
router.get('/bmarea', (req, res) => {
    MapBoundary.find().exec((err, result) => {
        if (err) {
            logger.error(err);
        } else if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(200).send(`No document exists in database.`);
        }
    })
})

module.exports = router;
