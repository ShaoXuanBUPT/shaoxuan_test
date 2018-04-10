import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SystemLogin from '@/components/page/SystemLogin'
import SystemRegister from '@/components/page/SystemRegister'
import SystemUserCenter from '@/components/page/SystemUserCenter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SystemLogin',
      component: SystemLogin
    },
    {
      path: '/system-register',
      name: 'SystemRegister',
      component: SystemRegister
    },
    {
      path: '/system-user-center',
      name: 'SystemUserCenter',
      component: SystemUserCenter,
      meta:{requireAuth:true}
    }
  ]
})
