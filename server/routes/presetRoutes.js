const pino = require('pino');
const express = require('express');
const router = express.Router();
const { LOG_LEVEL } = require('../config');
const logger = pino({
    level: LOG_LEVEL || 'info',
    prettyPrint: {
        colorize: true,
        translateTime: 'SYS:standard'
    }
});

const { PresetRoute } = require('../models/PresetRoute');

// Endpoint to get a preset route based on id
router.get('/getRoute', (req, res) => {
    let query = req.query;
    let id = query.id;
    if (id == null) {
        res.status(400).send('Preset route ID is required.');
    } else {
        PresetRoute.findOne({id: id}).exec((err, result) => {
            if (err) {
                logger.error(err);
            } else if (result) {
                res.status(200).send(result);
            } else {
                res.status(200).send(`Document with id ${id} does not exist.`);
            }
        })
    }
})

// Endpoint to get all the preset routes in database
router.get('/getRoutes', (req, res) => {
    PresetRoute.find().exec((err, result) => {
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
