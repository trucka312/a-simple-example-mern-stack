const mongoose = require('mongoose')
const Schema = mongoose.Schema

const News = new Schema({
  newsTitle: {type : String , maxLength:250 ,require:true},
  imgNews : {type : String , require:true},
  newsContent : {type : String , require:true},
  editor: {type : String , maxLength:50, require:true},
},{timestamps: true})
module.exports =  mongoose.model('News', News)
export {} 
