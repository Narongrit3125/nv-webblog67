<template>
  <div class="smartphone-detail-container">
    <h2 class="smartphone-title">{{ smartphone.brand }} {{ smartphone.model }}</h2>
    <img :src="smartphone.image" alt="Smartphone Image" class="smartphone-image" />
    <p class="description"><strong>Description:</strong> <span class="description-text">{{ smartphone.description }}</span></p>
    <p class="price"><strong>Price:</strong> {{ smartphone.price }} ฿</p>
    <p class="country"><strong>Country:</strong> {{ smartphone.country }}</p>
    <router-link :to="{ name: 'Edit', params: { id: smartphone.id } }" class="edit-button">Edit</router-link>
  </div>
</template>

<script>
import SmartphoneService from '@/services/SmartphoneService';

export default {
  data() {
    return {
      smartphone: {},
    };
  },
  async created() {
    await this.fetchSmartphone();
  },
  methods: {
    async fetchSmartphone() {
      const id = this.$route.params.id;
      try {
        const response = await SmartphoneService.show(id);
        this.smartphone = response.data;
      } catch (error) {
        console.error('Error fetching smartphone:', error);
      }
    },
  },
};
</script>

<style scoped>
.smartphone-detail-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff; /* เปลี่ยนพื้นหลังเป็นสีขาว */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* เพิ่มความลึกให้กับเงา */
  text-align: left; /* Align text to the left for better readability */
  transition: transform 0.3s; /* เพิ่มการเปลี่ยนแปลงในการโฟกัส */
}

.smartphone-detail-container:hover {
  transform: scale(1.02); /* ขยายเล็กน้อยเมื่อโฟกัส */
}

.smartphone-title {
  color: #007BFF; /* เปลี่ยนสีข้อความเป็นสีฟ้า */
  margin-bottom: 20px;
  font-size: 28px; /* เพิ่มขนาดฟอนต์สำหรับหัวเรื่อง */
  font-weight: bold; /* ทำให้ข้อความหนาขึ้น */
  text-align: center; /* จัดกลาง */
}

.smartphone-image {
  width: 100%;
  height: auto;
  max-width: 400px; /* เพิ่มขนาดสูงสุดให้กับภาพ */
  border-radius: 10px; /* เพิ่มความโค้งมนให้กับภาพ */
  margin: 0 auto 15px auto; /* จัดกลาง */
  border: 1px solid #ddd; /* เพิ่มเส้นขอบให้กับภาพ */
}

.description {
  margin: 15px 0; /* เพิ่มระยะห่าง */
  font-size: 18px; /* ขนาดฟอนต์ที่เพิ่มขึ้น */
  color: #555; /* สีเทา */
  line-height: 1.6; /* เพิ่มระยะห่างระหว่างบรรทัด */
}

.description-text {
  white-space: pre-line; /* จัดการให้แสดงตามบรรทัดที่มีการพิมพ์ */
}

.price, .country {
  margin: 10px 0; /* เพิ่มระยะห่าง */
  font-size: 18px; /* ขนาดฟอนต์ที่เพิ่มขึ้น */
  color: #555; /* สีเทา */
  line-height: 1.6; /* เพิ่มระยะห่างระหว่างบรรทัด */
}

strong {
  color: #333; /* ทำให้ข้อความที่เป็น label มีสีเข้ม */
}

.edit-button {
  display: inline-block;
  margin-top: 20px; /* เพิ่มระยะห่างด้านบน */
  background-color: #007BFF; /* สีฟ้า */
  color: white;
  padding: 12px 18px; /* เพิ่มขนาดปุ่ม */
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s; /* เพิ่มการเปลี่ยนแปลงเมื่อโฟกัส */
}

.edit-button:hover {
  background-color: #0056b3; /* สีฟ้าที่เข้มขึ้น */
  transform: scale(1.05); /* ขยายเล็กน้อยเมื่อโฟกัส */
}
</style>
