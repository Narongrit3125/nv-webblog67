<template>
  <div>
    <h1>Smartphone List</h1>
    <router-link to="/smartphones/create" class="create-link">Create New Smartphone</router-link>
    <div class="smartphone-list">
      <div v-for="smartphone in smartphones" :key="smartphone.id" class="smartphone-card">
        <div class="smartphone-header">
          <h2>{{ smartphone.brand }} {{ smartphone.model }}</h2>
        </div>
        <div v-if="smartphone.pictures && smartphone.pictures.length" class="smartphone-images">
          <img
            v-for="(picture, index) in JSON.parse(smartphone.pictures)"
            :key="index"
            :src="picture.name"
            alt="Smartphone image"
            class="smartphone-image"
          />
        </div>
        <p>Price: ${{ smartphone.price }}</p>
        <div class="smartphone-actions">
          <router-link :to="`/smartphones/${smartphone.id}`" class="btn btn-view">View</router-link>
          <router-link :to="`/smartphones/edit/${smartphone.id}`" class="btn btn-edit">Edit</router-link>
          <button @click="deleteSmartphone(smartphone.id)" class="btn btn-delete">Delete</button>
        </div>
      </div>
    </div>
    <p><button @click="logout" class="btn-logout">Logout</button></p>
  </div>
</template>

<script>
import SmartphoneService from '@/services/SmartphoneService';

export default {
  data() {
    return {
      smartphones: []
    };
  },
  async created() {
    await this.fetchSmartphones();
  },
  methods: {
    async fetchSmartphones() {
      try {
        this.smartphones = await SmartphoneService.index();
      } catch (error) {
        console.error('Error fetching smartphones:', error);
      }
    },
    async deleteSmartphone(smartphoneId) {
      if (confirm('Are you sure you want to delete this smartphone?')) {
        try {
          await SmartphoneService.delete(smartphoneId);
          this.smartphones = this.smartphones.filter(s => s.id !== smartphoneId);
        } catch (error) {
          console.error('Error deleting smartphone:', error);
        }
      }
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setBlog', null);
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.create-link {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.create-link:hover {
  background-color: #45a049;
}

/* จัดการรายการสมาร์ทโฟนในรูปแบบการ์ด */
.smartphone-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0;
}

.smartphone-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.smartphone-card:hover {
  transform: scale(1.02);
}

.smartphone-header h2 {
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
}

/* จัดการรูปภาพ */
.smartphone-images {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.smartphone-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

/* จัดการปุ่ม */
.smartphone-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: white;
}

.btn-view {
  background-color: #2196F3;
}

.btn-edit {
  background-color: #FFC107;
}

.btn-delete {
  background-color: #F44336;
}

.btn-view:hover {
  background-color: #0b7dda;
}

.btn-edit:hover {
  background-color: #ffb300;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

.btn-logout {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #d32f2f;
}
</style>
