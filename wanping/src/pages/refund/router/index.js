import Vue from 'vue'
import Router from 'vue-router'
import Refund from '../modules/Refund.vue'
import State from '../modules/State.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'refund',
      component: Refund,
      // children: [
      //   {
      //     path: '/state',
      //     name: 'state',
      //     component: State
      //
      //   }
      // ]
    },
    {
      path: '/state',
      name: 'state',
      component: State

    }
  ]
})
