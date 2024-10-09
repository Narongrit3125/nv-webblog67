<template>
    <div>
      <h1>Smartphones</h1>
      <ul>
        <li v-for="smartphone in smartphones" :key="smartphone.id">
          <router-link :to="{ name: 'Show', params: { id: smartphone.id } }">
            {{ smartphone.brand }} {{ smartphone.model }}
          </router-link>
          <router-link :to="{ name: 'Edit', params: { id: smartphone.id } }">Edit</router-link>
          <button @click="handleDelete(smartphone.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        smartphones: [],
      };
    },
    async created() {
      await this.fetchSmartphones();
    },
    methods: {
      async fetchSmartphones() {
        try {
          const response = await axios.get('/smartphones');
          this.smartphones = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async handleDelete(id) {
        try {
          await axios.delete(`/smartphone/${id}`);
          this.smartphones = this.smartphones.filter(s => s.id !== id);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  