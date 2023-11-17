'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyTokenServices {
    static createKeyToken = async ({ shopId, publicKey, privateKey }) => {
        try {
            // const publicKeyString = publicKey.toString()
            const tokens = await keytokenModel.create({
                shopId: shopId,
                publicKey: publicKey,
                privateKey: privateKey
            })
            console.log(tokens)
            return tokens ? tokens.publicKey : null // return publishKey if tokens else null
        } catch (error) {
            console.log("error", error)
        }

    }
}

module.exports = KeyTokenServices