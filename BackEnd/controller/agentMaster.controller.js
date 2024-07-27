
const AgentMasterModel = require('../models/agentMaster.model');



exports.getAgentMasterById = async (req, res) => {
    try {
        const { id } = req.params;

        
        const agentMaster = await AgentMasterModel.findById(id);

        if (!agentMaster) {
            return res.status(404).json({ message: 'Agent Master not found!!' });
        }

        res.status(200).json({ data: agentMaster });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllAgentMasters = async (req, res) => {
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

        const total = await AgentMasterModel.countDocuments(query);
        const agentMasters = await AgentMasterModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            data: agentMasters,
            total,
            page,
            limit,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAgentMaster = async (req, res) => {
    try {
        const {
            code,
            name,
            admin,
            contact,
            doj,
            pwd,
            subadminCommType,
            subadminCommMatch,
            subadminCommSSN,
            chips,
            status,
            role
        } = req.body;

        if (!code || !name || !admin || !contact || !doj || !pwd || !subadminCommType || !subadminCommMatch || !subadminCommSSN || !chips || !status || !role) {
            return res.status(400).json({ message: 'All fields are required!!' });
        }

        const agentMaster = await AgentMasterModel.create(req.body);

        res.status(201).json({data:agentMaster});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateAgentMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

       
        const requiredFields = [
            'code', 'name', 'admin', 'contact', 'doj', 'pwd',
            'subadminCommType', 'subadminCommMatch', 'subadminCommSSN', 'chips', 'status','role'
        ];

        for (const field of requiredFields) {
            if (field in updates && !updates[field]) {
                return res.status(400).json({ message: `${field} is required!!` });
            }
        }

       
        const agentMaster = await AgentMasterModel.findByIdAndUpdate(id, updates, { new: true });

        if (!agentMaster) {
            return res.status(404).json({ message: 'Agent Master not found!!' });
        }

        res.status(200).json({ message: 'Agent Master updated successfully!!', data: agentMaster });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteAgentMaster = async (req, res) => {
    try {
        const { id } = req.params;

        
        const agentMaster = await AgentMasterModel.findByIdAndDelete(id);

        if (!agentMaster) {
            return res.status(404).json({ message: 'Agent Master not found!!' });
        }

        res.status(200).json({ message: 'Agent Master deleted successfully!!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
