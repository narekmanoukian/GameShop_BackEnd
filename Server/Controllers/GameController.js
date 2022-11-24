const uuid = require ('uuid')
const path = require('path')
const {Game, GameInfo} = require('../Models/model')
const ApiError = require('../Errors/ApiErrors')
const {json} = require('body-parser')

class GameController {
    async create(req, res, next){
        try {   
            let {name, price, categoryId, info } = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'Static', fileName))
            
            if(info){
                info = JSON.parse(info) 
                info.forEach(i => {
                    GameInfo.create({
                        title: i.title,
                        description: i.description,
                        gameId: game.id 
                    })
                });
            }


        const game = await Game.create({name, price, categoryId, image: fileName})

        return res.json(game)
        } catch(e){
            next(ApiError.badRequest(e.message))}
    }

    
    async getAll(req,res){
        const {categoryId, limit, page } = req.querry
        page = page || 1
            limit = limit || 9
            let offset = page*limit - limit 
        
        let games; 
            if(!categoryId){
                games = await Game.findAndCountAll({limit, offset})
            }
            if(categoryId){
                games = await Game.findAndCountAll({where:{categoryId, limit, offset }})
            }
        return res.json(games)
    }
    async getOne(req, res){
        const {id} = req.params
        const game = await Game.findOne(
            {
                where: {id},
                include:[{model: GameInfo, as: 'info'}]
            },
        )
        return res.JSON(game)
    }

}

module.exports =  new GameController()