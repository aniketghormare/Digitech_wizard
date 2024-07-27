const mongoose=require("mongoose")
require("dotenv").config()
const connection=mongoose.connect(process.env.MONGODB).then((res)=>{
    console.log("MongoDb Connected")
}).catch((err)=>{
    console.log(err)
})

module.exports=connection