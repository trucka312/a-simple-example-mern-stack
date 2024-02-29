import { Request, Response } from "express"
const Admin = require("../models/Admin")
class AdminController {
     // POST đăng nhập
    async loginAdmin(req : Request, res : Response) {
      try{
        const adminAccount = await Admin.findOne({adminAccount :req.body.adminAccount,adminPassword:req.body.adminPassword})
        if (adminAccount) res.json(adminAccount)
        else res.status(401).send('Tài khoản hoặc mật khẩu không đúng')
      }
      catch(err){
        console.log(err)
      }
     }
}
module.exports = new AdminController

