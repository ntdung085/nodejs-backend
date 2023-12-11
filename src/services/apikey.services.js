'use strict'
const cryto = require('crypto')
const apikeyModel = require("../models/apikey.model")

const findById = async (key) => {
    // const newKey = await apikeyModel.create({ key: cryto.randomBytes(64).toString('hex'), permissions: ['0000'] })
    // console.log(newKey)
    const keyObj = await apikeyModel.findOne({ key, status: true }).lean()
    return keyObj
}

module.exports = { findById }


