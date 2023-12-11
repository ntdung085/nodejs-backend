'use strict'

const { response } = require("../app")

const StatusCode = {
    FORBIDDEN: 403,
    CONFICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFICT: 'Confict error'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConfictRequestError extends ErrorResponse {
    constructor(message = response.CONFICT, statusCode = StatusCode.CONFICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = response.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}


module.exports = {
    ConfictRequestError,
    BadRequestError
}