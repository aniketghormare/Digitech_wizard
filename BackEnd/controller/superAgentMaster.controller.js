const SuperAgentMasterModel = require("../models/superAgentMaster.model");

exports.getSuperAgentMasterById = async (req, res) => {
    try {
        const { id } = req.params;

        
        const superAgentMaster = await SuperAgentMasterModel.findById(id);

        if (!superAgentMaster) {
            return res.status(404).json({ message: 'Super agent master not found!!' });
        }

        res.status(200).json({ data: superAgentMaster });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllSuperAgentMasters = async (req, res) => {
    try {
        const { search, sortField, sortOrder, page = 1, limit = 10 } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { code: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
                { admin: { $regex: search, $options: 'i' } },
                { contact: { $regex: search, $options: 'i' } },
                
            ];
        }

        const sort = {};
        if (sortField && sortOrder) {
            sort[sortField] = sortOrder === 'asc' ? 1 : -1;
        }

        const skip = (page - 1) * limit;

        const total = await SuperAgentMasterModel.countDocuments(query);
        const superAgentMasters = await SuperAgentMasterModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            data: superAgentMasters,
            total,
            page,
            limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSuperAgentMaster = async (req, res) => {
    try {
        const {
            code,
            name,
            admin,
            contact,
            doj,
            pwd,
            subAdminShareCasinoShr,
            subAdminCommType,
            subAdminCommMatch,
            subAdminCommSSN,
            chips,
            status,
            role
        } = req.body;

        
        if (!code || !name || !admin || !contact || !doj || !pwd || !subAdminShareCasinoShr || !subAdminCommType || !subAdminCommMatch || !subAdminCommSSN || !chips || !status || !role) {
            return res.status(400).json({ message: 'All fields are required!!' });
        }

    
        const superAdmin = await SuperAgentMasterModel.create(req.body);

        res.status(201).json(superAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateSuperAgentMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        
        const requiredFields = [
            'code', 'name', 'admin', 'contact', 'doj', 'pwd',
            'subAdminShareCasinoShr', 'subAdminCommType', 
            'subAdminCommMatch', 'subAdminCommSSN', 'chips', 'status', 'role'
        ];

        for (const field of requiredFields) {
            if (field in updates && !updates[field]) {
                return res.status(400).json({ message: `${field} is required!!` });
            }
        }

        
        const superAdmin = await SuperAgentMasterModel.findByIdAndUpdate(id, updates, { new: true });

        if (!superAdmin) {
            return res.status(404).json({ message: 'Super admin not found!!' });
        }

        res.status(200).json({ message: 'Super admin updated successfully!!', data: superAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteSuperAgentMaster = async (req, res) => {
    try {
        const { id } = req.params;

        
        const superAdmin = await SuperAgentMasterModel.findByIdAndDelete(id);

        if (!superAdmin) {
            return res.status(404).json({ message: 'Super admin not found!!' });
        }

        res.status(200).json({ message: 'Super admin deleted successfully!!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};