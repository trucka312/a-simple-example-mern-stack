const express = require('express')
const router = express.Router()
const orderController = require('../controllers/OrderController')

router.get('/:userName',orderController.getOrderByUser)
router.get('/',orderController.getAllOrder)
router.post('/',orderController.addOrder)
router.patch('/:_id',orderController.updateOrder)
router.delete('/delete/:_id',orderController.deleteOrder)

module.exports = router
export {} 

