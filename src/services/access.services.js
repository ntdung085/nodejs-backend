'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenServices = require("./keyToken.services")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require('../utils')

const RolesShop = {
    SHOP: '01',
    WRITER: '02',
    EDITOR: '03',
    MAIN: '04'
}
class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step1 : check email exits
            const holderShop = await shopModel.findOne({ email }).lean()
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registed!'
                }
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
                    return {
                        code: "xxxx",
                        message: " keyStore error"
                    }
                }

                // console.log("publicKeyString", publicKeyString)

                // const publicKeyObject = crypto.createPublicKey(publicKeyString)
                // console.log("publicKeyObject", publicKeyObject)



                const tokens = await createTokenPair({ shopId: newShop.id, email: newShop.email }, publicKey, privateKey)
                console.log("Created token success:", tokens)
                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ filed: ['_id', 'name', 'email'], object: newShop }),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }

            // console.log({ privateKey, publicKey }) //save to collection key store

        } catch (error) {
            return {
                code: 'xxxx',
                message: error.message,
                status: error.status
            }
        }
    }


}

module.exports = AccessService