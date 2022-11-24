const Router  = require('express')
const router = new Router()
const UserController = require('../Controllers/UserController')
const AuthMiddleware = require('../Middleware/AuthMiddleware')

router.post('/registration', UserController.registration )
router.post('/login', UserController.login)
router.get('/auth', AuthMiddleware, UserController.check)

module.exports = router