'use strict'

const { filter, update } = require('lodash')
const keytokenModel = require('../models/keytoken.model')
const { options } = require('../routes')

class KeyTokenServices {
    static createKeyToken = async ({ shopId, publicKey, privateKey, refreshToken }) => {
        try {
            // const publicKeyString = publicKey.toString()
            // level 0
            // const tokens = await keytokenModel.create({
            //     shopId: shopId,
            //     publicKey: publicKey,
            //     privateKey: privateKey
            // })
            // console.log(tokens)
            // return tokens ? tokens.publicKey : null // return publishKey if tokens else null
            // level 1
            const filter = { shopId: shopId }, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true }
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null

        } catch (error) {
            console.log("error", error)
        }

    }
}

module.exports = KeyTokenServices