import { Request, Response } from "express"
const Order = require("../models/Order")
class OrderController {
    // GET lấy tất cả danh sách đơn hàng
    async getAllOrder(req : Request, res : Response) {
        try {
            let page = req.query.page // param ?page=
            const pageOrderSize = 15 // số đơn hàng trong 1 page
            if(page) {
                let pageNum = Number(page) // số page hiện tại param ?page=
                if(pageNum < 1) pageNum = 1
                const skipOrderNum = (pageNum - 1) * pageOrderSize // số đơn hàng bỏ qua khi chuyển
                const newsItem = await Order.find({}).sort({createdAt: -1}).skip(skipOrderNum).limit(pageOrderSize)
                const sumOrder = await Order.countDocuments({}) // tổng số đơn hàng
                const pageSum = Math.ceil(sumOrder / pageOrderSize) // tổng số page tương ứng
                res.json({pageSum : pageSum,data:newsItem})
             }
             else {
                const news = await Order.find({}).sort({createdAt: -1})
                res.json(news)
             }
        }
        catch(err){
            console.log(err)
        }
    }
    // GET lấy đơn hàng theo tên khách hàng
    async getOrderByUser(req : Request, res : Response) {
      try {
       const orderList = await Order.find({userName: req.params.userName}).sort({createdAt: -1})
       res.json(orderList)
      }
      catch (err) {
       console.error(err)
      }
     }
    // POST thêm đơn hàng
    async addOrder(req : Request, res : Response) {
      try{
        const order = new Order(req.body)
        await order.save()
        res.json()
      }
      catch(err){
        console.log(err)
      }
     }
         // PATCH cập nhật menu
     async updateOrder(req : Request, res : Response) {
      try{
          await Order.updateOne({_id:req.params._id},req.body)
          res.json()
        }
      catch(err){
        console.log(err)
      }
   }
     // DELETE xóa đơn hàng
    async deleteOrder(req : Request, res : Response) {
      try{
          await Order.findByIdAndRemove(req.params._id)
          res.json()
        }
        catch(err){
          console.log(err)
        }
     }
}
module.exports = new OrderController

