

const express=require("express");
const { createSuperAgentMaster, updateSuperAgentMaster, deleteSuperAgentMaster, getSuperAgentMasterById, getAllSuperAgentMasters } = require("../controller/superAgentMaster.controller");
const { auth } = require("../middleware/auth.middleware");





const superAgentMasterRouter=express.Router()

superAgentMasterRouter.get('/getSuperAgentMaster/:id',auth, getSuperAgentMasterById);

superAgentMasterRouter.get('/getAllSuperAgentMaster',auth, getAllSuperAgentMasters);


superAgentMasterRouter.post('/superAgentMasterCreate',auth, createSuperAgentMaster);

superAgentMasterRouter.patch('/superAgentMasterUpdate/:id',auth, updateSuperAgentMaster);

superAgentMasterRouter.delete('/superAgentMasterDelete/:id',auth, deleteSuperAgentMaster);

module.exports=superAgentMasterRouter