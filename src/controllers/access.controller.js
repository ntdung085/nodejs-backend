'use strict'

const AccessService = require("../services/access.services")
const { OkResponse, CreatedResponse } = require('../core/success.response')

class AccessController {
    signUp = async (req, res, next) => {
        // try {
        // console.log(`[P]::signUp::`, req.body)
        new CreatedResponse({
            message: 'Registed Ok!',
            metadata: await AccessService.signUp(req.body)
        }).send(res)
        // return res.status(201).json(await AccessService.signUp(req.body))
        // } catch (error) {
        //     next(error)
        // }
    }
}

module.exports = new AccessController()
