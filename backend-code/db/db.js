const mongoose = require('mongoose')

const database = async (req , res) =>{
    try{
        const url = process.env.mongodburl
        await mongoose.connect(url)
        console.log('Datbase-Connected-Successfully')
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = {database}