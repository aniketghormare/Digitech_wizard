const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt=require("bcrypt")
require("dotenv").config()

exports.signup=async(req, res)=>{
    const { name,lastname, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.json({ msg: err })
            } else {
                const user = new userModel({name,lastname,email,password:hash})
                await user.save()
                res.json({ msg: "User Registered!!" })
            }
        })

    } catch (error) {
        res.json({ msg: "User not Registered!!", error })
    }
}


exports.login=async(req, res)=> {
    const {email,password}=req.body

    if(!email || !password){
        return res.json({msg:"Email and password required!!"})
    }
    try {
       const user=await userModel.findOne({email})
       if(user){
             bcrypt.compare(password,user.password,(err,final)=>{
               if(final){
                    let token=jwt.sign({userID:user._id},process.env.secretkey)
                    console.log(token)
                   res.json({msg:"Login Success!!",token})
               }else{
                   res.json({msg:err})
               }
             })
       }else{
           res.json({msg:"User not found!!"})
       }

    } catch (error) {
       res.json({msg:"user not found!!"})
    }
}



