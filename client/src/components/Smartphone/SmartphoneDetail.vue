<template>
    <div class="smartphone-container">
      <h1>{{ smartphone.brand }} {{ smartphone.model }}</h1>
      <div class="smartphone-details">
        <!-- ตรวจสอบและแสดงผลรูปภาพ ถ้ามี -->
        <div v-if="smartphone.pictures && smartphone.pictures.length" class="smartphone-images">
          <img
            v-for="(picture, index) in smartphone.pictures"
            :key="index"
            :src="picture.name"
            alt="Smartphone image"
            class="smartphone-image"
          />
        </div>
        <div class="smartphone-info">
          <p><strong>Description:</strong></p>
          <p v-html="smartphone.description.split('\n').join('<br />')"></p>
          <p><strong>Price:</strong> ${{ smartphone.price }}</p>
          <p><strong>Country:</strong> {{ smartphone.country }}</p>
        </div>
        <div class="smartphone-actions">
          <router-link :to="`/smartphones/edit/${smartphone.id}`" class="btn btn-edit">Edit Smartphone</router-link>
          <button @click="deleteSmartphone(smartphone.id)" class="btn btn-delete">Delete Smartphone</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SmartphoneService from '@/services/SmartphoneService';
  
  export default {
    data() {
      return {
        smartphone: {}
      };
    },
    async created() {
      await this.fetchSmartphone();
    },
    methods: {
      async fetchSmartphone() {
        const smartphoneId = this.$route.params.id;
        try {
          const response = await SmartphoneService.show(smartphoneId);
          if (typeof response.pictures === 'string') {
            response.pictures = JSON.parse(response.pictures);
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
  .smartphone-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .smartphone-details {
    text-align: center;
  }
  
  .smartphone-images {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .smartphone-image {
    max-width: 150px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .smartphone-image:hover {
    transform: scale(1.05);
  }
  
  .smartphone-info {
    margin-bottom: 20px;
    text-align: left;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .smartphone-info p {
    font-size: 1rem;
    margin: 10px 0;
    line-height: 1.5; /* เพิ่มระยะห่างระหว่างบรรทัด */
  }
  
  .smartphone-info strong {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .smartphone-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .btn {
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-edit {
    background-color: #FFC107;
  }
  
  .btn-delete {
    background-color: #F44336;
  }
  
  .btn-edit:hover {
    background-color: #ffb300;
  }
  
  .btn-delete:hover {
    background-color: #d32f2f;
  }
  </style>
  