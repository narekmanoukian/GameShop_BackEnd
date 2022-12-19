const { Game, BasketGame, Basket } = require("../models/models")

class BasketController {
  async addToBasket(req,res,next){
        const user = req.user
        const {CategoryId} = req.body
        const basket = await BasketGame.create({basketId : user.id, CategoryId : CategoryId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const Basket = await BasketGame.findAll({include: {
                model: Game
            }, where: {basketId: id}})

        return res.json(basket)
    }

}

module.exports = new BasketController()