const Router  = require('express')
const router = new Router()
const gameController = require('../Controllers/GameController')



router.get('/', gameController.getAll )
router.get('/:id', gameController.getOne )
router.post('/', gameController.create)

module.exports = router