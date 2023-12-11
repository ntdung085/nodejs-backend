const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()
require('dotenv').config()


// init middlewares
// app.use(morgan("combile"))
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
app.use(morgan("dev"))
app.use(helmet())
app.use(compression()) // compress data transfer
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init db
// require('./dbs/init.mongodb.v1')
require('./dbs/init.mongodb.v2')
const { checkOverload } = require('./helpers/check.connect')
checkOverload()
// init router
// move to router.
app.use('', require('./routes'))

// handle error middleware
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// handle error
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || "Internal server error"
    })
})

module.exports = app