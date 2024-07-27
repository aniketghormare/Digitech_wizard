

const express=require("express");
const { createMiniAdminMaster, updateMiniAdminMaster, deleteMiniAdminMaster, getMiniAdminMasterById, getAllMiniAdminMasters } = require("../controller/miniAdminMaster.controller");
const { auth } = require("../middleware/auth.middleware");




const miniAdminMasterRouter=express.Router()

miniAdminMasterRouter.get('/getMiniAdminMaster/:id',auth, getMiniAdminMasterById);

miniAdminMasterRouter.get('/getAllMiniAdminMaster',auth, getAllMiniAdminMasters);


miniAdminMasterRouter.post('/miniAdminMasterCreate',auth, createMiniAdminMaster);

miniAdminMasterRouter.patch('/miniAdminMasterUpdate/:id',auth, updateMiniAdminMaster);

miniAdminMasterRouter.delete('/miniAdminMasterDelete/:id',auth, deleteMiniAdminMaster);

module.exports=miniAdminMasterRouter