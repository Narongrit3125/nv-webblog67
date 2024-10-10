<template>
  <div class="add-smartphone-container">
    <h2 class="form-title">Add Smartphone</h2>
    <form @submit.prevent="handleSubmit" class="smartphone-form">
      <input type="text" v-model="brand" placeholder="Brand" required class="form-input" />
      <input type="text" v-model="model" placeholder="Model" required class="form-input" />
      <textarea v-model="description" placeholder="Description" class="form-textarea"></textarea>
      <input type="number" v-model="price" placeholder="Price" required class="form-input" />
      <input type="text" v-model="country" placeholder="Country" class="form-input" />
      <input type="text" v-model="image" placeholder="Image URL" class="form-input" />
      <button type="submit" class="submit-button">Add Smartphone</button>
    </form>
  </div>
</template>

<script>
import SmartphoneService from '@/services/SmartphoneService';

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
        const response = await SmartphoneService.post({
          brand: this.brand,
          model: this.model,
          description: this.description,
          price: this.price,
          country: this.country,
          image: this.image,
        });

        this.$emit('smartphone-added', response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error adding smartphone:', error);
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

<style scoped>
.add-smartphone-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px; /* Increased font size for the title */
}

.smartphone-form {
  display: flex;
  flex-direction: column;
}

.form-input,
.form-textarea {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-textarea {
  resize: vertical; /* Allow vertical resizing only */
  min-height: 80px; /* Minimum height for the textarea */
}

.submit-button {
  padding: 10px;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049; /* Darker green on hover */
}
</style>
