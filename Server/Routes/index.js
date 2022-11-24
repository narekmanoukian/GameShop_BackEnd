const Router  = require('express')
const router = new Router()

const GameRouter = require('./GameRouter')
const CategoryRouter = require('./CategoryRouter')
const UsersRouter = require('./UsersRouter')


router.use('/user', UsersRouter)
router.use('/category', CategoryRouter) 
router.use('/game', GameRouter)




module.exports = router