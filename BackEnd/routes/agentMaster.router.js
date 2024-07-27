

const express=require("express");
const { createAgentMaster, updateAgentMaster, deleteAgentMaster, getAgentMasterById, getAllAgentMasters } = require("../controller/agentMaster.controller");
const { auth } = require("../middleware/auth.middleware");

const agentMasterRouter=express.Router()


agentMasterRouter.get('/getAgentMaster/:id',auth, getAgentMasterById);

agentMasterRouter.get('/getAllAgentMaster',auth, getAllAgentMasters);

agentMasterRouter.post('/agentMasterCreate',auth, createAgentMaster);

agentMasterRouter.patch('/agentMasterUpdate/:id',auth, updateAgentMaster);

agentMasterRouter.delete('/agentMasterDelete/:id',auth, deleteAgentMaster);

module.exports=agentMasterRouter