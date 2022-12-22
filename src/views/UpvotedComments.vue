<template>
  <div class="home">
    <div>
      <comment-item v-for="item in comments" :key="item.id" :comment="item"/>
      <a ></a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentItem from '../components/CommentItem.vue'
import { globalStore } from '../model/sesion'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'UpvotedComments',
  components: {CommentItem},
  data: function () {
    return {
      commentLikes: [],
      comments: [],
      AuthStr: globalStore.loggedUser.api_key
    }
  },
  created: function () {
    axios.get(BASE_URL + 'users/upvoted_comments/' + globalStore.loggedUser.id + '.json', {
      'headers': { 'X-API-KEY': this.AuthStr } })
      .then((res) => {
        console.log(res.data)
        this.commentLikes = res.data
        for (let i = 0; i < this.commentLikes.length; i++) {
          console.log(i)
          axios.get(BASE_URL + 'comments/' + this.commentLikes[i].comment_id + '.json')
            .then((res) => {
              this.comments.push(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.home {
  counter-reset: microposts;
  background-color: #f6f6ef;
  padding-left: 2em
}
</style>
