import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmoothie from "@/components/AddSmoothie";

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 只有一個'/' slash一般是home page
      path: '/',
      // 這個name之後可以使router不用url location方式去呼叫
      name: 'Index',
      // 除了要route導航到的component要在上面import
      // 還要註冊到某route下的component之中
      component: Index
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie
    }
  ]
})
