import express, { response } from "express";
import watchController from "../controller/watchController"
let router = express.Router();
router.get('/getAllWatch',watchController.getALlWatch)
router.post('/addNewWatch',watchController.addNew)
router.post('/updateWatch',watchController.updateWatch)
router.delete('/deleteWatch',watchController.deleteWatch)
router.post('/findByCategory',watchController.findByCategory)
router.get('/findById',watchController.findById)
module.exports=router