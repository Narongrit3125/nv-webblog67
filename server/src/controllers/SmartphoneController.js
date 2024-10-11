const { Smartphone } = require('../models');

module.exports = {
    // ดึงข้อมูลสมาร์ทโฟนทั้งหมด
    async index(req, res) {
        try {
            const smartphones = await Smartphone.findAll();
            res.send(smartphones);
        } catch (err) {
            res.status(500).send({
                error: 'The smartphone information was incorrect',
            });
        }
    },

    // สร้างสมาร์ทโฟนใหม่
    async create(req, res) {
        try {
            console.log('Smartphone create req.body:', req.body);
            const smartphone = await Smartphone.create(req.body);
            console.log('Smartphone create smartphone:', smartphone);
            res.send(smartphone.toJSON());
        } catch (err) {
            console.log('Smartphone create err:', err);
            res.status(500).send({
                error: 'Create smartphone incorrect',
            });
        }
    },

    // อัปเดตข้อมูลสมาร์ทโฟน
    async put(req, res) {
        try {
            const [updated] = await Smartphone.update(req.body, {
                where: {
                    id: req.params.smartphoneId,
                },
            });
            if (!updated) {
                return res.status(404).send({
                    error: 'Smartphone not found',
                });
            }
            const updatedSmartphone = await Smartphone.findByPk(req.params.smartphoneId);
            res.send(updatedSmartphone);
        } catch (err) {
            res.status(500).send({
                error: 'Update smartphone incorrect',
            });
        }
    },

    // ลบสมาร์ทโฟน
    async remove(req, res) {
        try {
            const smartphone = await Smartphone.findOne({
                where: {
                    id: req.params.smartphoneId,
                },
            });
            if (!smartphone) {
                return res.status(404).send({
                    error: 'Smartphone not found',
                });
            }
            await smartphone.destroy();
            res.send(smartphone);
        } catch (err) {
            res.status(500).send({
                error: 'The smartphone information was incorrect',
            });
        }
    },

    // ดึงข้อมูลสมาร์ทโฟนตาม ID
    async show(req, res) {
        try {
            const smartphone = await Smartphone.findByPk(req.params.smartphoneId);
            if (!smartphone) {
                return res.status(404).send({
                    error: 'Smartphone not found',
                });
            }
            res.send(smartphone);
        } catch (err) {
            res.status(500).send({
                error: 'The smartphone information was incorrect',
            });
        }
    },
};
