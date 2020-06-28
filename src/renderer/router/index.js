import Vue from 'vue'
import Router from 'vue-router'
import log from '@/components/log'
import work from '@/components/work'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/log',
      name: 'log',
      component: log
    },
    {
      path: '/work',
      name: 'work',
      component: work
    },
    {
      path: '*',
      redirect: '/log'
    },
  ]
})
