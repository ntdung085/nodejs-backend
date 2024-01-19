'use strict'

const { response } = require("../app")

const StatusCode = {
    FORBIDDEN: 403,
    CONFICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFICT: 'Confict error',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Not found'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConfictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFICT, statusCode = StatusCode.CONFICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode)
    }
}


class NotFoundError extends ErrorResponse {
    constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
        super(message, statusCode)
    }
}



module.exports = {
    ConfictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError
}