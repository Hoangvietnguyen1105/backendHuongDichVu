import express, { response } from "express";
import watchController from "../controller/watchController"
let router = express.Router();
router.get('/getAllWatch',watchController.getALlWatch)

module.exports=router