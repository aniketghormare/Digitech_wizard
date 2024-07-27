

const express=require("express");
const { createMiniAdmin, updateMiniAdmin, deleteMiniAdmin, getMiniAdminById, getAllMiniAdmins } = require("../controller/miniAdmin.controller");
const { auth } = require("../middleware/auth.middleware");



const miniAdminRouter=express.Router()



miniAdminRouter.get('/getMiniAdmin/:id',auth, getMiniAdminById);

miniAdminRouter.get('/getAllMiniAdmin',auth, getAllMiniAdmins);


miniAdminRouter.post('/miniAdminCreate',auth, createMiniAdmin);

miniAdminRouter.patch('/miniAdminUpdate/:id',auth, updateMiniAdmin);

miniAdminRouter.delete('/miniAdminDelete/:id',auth, deleteMiniAdmin);

module.exports=miniAdminRouter