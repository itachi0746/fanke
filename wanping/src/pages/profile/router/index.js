import Vue from 'vue'
import Router from 'vue-router'
import Profile from '../modules/profile.vue'


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
