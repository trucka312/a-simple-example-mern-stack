import { Request, Response } from "express"
const Product = require("../models/Product")
const fs = require('fs')
require("dotenv").config()
interface CartItem{
  _id: null,
  prodName: string,
  prodType : string,
  prodImg : string,
  prodPrice : number,
  prodDetail : string,
  quantity : number,
  saleOff:string,
  createdAt:string,
  updatedAt:string,
  qty : number
}
class ProductController {
    // GET lấy tất cả sản phẩm
    async getAllProduct(req : Request, res : Response) {
      try {
        let page = req.query.page // param ?page=
        const pageProdSize = 8 // số sp trong 1 page
        if(page) {
          let pageNum = Number(page) // số page hiện tại param ?page=
          if(pageNum < 1) pageNum = 1
          const skipProductNum = (pageNum - 1) * pageProdSize // số sp bỏ qua khi chuyển
          const menuItem = await Product.find({}).sort({createdAt: -1}).skip(skipProductNum).limit(pageProdSize)
          const sumProd = await Product.countDocuments({}) // tổng số sp
          const pageSum = Math.ceil(sumProd / pageProdSize) // tổng số page tương ứng
          res.json({pageSum : pageSum,data:menuItem,})
        }
        else {
         const allMenuItem = await Product.find({}).sort({createdAt: -1})
         res.json(allMenuItem)
        }
      }
      catch(err){
        console.log(err)
      }
    }
    // GET lấy sản phẩm theo loại sản phẩm 
    async getProductByType(req : Request, res : Response) {
      try {
        let page = req.query.page
        const pageProdSize = 8
        if(page) {
          let pageNum = Number(page)
          if(pageNum < 1) pageNum = 1
          const skipProductNum = (pageNum - 1) * pageProdSize
          const menuItem = await Product.find({prodType :req.params.prodType}).sort({createdAt: -1}).skip(skipProductNum).limit(pageProdSize)
          const sumProd = await Product.countDocuments({prodType :req.params.prodType})
          const pageSum = Math.ceil(sumProd / pageProdSize)
          res.json({pageSum : pageSum,data:menuItem,})
        }
        else {
         const allMenuItemType = await Product.find({prodType :req.params.prodType}).sort({createdAt: -1})
         res.json(allMenuItemType)
        }
      }
      catch(err){
        console.log(err)
      }
    }
    // GET lấy sản phẩm theo tên 
    async getProductByName(req : Request, res : Response) {
      try{
        const productName = await Product.findOne({prodName :req.params.prodName})
        res.json(productName)
      }
      catch(err){
        console.log(err)
      }
    }
    // POST thêm sp
    async addProduct(req : any, res : Response) {
      try{
        req.body.prodImg = `${process.env.API_URL}/uploads/${req.file.filename}`
        const productItem = new Product(req.body)
        await productItem.save()
        res.json()
      }
      catch(err){
        console.log(err)
      }
    }
  // PATCH cập nhật sp
    async updateProduct(req : any, res : Response) {
    try{
      if(req.body.prodImg === '') {
        const productItem = Product.findById(req.params._id)  
        req.body.prodImg = productItem.prodImg
        await Product.updateOne({_id:req.params._id},req.body)
        res.json()
      }
      else {
        // const filter = {_id:req.params._id}
        req.body.prodImg = `${process.env.API_URL}/uploads/${req.file.filename}`
        await Product.updateOne({_id:req.params._id},req.body)
        res.json()
      }
    }
    catch(err){
      console.log(err)
    }
  }
   // PATCH cập nhật số lượng sp
  async updateQuantity(req : Request, res : Response) {
    try{
      const cartList = req.body
      cartList.map(async (item : CartItem) => {
        const filter = { prodName: item.prodName }
        const update = { quantity: item.quantity - (item.qty || 1) }
        await Product.findOneAndUpdate(filter, update)
        res.json()
      })
    }
    catch(err){
      console.log(err)
    }
  }
    // DELETE xóa sp
  async deleteProduct(req : Request, res : Response) {
    try{
        const prodItem = await Product.findById(req.params._id)
        await fs.unlink(`./src/uploads/${prodItem.prodImg.split('/').slice(-1)}`,(err: Error)=>{
          if(err) console.log(err)
        })
        await prodItem.remove()
        res.json()
      }
      catch(err){
        console.log(err)
      }
    }
}
module.exports = new ProductController