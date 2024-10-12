<template>
  <div class="edit-smartphone-container">
    <h1>Edit Smartphone</h1>
    <form @submit.prevent="updateSmartphone">
      <div class="form-group">
        <label for="brand">Brand:</label>
        <input type="text" v-model="smartphone.brand" required />
      </div>
      <div class="form-group">
        <label for="model">Model:</label>
        <input type="text" v-model="smartphone.model" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="smartphone.description" rows="5" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" v-model="smartphone.price" required />
      </div>
      <div class="form-group">
        <label for="country">Country:</label>
        <input type="text" v-model="smartphone.country" required />
      </div>

      <div v-if="smartphone.pictures && smartphone.pictures.length" class="pictures-section">
        <h3>Current Pictures</h3>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in smartphone.pictures" :key="picture.id">
            <img :src="picture.name" alt="Smartphone Image" />
            <br />
            <button @click.prevent="useThumbnail(picture.name)">Thumbnail</button>
            <button @click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
      </div>

      <div class="form-group">
        <label for="pictureUrls">Image URLs (separate by comma):</label>
        <input
          type="text"
          v-model="pictureUrls"
          placeholder="Enter image URLs, separated by commas"
        />
      </div>

      <div class="new-pictures-section">
        <h3>New Pictures</h3>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" :key="picture.id">
            <img :src="picture.name" alt="Uploaded Image" />
            <button @click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
      </div>

      <button type="submit" class="btn btn-update">Update Smartphone</button>
    </form>
  </div>
</template>

<script>
import SmartphoneService from '@/services/SmartphoneService';

export default {
  data() {
    return {
      pictureUrls: "", // สำหรับเก็บ URLs ของรูปภาพใหม่
      pictures: [],    // เก็บรายการรูปภาพที่ผู้ใช้เพิ่มใหม่
      smartphone: {
        brand: "",
        model: "",
        description: "",
        price: "",
        country: "",
        pictures: [] // รายการภาพปัจจุบันที่ได้จาก backend
      }
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
    async updateSmartphone() {
      if (this.pictureUrls) {
        const urls = this.pictureUrls.split(',').map(url => url.trim());
        this.pictures = urls.map((url, index) => ({
          id: index + 1,
          name: url
        }));
      }

      this.smartphone.pictures = JSON.stringify([
        ...this.smartphone.pictures,
        ...this.pictures
      ]);

      try {
        await SmartphoneService.put(this.smartphone);
        this.$router.push({ name: "SmartphoneList" });
      } catch (err) {
        console.error('Error updating smartphone:', err);
      }
    },
    async delFile(picture) {
      let result = confirm("Want to delete?");
      if (result) {
        this.smartphone.pictures = this.smartphone.pictures.filter(
          p => p.id !== picture.id
        );
      }
    },
    useThumbnail(filename) {
      console.log("Thumbnail set to:", filename);
    }
  }
};
</script>

<style scoped>
.edit-smartphone-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-group textarea {
  resize: none;
}

.pictures-section, .new-pictures-section {
  margin-top: 20px;
}

.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.pictures li {
  margin-right: 20px;
  margin-bottom: 20px;
}

.pictures li img {
  max-width: 180px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-update {
  background-color: #4CAF50;
  margin-top: 20px;
}

.btn-update:hover {
  background-color: #45a049;
}
</style>
