import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import BlogIndex from '@/components/Blogs/index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogShow from '@/components/Blogs/ShowBlog'
import BlogEdit from '@/components/Blogs/EditBlog'

import Upload from '@/components/Util/Upload'

// แทนที่ component สมาร์ทโฟนเดิมด้วย component ใหม่
import SmartphoneList from '@/components/Smartphone/SmartphoneList';
import SmartphoneCreate from '@/components/Smartphone/CreateSmartphone';
import SmartphoneEdit from '@/components/Smartphone/EditSmartphone';
import SmartphoneDetail from '@/components/Smartphone/SmartphoneDetail'; // อัปเดตชื่อเป็น SmartphoneShow

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // เส้นทางผู้ใช้
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },

    // เส้นทางล็อกอิน
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    // เส้นทางบล็อก
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },

    // เส้นทางคอมเมนต์
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },

    // เส้นทางอัปโหลดไฟล์
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },

    // เส้นทางสมาร์ทโฟน (ปรับให้เหมาะสมตาม RESTful)
    {
      path: '/smartphones',
      name: 'SmartphoneList',
      component: SmartphoneList,
    },
    {
      path: '/smartphones/create',
      name: 'SmartphoneCreate',
      component: SmartphoneCreate,
    },
    {
      path: '/smartphones/edit/:id',
      name: 'SmartphoneEdit',
      component: SmartphoneEdit,
    },
    {
      path: '/smartphones/:id',
      name: 'SmartphoneDetail',
      component: SmartphoneDetail, // Your component that displays the smartphone details
  }
  ]
})
