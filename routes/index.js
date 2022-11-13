const express = require('express')
const router = express.Router()

const authenticate = require('../middlewares/authentication')

router.use('/auth', require('./auth'))
router.use('/users', authenticate, require('./user'))
router.use('/products', authenticate, require('./product'))

module.exports = router