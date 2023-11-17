'use strict'
// key !dmbg install mongodb snippet for nodejs

const { model, Schema, Types } = require('mongoose')

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

// declare the schema of the mongo model

const shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["activate", "inactivate"],
        default: "inactivate"
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


// export model
module.exports = model(DOCUMENT_NAME, shopSchema)