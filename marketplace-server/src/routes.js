const express = require('express')
const router = express.Router()

const AuthValidator = require('./validators/AuthValidators')

const AuthController = require('./controllers/AuthController')

router.post('/user/signin',AuthValidator.signin, AuthController.signin)
router.post('/user/signup', AuthValidator.signup, AuthController.signup)

module.exports = router