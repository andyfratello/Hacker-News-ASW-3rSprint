import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import New from '@/views/New'
import Threads from '@/views/Threads'
import Ask from '@/views/Ask'
import Submit from '@/views/Submit'
import Profile from '@/views/Profile'
import Single from '@/views/Single'
import SingleComment from '@/views/SingleComment'
import CommentReply from '@/views/CommentReply'
import User from '@/views/User'
import UserSubmissions from '@/views/UserSubmissions'
import UserComments from '@/views/UserComments'
import UpvotedSubmissions from '@/views/UpvotedSubmissions.vue'
import UpvotedComments from '@/views/UpvotedComments.vue'
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
      path: '/comments/:id',
      name: 'SingleComment',
      component: SingleComment
    },
    {
      path: '/comments/:id/reply',
      name: 'CommentReply',
      component: CommentReply
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
      path: '/user-comments/:id',
      name: 'UserComments',
      component: UserComments
    },
    {
      path: '/upvoted-submissions/:id',
      name: 'UpvotedSubmissions',
      component: UpvotedSubmissions
    },
    {
      path: '/upvoted-comments/:id',
      name: 'UpvotedComments',
      component: UpvotedComments
    },
    {
      path: '/micropost/:id/edit',
      name: 'EditMicropost',
      component: EditMicropost
    }
  ]
})
