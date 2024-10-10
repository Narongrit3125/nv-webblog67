<template>
  <div class="smartphone-container">
      <h2>Get all Smartphones</h2>
      <p><button class="logout-button" v-on:click="logout">Logout</button></p>
      <h4>จำนวนสมาร์ทโฟน: {{ smartphones.length }}</h4>
      <p><button class="create-button" v-on:click="navigateTo('/smartphone/create')">สร้างสมาร์ทโฟน</button></p>
      <div v-for="smartphone in smartphones" v-bind:key="smartphone.id" class="smartphone-card">
          <img :src="smartphone.image" alt="Smartphone Image" class="smartphone-image" />
          <div class="smartphone-details">
              <p><strong>Brand:</strong> {{ smartphone.brand }}</p>
              <p><strong>Model:</strong> {{ smartphone.model }}</p>
              <p><strong>Price:</strong> {{ smartphone.price }} ฿</p>
              <p><strong>Country:</strong> {{ smartphone.country }}</p>
              <p>
                  <button class="view-button" v-on:click="navigateTo('/smartphone/' + smartphone.id)">ดูสมาร์ทโฟน</button>
                  <button class="edit-button" v-on:click="navigateTo('/smartphone/edit/' + smartphone.id)">แก้ไขสมาร์ทโฟน</button>
                  <button class="delete-button" v-on:click="handleDelete(smartphone.id)">ลบข้อมูล</button>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
import SmartphoneService from '@/services/SmartphoneService';

export default {
  data() {
    return {
      smartphones: [], // รายการสมาร์ทโฟนทั้งหมด
    };
  },
  async created() {
    await this.fetchSmartphones(); // ดึงข้อมูลสมาร์ทโฟนเมื่อคอมโพเนนต์ถูกสร้าง
  },
  methods: {
    async fetchSmartphones() {
      try {
        const response = await SmartphoneService.index();
        this.smartphones = response.data; // เก็บข้อมูลใน state
      } catch (error) {
        console.error('Error fetching smartphones:', error);
      }
    },
    
    async handleDelete(id) {
      const confirmDelete = confirm("คุณต้องการลบสมาร์ทโฟนนี้หรือไม่?");
      if (confirmDelete) {
        try {
          await SmartphoneService.delete(id);
          this.smartphones = this.smartphones.filter(s => s.id !== id); // อัปเดตรายการสมาร์ทโฟน
        } catch (error) {
          console.error('Error deleting smartphone:', error);
        }
      }
    },

    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setBlog', null);
      this.$router.push({ name: 'login' }); // เปลี่ยนเส้นทางไปยังหน้า Login
    },

    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.smartphone-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  font-family: 'Arial', sans-serif;
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #e60000; /* Darker red */
}

.create-button {
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #45a049; /* Darker green */
}

.smartphone-card {
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.smartphone-image {
  width: 100px;
  height: auto;
  margin-right: 15px;
  border-radius: 5px;
}

.smartphone-details {
  flex: 1;
}

.smartphone-card p {
  margin: 5px 0;
}

.view-button, .edit-button, .delete-button {
  background-color: #007BFF; /* Blue */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  transition: background-color 0.3s;
}

.view-button:hover {
  background-color: #0056b3; /* Darker blue */
}

.edit-button {
  background-color: #FFC107; /* Yellow */
}

.edit-button:hover {
  background-color: #e0a800; /* Darker yellow */
}

.delete-button {
  background-color: #dc3545; /* Red */
}

.delete-button:hover {
  background-color: #c82333; /* Darker red */
}
</style>
