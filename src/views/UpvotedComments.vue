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
  name: 'UpvotedComments',
  components: {CommentItem},
  data: function () {
    return {
      comments: [],
      AuthStr: 'KEgviRuGemHSgbsYzEASWdVy'
    }
  },
  created: function () {
    axios.get(BASE_URL + 'users/upvoted_comments/' + this.$route.params.id + '.json', {
      'headers': { 'X-API-KEY': this.AuthStr } })
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
