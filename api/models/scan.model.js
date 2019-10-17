const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schema = new Schema({
    status: {
        type: String,
        required: true
    },
    repositoryName: {
        type: String,
        required: true
    },
    findings: {
        type: Array,
        "default": []
    },
    queuedAt: {
        type: Date,
        default: Date.now
    },
    queuedAt: {
        type: Date,
        default: Date.now
    },
    scanningAt: {
        type: Date,
        default: Date.now
    },
    finishedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('Scan', Schema);