
const MiniAdminMasterModel = require('../models/miniAdminMaster.model');


exports.getMiniAdminMasterById = async (req, res) => {
    try {
        const { id } = req.params;

        const miniAdminMaster = await MiniAdminMasterModel.findById(id);

        if (!miniAdminMaster) {
            return res.status(404).json({ message: 'Mini-admin master not found!!' });
        }

        res.status(200).json({ data: miniAdminMaster });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllMiniAdminMasters = async (req, res) => {
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

        const total = await MiniAdminMasterModel.countDocuments(query);
        const miniAdminMasters = await MiniAdminMasterModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            data: miniAdminMasters,
            total,
            page,
            limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.createMiniAdminMaster = async (req, res) => {
    try {
        const {
            code,
            name,
            admin,
            contact,
            doj,
            pwd,
            subAdminShareMatchShr,
            subAdminShareCasinoShr,
            subAdminCommType,
            subAdminCommMatch,
            status,
            role
        } = req.body;

        if (!code || !name || !admin || !contact || !doj || !pwd || !subAdminShareMatchShr || !subAdminShareCasinoShr || !subAdminCommType || !subAdminCommMatch || !status || !role) {
            return res.status(400).json({ message: 'All fields are required!!' });
        }

        const miniAdminMaster = await MiniAdminMasterModel.create(req.body);

        res.status(201).json({ message: "Mini admin master created successfully!!", data: miniAdminMaster });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMiniAdminMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        
        const requiredFields = [
            'code', 'name', 'admin', 'contact', 'doj', 'pwd',
            'subAdminShareMatchShr', 'subAdminShareCasinoShr', 'subAdminCommType', 
            'subAdminCommMatch', 'subAdminCommSSN', 'chips', 'status','role'
        ];

        for (const field of requiredFields) {
            if (field in updates && !updates[field]) {
                return res.status(400).json({ message: `${field} is required!!` });
            }
        }

        
        const miniAdmin = await MiniAdminMasterModel.findByIdAndUpdate(id, updates, { new: true });

        if (!miniAdmin) {
            return res.status(404).json({ message: 'Mini-admin not found!!' });
        }

        res.status(200).json({ message: 'Mini admin updated successfully!!', data: miniAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteMiniAdminMaster = async (req, res) => {
    try {
        const { id } = req.params;

        
        const miniAdmin = await MiniAdminMasterModel.findByIdAndDelete(id);

        if (!miniAdmin) {
            return res.status(404).json({ message: 'Mini-admin not found!!' });
        }

        res.status(200).json({ message: 'Mini admin deleted successfully!!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
