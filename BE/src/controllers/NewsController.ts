import { Request, Response } from "express"
const News = require("../models/News")
const fs = require('fs')
require("dotenv").config()
class NewsController {
    // GET lấy tất cả danh sách tin tức
    async getAllNews(req : Request, res : Response) {
        try {
            let page = req.query.page // param ?page=
            const pageNewsSize = 6 // số bài tin trong 1 page
            if(page) {
                let pageNum = Number(page) // số page hiện tại param ?page=
                if(pageNum < 1) pageNum = 1
                const skipNewsNum = (pageNum - 1) * pageNewsSize // số bài tin bỏ qua khi chuyển
                const newsItem = await News.find({}).sort({createdAt: -1}).skip(skipNewsNum).limit(pageNewsSize)
                const sumNews = await News.countDocuments({}) // tổng số bài tin
                const pageSum = Math.ceil(sumNews / pageNewsSize) // tổng số page tương ứng
                res.json({pageSum : pageSum,data:newsItem})
             }
             else {
                const news = await News.find({}).sort({createdAt: -1})
                res.json(news)
             }
        }
        catch(err){
            console.log(err)
        }
    }
     // GET danh sách tin tức theo title
     async getNewsByTitle(req : Request, res : Response) {
        try {
            const news = await News.findOne({newsTitle :req.params.newsTitle})
            res.json(news)
        }
        catch(err){
            console.log(err)
        }
    }
    // POST thêm tin tức
    async addNews(req : any, res : Response) {
        try{
          req.body.imgNews = `${process.env.API_URL}/uploads/${req.file.filename}`
          const newItem = new News(req.body)
          await newItem.save()
          res.json()
        }
        catch(err){
          console.log(err)
        }
     }
    // PATCH cập nhật tin tức
     async updateNews(req : any, res : Response) {
      try{
        if(req.body.imgNews === '') {
          const newsItem = News.findById(req.params._id)  
          req.body.imgNews = newsItem.imgNews
          await News.updateOne({_id:req.params._id},req.body)
          res.json()
        }
        else {
          // const filter = {_id:req.params._id}
          req.body.imgNews = `${process.env.API_URL}uploads/${req.file.filename}`
          await News.updateOne({_id:req.params._id},req.body)
          res.json()
        }
      }
      catch(err){
        console.log(err)
      }
   }
     // DELETE xóa tin tức
    async deleteNews(req : Request, res : Response) {
      try{
        const newItem = await News.findById(req.params._id)
        await fs.unlink(`./src/uploads/${newItem.imgNews.split('/').slice(-1)}`,(err: Error)=>{
          if(err) console.log(err)
        })
        await newItem.remove()
        res.json()
        }
        catch(err){
          console.log(err)
        }
     }
}
module.exports = new NewsController