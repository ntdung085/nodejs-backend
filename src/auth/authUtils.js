'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/aysncHandle')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByShopId } = require('../services/keyToken.services')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'

}

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


const authentication = asyncHandler(async (req, res, next) => {
    /*
        1. check shops missing 
        2. get accesstoken
        3. verify token
        4. check shop in db
        5. check keystore with this user id 
        6. ok all return next
    */
    const shopId = req.headers[HEADER.CLIENT_ID]
    if (!shopId) throw new AuthFailureError('Invalid request')

    const keyStore = await findByShopId(shopId)
    if (!keyStore) throw new NotFoundError('Not found key store')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError('Invalid request')

    try {
        const decodeShop = JWT.verify(accessToken, keyStore.publicKey)
        if (shopId != decodeShop.shopId) throw new AuthFailureError('Invalid User')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }

})


module.exports = { createTokenPair, authentication }