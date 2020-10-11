const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const path = require('path');

const cors = require('cors');
const mongoose = require('mongoose');
const testRoutes = express.Router();
const PORT = process.env.PORT || 4000;

const { MONGODB_URI, LOG_LEVEL } = require('./config');

const pino = require('pino');
const expressPino = require('express-pino-logger');
const logger = pino({
    level: LOG_LEVEL || 'info',
    prettyPrint: {
        colorize: true,
        translateTime: 'SYS:standard'
    }
});
const expressLogger = expressPino({ logger });

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.debug("MongoDB database connection established successfully."))
    .catch(err => logger.error(err));
const connection = mongoose.connection;

app.use(expressLogger);
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

app.use('/poi', require('./routes/poiRoutes'));
app.use('/preset', require('./routes/presetRoutes'));
app.use('/test', require('./routes/testRoutes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client', 'build', 'index.html'));
    })
}

app.listen(PORT, function() {
    logger.debug("Server is running on Port: " + PORT);
});