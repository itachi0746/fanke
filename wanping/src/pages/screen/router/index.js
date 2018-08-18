import Vue from 'vue'
import Router from 'vue-router'
import Screen from '../modules/screen.vue'
import OrderConfirm from '../modules/orderConfirm.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Screen'
    },
    {
      path: '/Screen',
      component: Screen
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    }
  ]
})
