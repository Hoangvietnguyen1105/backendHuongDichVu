import express, { response } from "express";
import userController from "../controller/userController"
let router = express.Router();
router.get('/getAllUser',userController.getAllUser)
router.post('/addNewUser',userController.addNewUser)
router.post('/updateUser',userController.updateUser)
router.delete('/deleteUser',userController.deleteUser)
router.post('/checkEmail',userController.checkEmail)
router.get('/findById',userController.findById)
router.get('/checkLogin',userController.checkLogin)
module.exports=router