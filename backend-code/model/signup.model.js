const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const signupschema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
},
profilepic:{
    type:String,
    default:''
},
role:{
    type:String,
    enum:["admin"],
    default:'admin'
}
},{timestamps:true})

signupschema.pre('save' , async function(next){
if(!this.isModified('password')) return next()
const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password,salt)
next()
})

signupschema.methods.generateToken = function(){
    return jwt.sign({id:this._id  , role:this.role} , process.env.jwtsecret,{
        expiresIn:'7d'
    })
}

signupschema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Signup = mongoose.model('Signup' , signupschema)

module.exports = {Signup}