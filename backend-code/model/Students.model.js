const mongoose = require('mongoose')

const studentschema = new mongoose.Schema({
    studentid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    classname:{
        type:Number,
        required:true
    },
    feepay:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Students = mongoose.model('Students',studentschema)

module.exports={Students}