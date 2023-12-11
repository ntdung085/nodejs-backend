'use strict'

const { Types, Schema, model } = require('mongoose'); // Erase if already required


const DOCUMENT_NAME = "Apikey"
const COLLECTION_NAME = "Apikeys"
// Declare the Schema of the Mongo model
var apikeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    permissions: {
        type: [String],
        enum: ['0000', '1111', '2222'],
    }
}, {
    collection: COLLECTION_NAME,
    timeseries: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, apikeySchema);