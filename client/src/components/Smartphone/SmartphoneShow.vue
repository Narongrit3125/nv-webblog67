<template>
    <div>
      <h1>{{ smartphone.brand }} {{ smartphone.model }}</h1>
      <div class="smartphone-details">
        <!-- ตรวจสอบและแสดงผลรูปภาพ ถ้ามี -->
        <div v-if="smartphone.pictures && smartphone.pictures.length">
          <div v-for="(picture, index) in smartphone.pictures" :key="index">
            <img :src="BASE_URL + picture" alt="Smartphone Image" />
          </div>
        </div>
        <p><strong>Description:</strong> {{ smartphone.description }}</p>
        <p><strong>Price:</strong> ${{ smartphone.price }}</p>
        <p><strong>Country:</strong> {{ smartphone.country }}</p>
        <router-link :to="`/smartphones/edit/${smartphone.id}`">Edit Smartphone</router-link>
        <button @click="deleteSmartphone(smartphone.id)">Delete Smartphone</button>
      </div>
    </div>
  </template>
  
  <script>
  import SmartphoneService from '@/services/SmartphoneService';
  
  export default {
    data() {
      return {
        BASE_URL: "http://localhost:8081/assets/uploads/",
        smartphone: {}
      };
    },
    async created() {
      await this.fetchSmartphone();
    },
    methods: {
      async fetchSmartphone() {
        const smartphoneId = this.$route.params.id; // Assumes you are passing the ID in the route
        try {
          const response = await SmartphoneService.show(smartphoneId);
          if (typeof response.pictures === 'string') {
            response.pictures = JSON.parse(response.pictures); // แปลง JSON string กลับเป็น array ถ้าจำเป็น
          }
          this.smartphone = response;
        } catch (error) {
          console.error('Error fetching smartphone:', error);
        }
      },
      async deleteSmartphone(smartphoneId) {
        if (confirm('Are you sure you want to delete this smartphone?')) {
          try {
            await SmartphoneService.delete(smartphoneId);
            this.$router.push({ name: 'SmartphoneList' });
          } catch (error) {
            console.error('Error deleting smartphone:', error);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .smartphone-details {
    max-width: 600px;
    margin: auto;
    text-align: center;
  }
  .smartphone-details img {
    max-width: 100%;
    height: auto;
  }
  button {
    margin-top: 20px;
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  