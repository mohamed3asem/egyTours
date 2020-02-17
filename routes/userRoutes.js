const express = require('express')

const authController = require('../controllers/authController')
const viewController = require('../controllers/viewController')

const router = express.Router()

// show register page
router.get('/register', viewController.renderRegisterPage)

// handle sign up logic
router.post('/register', authController.signup)

//show login form
router.get('/login', viewController.renderLoginForm)

// handle login logic
router.post('/login', authController.login)

// handle log out route
router.get('/logout', authController.logout)

module.exports = router