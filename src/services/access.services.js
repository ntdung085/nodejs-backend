'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenServices = require("./keyToken.services")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require('../utils')
const { BadRequestError, ConfictRequestError, AuthFailureError } = require("../core/error.response")
const { findByEmail } = require("./shop.services")

const RolesShop = {
    SHOP: '01',
    WRITER: '02',
    EDITOR: '03',
    MAIN: '04'
}
class AccessService {
    static login = async ({ email, password, refreshToken = null }) => {
        // 1.check email in database
        // 2. match password
        // 3. create publish and private key 
        // 4. generate token  save to database.
        // 5. get data and return

        const foundShop = await findByEmail({ email })
        if (!foundShop) { throw new BadRequestError('Shop not registered') }

        const match = bcrypt.compare(password, foundShop.password)
        if (!match) { throw new AuthFailureError('Authenticated faulure') }


        const publicKey = crypto.randomBytes(64).toString('hex')
        const privateKey = crypto.randomBytes(64).toString('hex')

        const { _id: shopId } = foundShop

        // create pair access token and refresh token by using jwt algo
        const tokens = await createTokenPair({ shopId, email: email }, publicKey, privateKey)

        // save to db 
        await KeyTokenServices.createKeyToken({
            refreshToken: tokens.refressToken,
            privateKey, publicKey, shopId

        })

        return {
            shop: getInfoData({ filed: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }


    }


    static signUp = async ({ name, email, password }) => {
        // try {

        // define a random variable to check undefine error
        // a

        // step1 : check email exits
        const holderShop = await shopModel.findOne({ email }).lean()
        if (holderShop) {
            throw new BadRequestError('Error: Shop already registered')
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create(
            {
                name, email, password: passwordHash, roles: [RolesShop.SHOP]
            }
        )
        if (newShop) {
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // })
            const publicKey = crypto.randomBytes(64).toString('hex')
            const privateKey = crypto.randomBytes(64).toString('hex')

            // save publish key to db
            const keyStore = await KeyTokenServices.createKeyToken({
                shopId: newShop._id,
                publicKey: publicKey,
                privateKey: privateKey
            })
            if (!keyStore) {
                // return {
                //     code: "xxxx",
                //     message: " keyStore error"
                // }
                throw new BadRequestError('Error: Keystore error! ')

            }

            // console.log("publicKeyString", publicKeyString)

            // const publicKeyObject = crypto.createPublicKey(publicKeyString)
            // console.log("publicKeyObject", publicKeyObject)



            const tokens = await createTokenPair({ shopId: newShop.id, email: newShop.email }, publicKey, privateKey)
            console.log("Created token success:", tokens)
            return {
                // code: 201,
                // metadata: {
                shop: getInfoData({ filed: ['_id', 'name', 'email'], object: newShop }),
                tokens
                // }
            }
        }
        return {
            code: 200,
            metadata: null
        }

        // console.log({ privateKey, publicKey }) //save to collection key store

        // } catch (error) {
        //     return {
        //         code: 'xxxx',
        //         message: error.message,
        //         status: error.status
        //     }
        // }
    }


}

module.exports = AccessService