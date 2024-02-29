import { Request, Response } from "express"
const Contact = require("../models/Contact")
class ContactController {
    // GET lấy tất cả danh sách liên hệ
    async getAllContact(req : Request, res : Response) {
        try {
            let page = req.query.page // param ?page=
            const pageContactSize = 15 // số liên hệ trong 1 page
            if(page) {
                let pageNum = Number(page) // số page hiện tại param ?page=
                if(pageNum < 1) pageNum = 1
                const skipContactNum = (pageNum - 1) * pageContactSize // số liên hệ bỏ qua khi chuyển
                const contactItem = await Contact.find({}).sort({createdAt: -1}).skip(skipContactNum).limit(pageContactSize)
                const sumContact = await Contact.countDocuments({}) // tổng số liên hệ
                const pageSum = Math.ceil(sumContact / pageContactSize) // tổng số page tương ứng
                res.json({pageSum : pageSum,data:contactItem})
             }
             else {
                const news = await Contact.find({}).sort({createdAt: -1})
                res.json(news)
             }
        }
        catch(err){
            console.log(err)
        }
    }
    // POST thêm liên hệ
    async addContact(req : Request, res : Response) {
        try{
          const contactItem = new Contact(req.body)
          await contactItem.save()
          res.json()
        }
        catch(err){
          console.log(err)
        }
     }
         // PATCH cập nhật menu
     async updateContact(req : Request, res : Response) {
      try{
          await Contact.updateOne({_id:req.params._id},req.body)
          res.json()
        }
      catch(err){
        console.log(err)
      }
   }
     // DELETE xóa liên hệ
    async deleteContact(req : Request, res : Response) {
      try{
          await Contact.findByIdAndRemove(req.params._id)
          res.json()
        }
        catch(err){
          console.log(err)
        }
     }
}
module.exports = new ContactController

