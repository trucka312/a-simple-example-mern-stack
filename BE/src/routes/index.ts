const menuRouter = require("./menu")
const productRouter = require("./product")
const newsRouter = require("./news")
const contactRouter = require("./contact")
const orderRouter = require("./order")
const userRouter = require("./user")
const adminRouter = require("./admin")

const route = (app : any) => {
   app.use('/api/menu',menuRouter)
   app.use('/api/product',productRouter)
   app.use('/api/news',newsRouter)
   app.use('/api/contact',contactRouter)
   app.use('/api/order',orderRouter)
   app.use('/api/user',userRouter)
   app.use('/api/admin',adminRouter)
}

module.exports = route