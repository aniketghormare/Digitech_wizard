const mongoose=require("mongoose")


const ClientSchema=mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    Name:{
        type:String,
        require:true
    },
    agent:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
    },
    doj:{
        type:Date,
        require:true
    },
    pwd:{
        type:String,
        require:true
    },
    expo:{
        type:Number,
        require:true
    },
    clientCommType:{
        type:String,
        require:true
    },
    clientCommMatch:{
        type:Number,
        require:true
    },
    clientCommSsn:{
        type:Number,
        require:true
    },
   
    chips:{
        type:Number,
        require:true
    },
    status:{
        type:Boolean,
        require:true,
        default:true
    },
    role: {
        type: String,
        default: "Client"
    }

})

const ClientModel=mongoose("client",ClientSchema)

module.exports=ClientModel