const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    test1: { type: String },
    test2: { type: String },
    test3: { type: Number }
});

const Test = mongoose.model('Test', testSchema);

module.exports = { Test };