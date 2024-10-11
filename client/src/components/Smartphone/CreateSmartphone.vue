<template>
    <div>
      <h1>Create New Smartphone</h1>
      <form @submit.prevent="createSmartphone">
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
        <div class="dropbox">
          <label for="pictures">Upload Images:</label>
          <input
            type="file"
            multiple
            :disabled="isSaving"
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
            <img
              style="margin-bottom: 5px"
              :src="BASE_URL + picture.name"
              alt="picture image"
            />
            <br />
            <button @click.prevent="useThumbnail(picture.name)">Thumbnail</button>
            <button @click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
        <p>
          <button type="submit">Create Smartphone</button>
        </p>
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
        error: null,
        uploadError: null,
        currentStatus: null,
        uploadFieldName: "userPhoto",
        uploadedFileNames: [],
        pictures: [],
        pictureIndex: 0,
        smartphone: {
          brand: "",
          model: "",
          description: "",
          price: "",
          country: "",
          pictures: "null",
        },
        config: {
          toolbar: [
            ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
          ],
          height: 300,
        },
      };
    },
    methods: {
      async createSmartphone() {
        this.smartphone.pictures = JSON.stringify(this.pictures);
        console.log("JSON.stringify: ", this.smartphone);
        try {
          await SmartphoneService.post(this.smartphone);
          this.$router.push({ name: "SmartphoneList" });
        } catch (err) {
          console.error(err);
        }
      },
      async delFile(picture) {
        let result = confirm("Want to delete?");
        if (result) {
          let dataJSON = {
            filename: picture.name,
          };
  
          await UploadService.delete(dataJSON);
          this.pictures = this.pictures.filter(p => p.id !== picture.id);
          this.pictureIndex--;
        }
      },
      filesChange(event) {
        const fileList = event.target.files;
        const formData = new FormData();
        if (!fileList.length) return;
  
        Array.from(fileList).forEach(file => {
          formData.append(this.uploadFieldName, file, file.name);
          this.uploadedFileNames.push(file.name);
        });
  
        this.save(formData);
        this.fileCount = fileList.length;
      },
      async save(formData) {
        try {
          this.currentStatus = STATUS_SAVING;
          await UploadService.upload(formData);
          this.currentStatus = STATUS_SUCCESS;
  
          // Update image uploaded display
          this.uploadedFileNames.forEach(uploadFilename => {
            if (!this.pictures.find(p => p.name === uploadFilename)) {
              this.pictureIndex++;
              this.pictures.push({
                id: this.pictureIndex,
                name: uploadFilename,
              });
            }
          });
        } catch (error) {
          console.error(error);
          this.currentStatus = STATUS_FAILED;
        }
      },
      useThumbnail(filename) {
        // ฟังก์ชันสำหรับตั้งค่าภาพ thumbnail ถ้าจำเป็น
        console.log("Thumbnail set to:", filename);
      },
      onBlur(editor) {
        console.log(editor);
      },
      onFocus(editor) {
        console.log(editor);
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
  .thumbnail-pic img {
    width: 200px;
  }
  </style>
  