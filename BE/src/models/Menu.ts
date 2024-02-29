const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Menu = new Schema({
  menuType: {type : String , maxLength:50 ,require:true},
  imgMenu : {type : String , require:true},
},{timestamps: true})
module.exports =  mongoose.model('Menu', Menu)
export {} 
