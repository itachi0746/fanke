import Vue from 'vue'
import Router from 'vue-router'
import Profile from '../modules/profile.vue'
// import Shop from '../pages/shop/shop.vue'
// import Screen from '../pages/screen/screen.vue'
// import OrderConfirm from '../pages/order/children/orderConfirm.vue'
// import OrderDetail from '../pages/order/children/orderDetail.vue'
// import MyOrder from '../pages/order/myOrder.vue'
// import ShoppingCart from '../pages/shoppingCart/shoppingCart.vue'
// import Search from '../pages/search/search.vue'
// import Profile from '../pages/profile/profile.vue'
// import Info from '../pages/profile/children/info.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Profile',
      component: Profile
    }
  ]
})
