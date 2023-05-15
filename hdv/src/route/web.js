import express from "express";
import watch from "./watch"
let router = express.Router();
//thiết kế routes cho project
let initWebRoutes = (app)=>{
    router.get('/',(req,res)=>{
        return res.send("hello world") 
    })
    router.use('/watch',watch)
    return app.use("/",router);

}

module.exports = initWebRoutes;
