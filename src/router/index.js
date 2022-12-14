import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import New from '@/views/New'
import Threads from '@/views/Threads'
import Ask from '@/views/Ask'
import Submit from '@/views/Submit'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en' // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from
})

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/New',
      name: 'New',
      component: New
    },
    {
      path: '/Threads',
      name: 'Threads',
      component: Threads
    },
    {
      path: '/Ask',
      name: 'Ask',
      component: Ask
    },
    {
      path: '/Submit',
      name: 'Sumbit',
      component: Submit
    }
  ]
})
