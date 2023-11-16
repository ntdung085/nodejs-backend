const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()
require('dotenv').config()


// init middlewares
app.use(morgan("dev"))
// app.use(morgan("combile"))
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
app.use(helmet())
app.use(compression()) // compress data transfer


// init db
// require('./dbs/init.mongodb.v1')
require('./dbs/init.mongodb.v2')
const { checkOverload } = require('./helpers/check.connect')
checkOverload()
// init router

app.get('/', (req, res, next) => {
    const strCompress = 'HelloNodejs'

    return res.status(200).json({
        message: "Wellcome",
        metadata: strCompress.repeat(1000)
    })
})

// handle error

module.exports = app