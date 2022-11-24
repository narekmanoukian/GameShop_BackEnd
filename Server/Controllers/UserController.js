const ApiError = require('../Errors/ApiErrors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../Models/model')

const generateJWT = (id, email, role) => {
    return jwt.sign (
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
        )
}

class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Uncorrect Email or Password'))
        }
        const createdUser = await User.findOne({where: {email}})
        if (createdUser) {
            return next(ApiError.badRequest('User with this email address already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 6)
        const user = await User.create({email, role, password:hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJWT(user.id, user.email,user.role)
        
        return res.json({token})
    }



    async login(req,res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal('User is not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('User is not found'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})

    }
}

module.exports =  new UserController()