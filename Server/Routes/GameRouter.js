const Router  = require('express')
const router = new Router()
const gameController = require('../Controllers/GameController')
const checkRole = require('../Middleware/CheckRoleMiddleware')


router.get('/', gameController.getAll )
router.get('/:id', gameController.getOne )
router.post('/',checkRole('ADMIN'), gameController.create)

module.exports = router