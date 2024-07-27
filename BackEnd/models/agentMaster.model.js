const mongoose = require('mongoose');

const agentMasterSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    doj: {
        type: Date,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    subAdminCommType: {
        type: String,
        required: true
    },
    subAdminCommMatch: {
        type: Number,
        required: true
    },
    subAdminCommSSN: {
        type: Number,
        required: true
    },
    chips: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "AgentMaster"
    }
});

const AgentMasterModel = mongoose.model('agentMaster', agentMasterSchema);

module.exports=AgentMasterModel
