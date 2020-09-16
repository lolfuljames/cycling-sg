const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const cors = require('cors');
const mongoose = require('mongoose');
const testRoutes = express.Router();
const PORT = process.env.PORT || 4000;

const config = require('./config/key');
const MONGODB_URI = config.mongodbURI;
const log = console.log;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => log("MongoDB database connection established successfully."))
    .catch(err => log(err));
const connection = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());

app.use('/test', require('./routes/testRoutes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client', 'build', 'index.html'));
    })
}

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});