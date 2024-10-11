<template>
    <div>
      <h1>Edit Smartphone</h1>
      <form @submit.prevent="updateSmartphone">
        <div>
          <label for="brand">Brand:</label>
          <input type="text" v-model="smartphone.brand" required />
        </div>
        <div>
          <label for="model">Model:</label>
          <input type="text" v-model="smartphone.model" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <vue-ckeditor
            v-model.lazy="smartphone.description"
            :config="config"
            @blur="onBlur($event)"
            @focus="onFocus($event)"
          />
        </div>
        <div>
          <label for="price">Price:</label>
          <input type="number" v-model="smartphone.price" required />
        </div>
        <div>
          <label for="country">Country:</label>
          <input type="text" v-model="smartphone.country" required />
        </div>
  
        <!-- แสดงภาพปัจจุบัน -->
        <div v-if="smartphone.pictures && smartphone.pictures.length">
          <h3>Current Pictures</h3>
          <transition-group tag="ul" class="pictures">
            <li v-for="picture in smartphone.pictures" :key="picture.id">
              <img :src="BASE_URL + picture.name" alt="Smartphone Image" />
              <br />
              <button @click.prevent="useThumbnail(picture.name)">Thumbnail</button>
              <button @click.prevent="delFile(picture)">Delete</button>
            </li>
          </transition-group>
        </div>
  
        <!-- ฟิลด์อัปโหลดภาพใหม่ -->
        <div class="dropbox">
          <label for="pictures">Upload New Pictures:</label>
          <input
            type="file"
            multiple
            @change="filesChange"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">Drag your file(s) here to begin<br />or click to browse</p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
  
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" :key="picture.id">
            <img :src="BASE_URL + picture.name" alt="Uploaded Image" />
            <button @click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
  
        <button type="submit">Update Smartphone</button>
      </form>
    </div>
  </template>  
  <script>
  import SmartphoneService from '@/services/SmartphoneService';
  import UploadService from "@/services/UploadService";
  import VueCkeditor from "vue-ckeditor2";
  
  const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;
  
  export default {
    data() {
      return {
        BASE_URL: "http://localhost:8081/assets/uploads/",
        smartphone: {
          brand: '',
          model: '',
          description: '',
          price: '',
          country: '',
          pictures: [] // เก็บรายการภาพ
        },
        pictures: [],
        pictureIndex: 0,
        currentStatus: null,
        fileCount: 0,
        config: {
          toolbar: [
            ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
          ],
          height: 300,
        },
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
      filesChange(event) {
        const fileList = event.target.files;
        const formData = new FormData();
        if (!fileList.length) return;
  
        Array.from(fileList).forEach(file => {
          formData.append('pictures', file);
          this.pictures.push({
            id: this.pictureIndex++,
            name: file.name,
          });
        });
        this.fileCount = fileList.length;
        this.save(formData);
      },
      async save(formData) {
        try {
          this.currentStatus = STATUS_SAVING;
          await UploadService.upload(formData);
          this.currentStatus = STATUS_SUCCESS;
        } catch (error) {
          console.error(error);
          this.currentStatus = STATUS_FAILED;
        }
      },
      async delFile(picture) {
        let result = confirm("Want to delete?");
        if (result) {
          let dataJSON = { filename: picture.name };
          await UploadService.delete(dataJSON);
          this.pictures = this.pictures.filter(p => p.id !== picture.id);
        }
      },
      async updateSmartphone() {
  try {
    const formData = new FormData();

    // ตรวจสอบว่ามีภาพใหม่หรือไม่
    if (this.images.length) {
      this.images.forEach(image => {
        formData.append('pictures', image);
      });

      // อัปโหลดภาพใหม่
      await UploadService.upload(formData);
    }

    // ตรวจสอบการอัปโหลดภาพ
    if (this.images.length) {
      this.smartphone.pictures = JSON.stringify(this.pictures);
    }

    // อัปเดตข้อมูลสมาร์ทโฟน
    const response = await SmartphoneService.put(this.smartphone);
    console.log('Update response:', response); // พิมพ์การตอบสนอง
    this.$router.push({ name: "SmartphoneList" });
  } catch (error) {
    console.error('Error updating smartphone:', error.response.data); // แสดงข้อผิดพลาดจากเซิร์ฟเวอร์
  }
},
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      },
    },
    components: {
      VueCkeditor,
    },
  };
  </script>
  
  <style scoped>
  .dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lemonchiffon;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px;
    position: relative;
    cursor: pointer;
  }
  .input-file {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  .dropbox:hover {
    background: khaki;
  }
  ul.pictures {
    list-style: none;
    padding: 0;
    margin: 0;
    float: left;
  }
  ul.pictures li {
    float: left;
  }
  ul.pictures li img {
    max-width: 180px;
    margin-right: 20px;
  }
  </style>
  