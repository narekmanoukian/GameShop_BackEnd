require('dotenv').config()

const express = require('express')
const sequelize = require('./database')
const models = require('./Models/model')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./Routes/index')
const errorHandler = require('./Middleware/ErrorHandlingMiddleware')
const path = require('path')




const PORT = process.env.PORT 


const app = express()

//---------------------------------------------
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(errorHandler)
//---------------------------------------------

//---------------------------------------------
const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()



