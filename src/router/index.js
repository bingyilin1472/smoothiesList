import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 這個name之後可以使router不用url location方式去呼叫
      name: 'Index',
      component: Index
    }
  ]
})
