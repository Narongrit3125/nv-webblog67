// controllers/SmartphonesController.js

const smartphones = []; // เก็บข้อมูลสมาร์ทโฟนใน array (คุณอาจใช้ฐานข้อมูลแทน)

module.exports = {
  // สร้างสมาร์ทโฟนใหม่
  createSmartphone(req, res) {
    const { brand, model, description, price, country, image } = req.body;
    const newSmartphone = {
      id: smartphones.length + 1,
      brand,
      model,
      description,
      price,
      country,
      image,
    };
    smartphones.push(newSmartphone);
    res.status(201).send(newSmartphone);
  },

  // ดึงข้อมูลสมาร์ทโฟนทั้งหมด
  getAllSmartphones(req, res) {
    res.status(200).send(smartphones);
  },

  // ดึงข้อมูลสมาร์ทโฟนตาม ID
  getSmartphoneById(req, res) {
    const smartphone = smartphones.find(s => s.id === parseInt(req.params.id));
    if (!smartphone) {
      return res.status(404).send({ error: 'Smartphone not found' });
    }
    res.status(200).send(smartphone);
  },

  // อัปเดตข้อมูลสมาร์ทโฟนตาม ID
  updateSmartphone(req, res) {
    const smartphone = smartphones.find(s => s.id === parseInt(req.params.id));
    if (!smartphone) {
      return res.status(404).send({ error: 'Smartphone not found' });
    }
    const { brand, model, description, price, country, image } = req.body;
    smartphone.brand = brand;
    smartphone.model = model;
    smartphone.description = description;
    smartphone.price = price;
    smartphone.country = country;
    smartphone.image = image;
    res.status(200).send(smartphone);
  },

  // ลบสมาร์ทโฟนตาม ID
  deleteSmartphone(req, res) {
    const index = smartphones.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send({ error: 'Smartphone not found' });
    }
    smartphones.splice(index, 1);
    res.status(204).send();
  }
};
