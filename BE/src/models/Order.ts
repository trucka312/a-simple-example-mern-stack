const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
  userName: {type : String ,require:true},
  phoneNumber : {type : Number , require:true},
  userAddress : {type : String , require:true},
  paymentMethods : {type : String , require:true},
  productDetails : {type : String , require:true},
  totalPrice : {type : Number , require:true},
  status : {type : Boolean , require:true},
},{timestamps: true})
module.exports =  mongoose.model('Order', Order)
export {} 
