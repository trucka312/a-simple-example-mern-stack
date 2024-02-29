import { Request, Response } from "express"
const User = require("../models/User")
class UserController {
    // GET lấy tất cả danh sách người dùng
    async getAllUser(req : Request, res : Response) {
      try {
        let page = req.query.page // param ?page=
        const pageUserSize = 15 // số người dùng trong 1 page
        if(page) {
            let pageNum = Number(page) // số page hiện tại param ?page=
            if(pageNum < 1) pageNum = 1
            const skipUserNum = (pageNum - 1) * pageUserSize // số người dùng bỏ qua khi chuyển
            const user = await User.find({}).sort({createdAt: -1}).skip(skipUserNum).limit(pageUserSize)
            const sumUser = await User.countDocuments({}) // tổng số người dùng
            const pageSum = Math.ceil(sumUser / pageUserSize) // tổng số page tương ứng
            res.json({pageSum : pageSum,data:user})
          }
          else {
            const news = await User.find({}).sort({createdAt: -1})
            res.json(news)
          }
      }
      catch(err){
          console.log(err)
      }
    }
    // POST thêm người dùng (đăng ký)
    async addUser(req : Request, res : Response) {
      try{
        const email = await User.findOne({userMail :req.body.userMail})
        if(email) res.status(409).send('Tài khoản đã tồn tại (Email đã tồn tại)')
        else {
          const user = new User(req.body)
          await user.save()
          res.json()
        }
      }
      catch(err){
        console.log(err)
      }
     }
     // POST đăng nhập
    async loginUser(req : Request, res : Response) {
      try{
        const userAccount = await User.findOne({userMail :req.body.userMail,userPassword:req.body.userPassword})
        if (userAccount) res.json(userAccount)
        else res.status(401).send('Tài khoản hoặc mật khẩu không đúng')
      }
      catch(err){
        console.log(err)
      }
     }
         // PATCH cập nhật menu
     async updateUser(req : Request, res : Response) {
      try{
          await User.updateOne({_id:req.params._id},req.body)
          res.json()
        }
      catch(err){
        console.log(err)
      }
   }
     // DELETE xóa người dùng
    async deleteUser(req : Request, res : Response) {
      try{
          await User.findByIdAndRemove(req.params._id)
          res.json()
        }
        catch(err){
          console.log(err)
        }
     }
}
module.exports = new UserController

