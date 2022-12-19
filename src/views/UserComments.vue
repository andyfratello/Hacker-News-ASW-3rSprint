<template>
  <div class="home">
    <div>
      <comment-item v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentItem from '../components/CommentItem.vue'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'UserComments',
  components: {CommentItem},
  data: function () {
    return {
      comments: []
    }
  },
  created: function () {
    axios.get(BASE_URL + 'comments.json?user=' + this.$route.params.id)
      .then((res) => {
        this.comments = res.data
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
