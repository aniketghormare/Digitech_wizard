const ClientModel = require("../models/client.model");

exports.getClientById = async (req, res) => {
    try {
        const { id } = req.params;

        
        const client = await ClientModel.findById(id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found!!' });
        }

        res.status(200).json({ data: client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllClients = async (req, res) => {
    try {
        const { search, sortField, sortOrder, page = 1, limit = 10 } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { code: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
                { agent: { $regex: search, $options: 'i' } },
                { contact: { $regex: search, $options: 'i' } }
            ];
        }

        const sort = {};
        if (sortField && sortOrder) {
            sort[sortField] = sortOrder === 'asc' ? 1 : -1;
        }

        const skip = (page - 1) * limit;

        const total = await ClientModel.countDocuments(query);
        const clients = await ClientModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            data: clients,
            total,
            page,
            limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.createClient = async (req, res) => {
    try {
        const {
            code,
            name,
            agent,
            contact,
            doj,
            pwd,
            expo,
            clientCommType,
            clientCommMatch,
            clientCommSsn,
            chips,
            status,
            role
        } = req.body;

    
        if (!code || !name || !agent || !contact || !doj || !pwd || !expo || !clientCommType || !clientCommMatch || !clientCommSsn || !chips || status === undefined || !role) {
            return res.status(400).json({ message: 'All fields are required!!' });
        }

    
        const client = await ClientModel.create(req.body);

        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const updates = req.body;

        
        const requiredFields = [
            'code', 'name', 'agent', 'contact', 'doj', 'pwd', 'expo', 
            'clientCommType', 'clientCommMatch', 'clientCommSsn', 'chips', 'status', 'role'
        ];

        for (const field of requiredFields) {
            if (field in updates && !updates[field]) {
                return res.status(400).json({ message: `${field} is required!!` });
            }
        }

        const client = await ClientModel.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!client) {
            return res.status(404).json({ message: 'Client not found!!' });
        }

        res.status(200).json({ message: 'Client updated successfully!!', data: client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await ClientModel.findByIdAndDelete(id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found!!' });
        }

        res.status(200).json({ message: 'Client deleted successfully!!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
