'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    OK: 'Success',
    CREATED: 'Created'
}


class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}


class OkResponse extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}



class CreatedResponse extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata })
    }
}

module.exports = {
    OkResponse, CreatedResponse, SuccessResponse
}