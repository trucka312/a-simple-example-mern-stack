const mongoose = require('mongoose')
require("dotenv").config()
const connect = async () => {
    try{
       await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true })
       console.log('Kết nối tới db thành công')
    }
    catch(err){
       console.log('Lỗi kết nối DB:',err)
    }
}
module.exports = {connect} 
// 'mongodb://localhost:27017/db_cloudfoodsv'