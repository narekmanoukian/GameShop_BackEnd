const sequelize = require ('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING, },
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})

const BasketGame = sequelize.define('basket_game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Game = sequelize.define('game',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})


const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const GameInfo = sequelize.define('game_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
//----------------------------------------
User.hasOne(Basket)
Basket.belongsTo(User)
//----------------------------------------
User.hasMany(Rating)
Rating.belongsTo(User)
//----------------------------------------
Basket.hasMany(BasketGame)
BasketGame.belongsTo(Basket)
//----------------------------------------
Category.hasMany(Game)
Game.belongsTo(Category)
//----------------------------------------
Game.hasMany(Rating)
Rating.belongsTo(Game)
//----------------------------------------
Game.hasMany(BasketGame)
BasketGame.belongsTo(Game)
//----------------------------------------
Game.hasMany(GameInfo, {as:'info'})
GameInfo.belongsTo(Game)
//----------------------------------------
module.exports = {
    User,
    Basket,
    BasketGame,
    Game,
    Category,
    Rating,
    GameInfo
}

