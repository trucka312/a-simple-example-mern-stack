const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    prodName: {type : String , maxLength:250 , require:true},
    prodType :{type : String , maxLength:50 , require:true},
    prodImg:{type : String , require:true}, 
    prodPrice : {type : Number , require:true},
    prodDetail : {type:String , maxLength:500,require:true},
    quantity :{type : Number , require:true},
    saleOff : {type : String , require:true},
},{timestamps: true})
module.exports =  mongoose.model('Product', Product)
export {} 