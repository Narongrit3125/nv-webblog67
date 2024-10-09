<template>
    <div>
      <h2>Add Smartphone</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="brand" placeholder="Brand" required />
        <input type="text" v-model="model" placeholder="Model" required />
        <textarea v-model="description" placeholder="Description"></textarea>
        <input type="number" v-model="price" placeholder="Price" required />
        <input type="text" v-model="country" placeholder="Country" />
        <input type="text" v-model="image" placeholder="Image URL" />
        <button type="submit">Add Smartphone</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        brand: '',
        model: '',
        description: '',
        price: '',
        country: '',
        image: '',
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await axios.post('/smartphone', {
            brand: this.brand,
            model: this.model,
            description: this.description,
            price: this.price,
            country: this.country,
            image: this.image,
          });
          this.$emit('smartphone-added', response.data); // Emit an event to parent component
          this.resetForm();
        } catch (error) {
          console.error(error);
        }
      },
      resetForm() {
        this.brand = '';
        this.model = '';
        this.description = '';
        this.price = '';
        this.country = '';
        this.image = '';
      },
    },
  };
  </script>
  