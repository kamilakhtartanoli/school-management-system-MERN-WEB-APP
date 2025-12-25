const mongoose = require('mongoose')

const classschema = new mongoose.Schema({
    classname:{
        type:String,
        required:true
    },
    classteacher:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    classroom:{
        type:String,
        required:true
    }
},{timestamps:true})

const Class = mongoose.model('Class',classschema)

module.exports={
    Class
}