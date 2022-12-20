import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import New from '@/views/New'
import Threads from '@/views/Threads'
import Ask from '@/views/Ask'
import Submit from '@/views/Submit'
import Profile from '@/views/Profile'
import Single from '@/views/Single'
import User from '@/views/User'
import UserSubmissions from '@/views/UserSubmissions'
import VueTimeago from 'vue-timeago'
import EditMicropost from '@/views/EditMicropost.vue'

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
    },
    {
      path: '/micropost/:id',
      name: 'Single',
      component: Single
    },
    {
      path: '/users/:id',
      name: 'User',
      component: User
    },
    {
      path: '/user-submissions/:id',
      name: 'UserSubmissions',
      component: UserSubmissions
    },
    {
      path: '/micropost/:id/edit',
      name: 'EditMicropost',
      component: EditMicropost
    }
  ]
})
