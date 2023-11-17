'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })
        const refressToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })
        console.log(refressToken)

        // verify token
        JWT.verify(accessToken, publicKey, (error, decode) => {
            if (error) {
                console.log('error verify:', error)
            } else {
                console.log('decode verify', decode)
            }
        })


        return { accessToken, refressToken }

    } catch (error) {
        console.log("error", error)
    }
}


module.exports = { createTokenPair }