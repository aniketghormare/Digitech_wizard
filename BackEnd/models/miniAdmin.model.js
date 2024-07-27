const mongoose=require("mongoose")


const MiniAdminSchema=mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    Name:{
        type:String,
        require:true
    },
    admin:{
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
    subAdminShareMatchShr:{
        type:Number,
        require:true
    },
    subAdminShareCasinoShr:{
        type:Number,
        require:true
    },
    subAdminCommType:{
        type:String,
        require:true
    },
    subAdminCommMatch:{
        type:Number,
        require:true
    },
    subAdminCommSSN:{
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
        default: "MiniAdmin"
    }

})

const miniAdminModal=mongoose.model("miniAdmin",MiniAdminSchema)

module.exports=miniAdminModal