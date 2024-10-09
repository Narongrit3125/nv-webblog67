<template>
    <div>
      <h2>{{ smartphone.brand }} {{ smartphone.model }}</h2>
      <img :src="smartphone.image" alt="Smartphone Image" />
      <p>Description: {{ smartphone.description }}</p>
      <p>Price: {{ smartphone.price }}</p>
      <p>Country: {{ smartphone.country }}</p>
      <router-link :to="{ name: 'Edit', params: { id: smartphone.id } }">Edit</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
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
          const response = await axios.get(`/smartphone/${id}`);
          this.smartphone = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  