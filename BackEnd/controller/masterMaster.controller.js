
const MasterMasterModel = require('../models/masterMaster.model');



exports.getMasterMasterById = async (req, res) => {
  try {
    const { id } = req.params;

    const masterMaster = await MasterMasterModel.findById(id);

    if (!masterMaster) {
      return res.status(404).json({ message: 'Master Master not found!!' });
    }

    res.status(200).json({ data: masterMaster });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllMasterMasters = async (req, res) => {
  try {
    const { search, sortField, sortOrder, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { code: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { admin: { $regex: search, $options: 'i' } },
        { subadminCommType: { $regex: search, $options: 'i' } }

      ];
    }

    const sort = {};
    if (sortField && sortOrder) {
      sort[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    const skip = (page - 1) * limit;

    const total = await MasterMasterModel.countDocuments(query);
    const masterMasters = await MasterMasterModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      data: masterMasters,
      total,
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMasterMaster = async (req, res) => {
  try {
    const {
      code,
      name,
      admin,
      subadminShareCasinoShr,
      subadminCommType,
      subadminCommMatch,
      subadminCommSSN,
      chips,
      status,
      role
    } = req.body;

    if (!code || !name || !admin || !subadminShareCasinoShr || !subadminCommType || !subadminCommMatch || !subadminCommSSN || !chips || !status || !role) {
      return res.status(400).json({ message: 'All fields are required!!' });
    }

    const masterMaster = await MasterMasterModel.create(req.body);
    res.status(201).json({ data: masterMaster });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMasterMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;


    const requiredFields = [
      'code', 'name', 'admin', 'subadminShareCasinoShr', 'subadminCommType',
      'subadminCommMatch', 'subadminCommSSN', 'chips', 'status', 'role'
    ];

    for (const field of requiredFields) {
      if (field in updates && !updates[field]) {
        return res.status(400).json({ message: `${field} is required!!` });
      }
    }


    const masterMaster = await MasterMasterModel.findByIdAndUpdate(id, updates, { new: true });

    if (!masterMaster) {
      return res.status(404).json({ message: 'Master Master not found!!' });
    }

    res.status(200).json({ message: 'Master Master updated successfully!!', data: masterMaster });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.deleteMasterMaster = async (req, res) => {
  try {
    const { id } = req.params;


    const masterMaster = await MasterMasterModel.findByIdAndDelete(id);

    if (!masterMaster) {
      return res.status(404).json({ message: 'Master Master not found!!' });
    }

    res.status(200).json({ message: 'Master Master deleted successfully!!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
