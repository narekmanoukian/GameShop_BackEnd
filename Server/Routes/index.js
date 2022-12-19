const Router  = require('express')
const router = new Router()

const gameRouter = require('./GameRouter')
const categoryRouter = require('./CategoryRouter')
const userRouter = require('./UsersRouter')


router.use('/user', userRouter)
router.use('/category', categoryRouter) 
router.use('/game', gameRouter)




module.exports = router