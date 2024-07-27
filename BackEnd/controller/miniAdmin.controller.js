const miniAdminModal = require("../models/miniAdmin.model");


exports.getMiniAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        const miniAdmin = await miniAdminModal.findById(id);

        if (!miniAdmin) {
            return res.status(404).json({ message: 'Mini-admin not found!!' });
        }

        res.status(200).json({ data: miniAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllMiniAdmins = async (req, res) => {
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

        const total = await miniAdminModal.countDocuments(query);
        const miniAdmins = await miniAdminModal.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            data: miniAdmins,
            total,
            page,
            limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMiniAdmin = async (req, res) => {
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
            subAdminCommSSN,
            chips,
            status,
            role
        } = req.body;

        console.log("hello")

        if (!code || !name || !admin || !contact || !doj || !pwd || !subAdminShareMatchShr || !subAdminShareCasinoShr || !subAdminCommType || !subAdminCommMatch || !subAdminCommSSN || !chips || !status || !role) {
            return res.status(400).json({ message: 'All fields are required!!' });
        }

        const newMiniAdmin = await miniAdminModal.create(req.body);
        res.status(201).json({ message: "Mini admin created successfully!!", data: newMiniAdmin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateMiniAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;


        const requiredFields = [
            'code', 'name', 'admin', 'contact', 'doj', 'pwd',
            'subAdminShareMatchShr', 'subAdminShareCasinoShr', 'subAdminCommType',
            'subAdminCommMatch', 'subAdminCommSSN', 'chips', 'status', 'role'
        ];

        for (const field of requiredFields) {
            if (field in updates && !updates[field]) {
                return res.status(400).json({ message: `${field} is required!!` });
            }
        }

        
        const miniAdmin = await miniAdminModal.findByIdAndUpdate(id, updates, { new: true });

        if (!miniAdmin) {
            return res.status(404).json({ message: 'Mini-admin not found!!' });
        }

        res.status(200).json({ message: 'Mini admin updated successfully!!', data: miniAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.deleteMiniAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        
        const miniAdmin = await miniAdminModal.findByIdAndDelete(id);

        if (!miniAdmin) {
            return res.status(404).json({ message: 'Mini-admin not found!!' });
        }

        res.status(200).json({ message: 'Mini admin deleted successfully!!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
