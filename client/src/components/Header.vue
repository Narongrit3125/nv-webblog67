<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }">Blogs</router-link></li>
        <li><router-link :to="{ name: 'SmartphoneList' }">Smartphones</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'comments' }">Comments</router-link></li>
        <!-- Show login/logout menu based on isLogin state -->
        <li v-if="isLogin()"><a href="#" @click="logout">Logout</a></li>
        <li v-else><router-link :to="{ name: 'login' }">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
.nv-navbar {
  background-color: #f5deb3; /* สีพื้นหลัง */
  width: 100%;
  padding: 10px 20px; /* เพิ่ม padding */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* เพิ่มเงา */
}

.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex; /* ใช้ flexbox สำหรับจัดการตำแหน่ง */
}

.nv-navbar .nav li {
  margin-right: 20px; /* เพิ่มระยะห่างระหว่างรายการ */
}

.nv-navbar .nav li a {
  padding: 10px 15px; /* เพิ่ม padding */
  text-decoration: none;
  color: #555; /* เปลี่ยนสีข้อความ */
  font-weight: bold;
  border-radius: 5px; /* เพิ่มมุมโค้งให้กับลิงก์ */
  transition: background-color 0.3s, color 0.3s; /* เพิ่มการเปลี่ยนแปลง */
}

.nv-navbar .nav li a:hover {
  background-color: #dcdcdc; /* สีพื้นหลังเมื่อโฟกัส */
  color: #333; /* เปลี่ยนสีข้อความเมื่อโฟกัส */
}

.nv-navbar .nav li a.router-link-active {
  background-color:gold; /* สีพื้นหลังสำหรับลิงก์ที่เลือก */
  color:#2f4f4f; /* เปลี่ยนสีข้อความ */
}

.clearfix {
  clear: left;
}
</style>
