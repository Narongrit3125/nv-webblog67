<template>
    <div>
      <h1>Smartphone List</h1>
      <router-link to="/smartphones/create">Create New Smartphone</router-link>
      <ul>
        <li v-for="smartphone in smartphones" :key="smartphone.id">
          <h2>{{ smartphone.brand }} {{ smartphone.model }}</h2>
          <div v-if="smartphone.pictures && smartphone.pictures.length">
            <img 
              v-for="(picture, index) in smartphone.pictures" 
              :key="index" 
              :src="BASE_URL + picture.name" 
              alt="Smartphone image" 
              class="smartphone-image"
            />
          </div>
          <p v-html="smartphone.description"></p>
          <p>Price: ${{ smartphone.price }}</p>
          <router-link :to="`/smartphones/${smartphone.id}`">View</router-link>
          <router-link :to="`/smartphones/edit/${smartphone.id}`">Edit</router-link>
          <button @click="deleteSmartphone(smartphone.id)">Delete</button>
        </li>
      </ul>
      <p><button @click="logout">Logout</button></p>
    </div>
  </template>
  
  <script>
  import SmartphoneService from '@/services/SmartphoneService';
  
  export default {
    data() {
      return {
        smartphones: [],
        BASE_URL: "http://localhost:8081/assets/uploads/"
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
  .smartphone-image {
    max-width: 100px; /* กำหนดความกว้างสูงสุดของรูปภาพ */
    margin-bottom: 10px; /* เพิ่มระยะห่างด้านล่างรูปภาพ */
  }
  </style>
  