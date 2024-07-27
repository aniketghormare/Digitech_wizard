

const express=require("express");
const { createMasterMaster, updateMasterMaster, deleteMasterMaster, getMasterMasterById, getAllMasterMasters } = require("../controller/masterMaster.controller");
const { auth } = require("../middleware/auth.middleware");


const masterMasterRouter=express.Router()

masterMasterRouter.get('/getMasterMaster/:id',auth, getMasterMasterById);

masterMasterRouter.get('/getAllMasterMaster',auth, getAllMasterMasters);


masterMasterRouter.post('/masterMasterCreate',auth, createMasterMaster);

masterMasterRouter.patch('/masterMasterUpdate/:id',auth, updateMasterMaster);

masterMasterRouter.delete('/masterMasterDelete/:id',auth, deleteMasterMaster);

module.exports=masterMasterRouter