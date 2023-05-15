import express from "express";
import user from "./user"
let router = express.Router();
//thiết kế routes cho project
let initWebRoutes = (app)=>{
    router.get('/',(req,res)=>{
        return res.send("hello world") 
    })
    router.use('/user',user)
    return app.use("/",router);

}

module.exports = initWebRoutes;
