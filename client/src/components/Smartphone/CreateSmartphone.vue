<template>
  <div>
    <h1>Create New Smartphone</h1>
    <form @submit.prevent="createSmartphone" class="smartphone-form">
      <div class="form-group">
        <label for="brand">Brand:</label>
        <input type="text" v-model="smartphone.brand" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="model">Model:</label>
        <input type="text" v-model="smartphone.model" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="smartphone.description" rows="5" required class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" v-model="smartphone.price" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="country">Country:</label>
        <input type="text" v-model="smartphone.country" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="pictureUrls">Image URLs (separate by comma):</label>
        <input type="text" v-model="pictureUrls" placeholder="Enter image URLs, separated by commas" class="form-control" />
      </div>

      <div class="pictures">
        <transition-group tag="ul" class="pictures-list">
          <li v-for="picture in pictures" :key="picture.id" class="picture-item">
            <img
              :src="picture.name"
              alt="picture image"
              class="picture-image"
            />
            <div class="picture-actions">
              <button @click.prevent="useThumbnail(picture.name)" class="btn btn-thumbnail">Thumbnail</button>
              <button @click.prevent="delFile(picture)" class="btn btn-delete">Delete</button>
            </div>
          </li>
        </transition-group>
      </div>

      <p>
        <button type="submit" class="btn btn-create">Create Smartphone</button>
      </p>
    </form>
  </div>
</template>

<script>
import SmartphoneService from '@/services/SmartphoneService';

export default {
  data() {
    return {
      pictureUrls: "", // สำหรับเก็บ URLs รูปภาพจากผู้ใช้งาน
      pictures: [],    // เก็บรายการรูปภาพที่ได้จาก URL
      smartphone: {
        brand: "",
        model: "",
        description: "",
        price: "",
        country: "",
        pictures: "", // จะถูกแปลงเป็น JSON string ก่อนส่งไป backend
      }
    };
  },
  methods: {
    async createSmartphone() {
      if (this.pictureUrls) {
        const urls = this.pictureUrls.split(',').map(url => url.trim());
        this.pictures = urls.map((url, index) => ({
          id: index + 1,
          name: url,
        }));
      }
      this.smartphone.pictures = JSON.stringify(this.pictures);

      try {
        await SmartphoneService.post(this.smartphone);
        this.$router.push({ name: "SmartphoneList" });
      } catch (err) {
        console.error(err);
      }
    },
    async delFile(picture) {
      if (confirm("Want to delete?")) {
        this.pictures = this.pictures.filter(p => p.id !== picture.id);
      }
    },
    useThumbnail(filename) {
      console.log("Thumbnail set to:", filename);
    }
  }
};
</script>

<style scoped>
.smartphone-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', sans-serif;
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1rem;
  color: #444;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #333;
}

.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.pictures-list {
  display: flex;
  gap: 20px;
}

.picture-item {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: transform 0.3s ease;
}

.picture-item:hover {
  transform: scale(1.05);
}

.picture-image {
  max-width: 100px;
  height: auto;
  border-radius: 5px;
}

.picture-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-create {
  background-color: #333;
  color: white;
}

.btn-create:hover {
  background-color: #555;
}

.btn-thumbnail {
  background-color: #FFD700;
  color: white;
}

.btn-thumbnail:hover {
  background-color: #FFC107;
}

.btn-delete {
  background-color: #F44336;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
}
</style>
