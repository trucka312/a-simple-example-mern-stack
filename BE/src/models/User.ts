const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
   userName: {type : String, require:true},
   phoneNumber : {type : Number , require:true},
   userMail: {type : String ,require:true},
   userPassword: {type : String ,minLength : 6 ,require:true},
},{timestamps: true})
module.exports =  mongoose.model('User', User)
export {} 