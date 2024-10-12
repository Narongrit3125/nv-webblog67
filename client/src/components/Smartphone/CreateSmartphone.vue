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

      <!-- แสดงรูปภาพที่อัปโหลดผ่าน URL -->
      <div class="pictures">
        <transition-group tag="ul" class="pictures-list">
          <li v-for="picture in pictures" :key="picture.id" class="picture-item">
            <img
              style="margin-bottom: 5px"
              :src="picture.name"
              alt="picture image"
              class="picture-image"
            />
            <br />
            <button @click.prevent="useThumbnail(picture.name)" class="btn btn-thumbnail">Thumbnail</button>
            <button @click.prevent="delFile(picture)" class="btn btn-delete">Delete</button>
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
        description: "", // ใช้ textarea แทนการใช้ CKEditor
        price: "",
        country: "",
        pictures: "", // จะถูกแปลงเป็น JSON string ก่อนส่งไป backend
      }
    };
  },
  methods: {
    async createSmartphone() {
      // แยก URL ของรูปภาพที่ใส่โดยผู้ใช้ (คั่นด้วย comma)
      if (this.pictureUrls) {
        const urls = this.pictureUrls.split(',').map(url => url.trim());
        this.pictures = urls.map((url, index) => ({
          id: index + 1,
          name: url, // ใช้ URL เป็นค่าของชื่อรูปภาพ
        }));
      }

      // แปลงรูปภาพเป็น JSON string และจัดเก็บใน smartphone.pictures
      this.smartphone.pictures = JSON.stringify(this.pictures);

      try {
        // ส่งข้อมูลสมาร์ทโฟนใหม่ไปยัง backend
        await SmartphoneService.post(this.smartphone);
        // กลับไปที่หน้าแสดงรายการสมาร์ทโฟนหลังจากสร้างสำเร็จ
        this.$router.push({ name: "SmartphoneList" });
      } catch (err) {
        console.error(err); // แสดงข้อผิดพลาดถ้ามีปัญหาในการสร้างสมาร์ทโฟน
      }
    },
    async delFile(picture) {
      let result = confirm("Want to delete?");
      if (result) {
        // ลบรูปภาพจากรายการ
        this.pictures = this.pictures.filter(p => p.id !== picture.id);
      }
    },
    useThumbnail(filename) {
      // ฟังก์ชันสำหรับตั้งค่าภาพ thumbnail ถ้าจำเป็น
      console.log("Thumbnail set to:", filename);
    }
  }
};
</script>

<style scoped>
.smartphone-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
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
  flex-wrap: wrap;
  gap: 10px;
}

.picture-item {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: #fff;
}

.picture-image {
  max-width: 100px;
  height: auto;
  border-radius: 5px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: white;
}

.btn-create {
  background-color: #4CAF50;
  margin-top: 10px;
}

.btn-create:hover {
  background-color: #45a049;
}

.btn-thumbnail {
  background-color: #2196F3;
}

.btn-thumbnail:hover {
  background-color: #0b7dda;
}

.btn-delete {
  background-color: #F44336;
}

.btn-delete:hover {
  background-color: #d32f2f;
}
</style>
