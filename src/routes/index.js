'use strict'

const express = require('express')
const router = express.Router()
const { apiKey, permission } = require('../auth/checkAuth')

// rounter.user
// move router from main app to router.

// check apikey
router.use(apiKey)

// check permission
router.use(permission('0000'))

router.use('/v1/api', require('./acccess'))

// router.get('', (req, res, next) => {
//     const strCompress = 'HelloNodejs'

//     return res.status(200).json({
//         message: "Wellcome"
//         // metadata: strCompress.repeat(1000)
//     })
// })

// add require to the app founder again

module.exports = router
