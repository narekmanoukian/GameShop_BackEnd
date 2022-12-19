const Router  = require('express')
const router = new Router()
const categoryController = require('../Controllers/CategoryController')
const checkRole = require('../Middleware/CheckRoleMiddleware')

router.get('/', categoryController.getAll )
router.post('/', checkRole('ADMIN'), categoryController.create )

module.exports = router