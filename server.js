const express  =require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')


// dotenv config
dotenv.config()
// mongoDB connection 
connectDB()


const app = express()


//  middle_wares 

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))









// port 
const PORT = process.env.PORT || 8080
app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})
