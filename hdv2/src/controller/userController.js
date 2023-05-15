import db from "../models/index" // tất cả các db trong mysql sẽ được export thành object db 

let getAllUser = async(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.users.findAll({raw:true})
            return res.status(200).json({
                data
            })
            resolve()
        } catch (error) {
            reject(error)
        }
        
    })
    
}
let addNewUser = async (req, res) => {
    try {
      let data = req.body;

      console.log(data)
      await db.users.create({
        name :data.name,
        age :data.age,
        gmail:data.gmail,
        phoneNumber:data.phoneNumber,
        address:data.address,
        status:data.status
      });
      let user = await db.users.findOne({where:{gmail:data.gmail}})
      await db.auths.create({
        userId : user.id,
        username:data.username||"google login",
        password:data.password||"google login",
        role:data.role || "customer"
      })
      return res.status(200).json({
        msg: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error",
      });
    }
  };
  let updateUser = async(req,res)=>{
    try {
        let data = req.body;
        console.log(data)
        await db.users.update({
          name :data.name,
          age :data.age,
          gmail:data.gmail,
          phoneNumber:data.phoneNumber,
          address:data.address,
          status:data.status
        },{
            where:{id:data.id}
        });
    
        return res.status(200).json({
          msg: "success",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          msg: "error",
        });
      }
  }
  let deleteUser = async(req,res)=>{
        try {
            let data = req.query
            let user = await db.users.findOne({where:{id:data.id},raw:false})
            user.destroy()
            return res.status(200).json({
                msg: "success",
              });
        } catch (error) {
            
        }
  }
  let checkEmail = async(req,res)=>{
    try {
      let data = req.body
      let mail = await db.users.findOne({where:{gmail:data.email}})
      console.log(mail)
      if(mail!==null){
        return res.status(200).json({
          msg: "success",
        });
      }
      else{
        return res.status(200).json({
          msg: "cant find user",
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  let findById = async(req,res)=>{
    try {
      let data = req.query
      let user = await db.users.findOne({where:{id:data.id}})
      if(user){
        return res.status(200).json({
          msg: "1",
          user:user
        });
      }
      else{
        return res.status(200).json({
          msg: "0",
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  let checkLogin = async(req,res)=>{
    try {
      let data = req.query
      let auth = await db.auths.findOne({where:{
        username:data.username,
        password:data.password
      }})
      if(auth){
        let user = await db.users.findOne({where:{id:auth.userId}})
        return res.status(200).json({
          msg: "1",
          user:user
        });
      }
      else{
        return res.status(200).json({
          msg: "0",
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
module.exports = {getAllUser,addNewUser,updateUser,deleteUser,checkEmail,findById,checkLogin}