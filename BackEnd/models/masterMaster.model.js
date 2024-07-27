const mongoose = require('mongoose');

const masterMasterSchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "MasterMaster"
    }
});

const MasterMasterModel = mongoose.model('masterMaster', masterMasterSchema);

module.exports = MasterMasterModel
