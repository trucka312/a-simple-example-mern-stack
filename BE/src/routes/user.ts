const express = require('express')

const router = express.Router()
const userController = require('../controllers/UserController')

router.get('/',userController.getAllUser)
router.post('/',userController.addUser)
router.post('/login',userController.loginUser)
router.patch('/:_id',userController.updateUser)
router.delete('/delete/:_id',userController.deleteUser)

module.exports = router


