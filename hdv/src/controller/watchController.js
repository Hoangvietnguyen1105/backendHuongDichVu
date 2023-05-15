import db from "../models/index" // tất cả các db trong mysql sẽ được export thành object db 

let getALlWatch = async(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.watchs.findAll({raw:true})
            return res.status(200).json({
                data
            })
            resolve()
        } catch (error) {
            reject(error)
        }
        
    })
    
}
let addNew = async (req, res) => {
    try {
      let data = req.body;
      console.log(data)
      await db.watchs.create({
        title :data.title,
        isNew :data.isNew,
        oldPrice:data.oldPrice,
        price:data.price,
        description:data.description,
        category:data.category,
        image:data.image,
        rating:data.rating,
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
  };
  let updateWatch = async(req,res)=>{
    try {
        let data = req.body
        console.log(data)
        await db.watchs.update({
            title :data.title,
            isNew :data.isNew,
            oldPrice:data.oldPrice,
            price:data.price,
            description:data.description,
            category:data.category,
            image:data.image,
            rating:data.rating,
        },
            {
                where:{id:data.id}
            }
        );
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
  let deleteWatch = async(req,res)=>{
        try {
            let data = req.query
            console.log(data)
            let watch = await db.watchs.findOne({where:{id:data.id},raw:false})
            watch.destroy()
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
  let findByCategory = async(req,res)=>{
    try {
        let data = req.body
        let watchs = await db.watchs.findAll({where:{category:data.category}})
        if(watchs.length > 0){
            return res.status(200).json({
                msg:"1",
                watchs
              });
        }
        else{
            return res.status(200).json({
                msg:"0"
              });
        }
    } catch (error) {
        console.log(error)
    }
  }
  let findById = async(req,res)=>{
    try {
        let data = req.query
        console.log(data.id)
        let watch = await db.watchs.findOne({where:{id:data.id}})
        if(watch){
            return res.status(200).json({
                msg:"1",
                watch:watch
              });
        }
        else{
            return res.status(200).json({
                msg:"0"
              });
        }
    } catch (e) {
        console.log(e)
    }
  }
  

module.exports = {getALlWatch,addNew,updateWatch,deleteWatch,findByCategory,findById}