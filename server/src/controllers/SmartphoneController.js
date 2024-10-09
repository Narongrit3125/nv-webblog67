const { Smartphone } = require('../models');

// สร้าง Smartphone ใหม่
exports.createSmartphone = async (req, res) => {
    try {
        const smartphone = await Smartphone.create(req.body);
        res.status(201).json(smartphone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ดึงข้อมูล Smartphones ทั้งหมด
exports.getAllSmartphones = async (req, res) => {
    try {
        const smartphones = await Smartphone.findAll();
        res.status(200).json(smartphones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ดึงข้อมูล Smartphone โดยใช้ id
exports.getSmartphoneById = async (req, res) => {
    try {
        const smartphone = await Smartphone.findByPk(req.params.id);
        if (smartphone) {
            res.status(200).json(smartphone);
        } else {
            res.status(404).json({ message: "Smartphone not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// อัปเดตข้อมูล Smartphone
exports.updateSmartphone = async (req, res) => {
    try {
        const smartphone = await Smartphone.findByPk(req.params.id);
        if (smartphone) {
            await smartphone.update(req.body);
            res.status(200).json(smartphone);
        } else {
            res.status(404).json({ message: "Smartphone not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ลบ Smartphone
exports.deleteSmartphone = async (req, res) => {
    try {
        const smartphone = await Smartphone.findByPk(req.params.id);
        if (smartphone) {
            await smartphone.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ message: "Smartphone not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
