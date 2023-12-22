const express = require('express')
const {home, register, login, notFound, health, getAllUsersWeeklists} = require('../controllers/user')
const isAuthenticated = require('../middleware/auth')

const router = express.Router()

router.get('/', home)
router.post('/register', register)
router.post('/login', login)
router.get('/health', isAuthenticated, health)
router.get('/feed', isAuthenticated, getAllUsersWeeklists)
// router.get('*', notFound)

module.exports = router