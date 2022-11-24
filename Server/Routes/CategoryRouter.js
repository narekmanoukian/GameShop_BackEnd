const Router  = require('express')
const router = new Router()
const typeController = require('../Controllers/CategoryController')
const checkRole = require('../Middleware/CheckRoleMiddleware')

router.get('/', typeController.getAll )
router.post('/', checkRole('ADMIN'), typeController.create )

module.exports = router