const mongoose = require('mongoose');

const superMasterSchema = new mongoose.Schema({
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
        type: Number,
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
    subAdminShareCasinoShr: {
        type: Number,
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
        type: Boolean,
        required: true, 
        default: true
    },
    role: {
        type: String,
        default: "SuperAgentMaster"
    }
});

const SuperAgentMasterModel=mongoose.model('superAgentMaster', superMasterSchema)

module.exports = SuperAgentMasterModel;
