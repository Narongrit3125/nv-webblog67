<template>
    <div>
      <h2>Edit Smartphone</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="brand" placeholder="Brand" required />
        <input type="text" v-model="model" placeholder="Model" required />
        <textarea v-model="description" placeholder="Description"></textarea>
        <input type="number" v-model="price" placeholder="Price" required />
        <input type="text" v-model="country" placeholder="Country" />
        <input type="text" v-model="image" placeholder="Image URL" />
        <button type="submit">Update Smartphone</button>
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
    async created() {
      await this.fetchSmartphone();
    },
    methods: {
      async fetchSmartphone() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`/smartphone/${id}`);
          const smartphone = response.data;
          this.brand = smartphone.brand;
          this.model = smartphone.model;
          this.description = smartphone.description;
          this.price = smartphone.price;
          this.country = smartphone.country;
          this.image = smartphone.image;
        } catch (error) {
          console.error(error);
        }
      },
      async handleSubmit() {
        const id = this.$route.params.id;
        try {
          await axios.put(`/smartphone/${id}`, {
            brand: this.brand,
            model: this.model,
            description: this.description,
            price: this.price,
            country: this.country,
            image: this.image,
          });
          this.$router.push({ name: 'Show', params: { id } }); // Redirect to Show page
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  