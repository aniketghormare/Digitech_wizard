const mongoose = require('mongoose');

const miniAdminMasterSchema = new mongoose.Schema({
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
    subAdminShareMatchShr: {
        type: Number,
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
    role: {
        type: String,
        default: "MiniAdminMaster"
    }
});

const MiniAdminMasterModel = mongoose.model('miniAdminMaster', miniAdminMasterSchema);

module.exports = MiniAdminMasterModel;
