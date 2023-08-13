const mongoose = require('mongoose')

const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`database connectrd ${mongoose.connection.host} `)
    } catch (error) {
        console.log( `error occured ${error}`)
    }
}

module.exports = connectDB