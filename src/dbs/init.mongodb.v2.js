'use strict'
const { db: { host, name, port } } = require('../configs/config.mongo')
const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')
const connectUrl = 'mongodb://127.0.0.1:27017/nodejs_database'
// const connectUrl = `mongodb://${host}:${port}/${name}`
class Database {
    constructor() {
        this.connect()
    }

    //connect
    connect(type = 'mongodb') {
        // if (1 === 1) {
        //     mongoose.set('debug', true)
        //     mongoose.set('debug', { color: true })
        // }
        mongoose.connect(connectUrl).then(_ => {
            console.log('Connected Mongodb Success With Singleton', countConnect())
        }).catch(err => console.log('Error Connect!'))

    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB