const Router  = require('express')
const router = new Router()
const userController = require('../Controllers/UserController')
const authMiddleware = require('../Middleware/AuthMiddleware')

router.post('/registration', userController.registration )
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router