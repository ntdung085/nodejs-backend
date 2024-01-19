'use strict'

const AccessService = require("../services/access.services")
const { OkResponse, CreatedResponse, SuccessResponse } = require('../core/success.response')

class AccessController {
    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

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
