import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import New from '@/views/New'
import Threads from '@/views/Threads'
import Ask from '@/views/Ask'
import Submit from '@/views/Submit'
import Profile from '@/views/Profile'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en'
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
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/threads',
      name: 'Threads',
      component: Threads
    },
    {
      path: '/ask',
      name: 'Ask',
      component: Ask
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
