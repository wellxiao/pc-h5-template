import Vue from 'vue'
import Router from 'vue-router'



import {
  HelloWorld,
  Demo
} from './fullpath'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Demo',
      name: '示例',
      component: Demo
    }
  ]
})
