<template>
  <div class="container">
    <p class="comment-item-details">
      {{ comment.likes_count }} points by <b>{{ comment.creator_name }}</b>
      <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
    </p>
    <p class="comment-text">
      {{ comment.text }}
    </p>
    <textarea v-model="replytext" placeholder="Reply the comment..."></textarea>
    <br>
    <div>
      <button v-on:click="reply">reply</button>
    </div>
  </div>
</template>

<script>
import CommentItem from '../components/CommentItem.vue'
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'SingleComment',
  components: {CommentItem},
  data () {
    return {
      comment: null,
      voted_comment: false
    }
  },
  async beforeCreate () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': 'KEgviRuGemHSgbsYzEASWdVy'
      }
    }
    const response = await fetch(BASE_URL + 'users/upvoted_comments/1.json', requestOptions)
    const json = await response.json()
    //  console.log(json)
    if (json != null) {
      for (let i = 0; i < json.length; ++i) {
        if ((json[i]['id']) === this.item.id) {
          //  console.log()
          this.voted_comment = true
        }
      }
    }
  },
  async mounted () {
    await axios.get(`${BASE_URL}/comments/` + this.$route.params.id + '.json')
      .then(response => (this.comment = response.data)
      )
  },
  methods: {
    async reply () {
      axios.post(BASE_URL + 'comments.json',
        {
          'micropost_id': this.comment.micropost_id,
          'text': this.replytext,
          'parent_id': this.comment.id
        },
        {
          'headers': {
            'X-API-KEY': 'KEgviRuGemHSgbsYzEASWdVy'
          }
        })
        .catch((err) => {
          console.log(err)
        })
      //  window.location.reload()
      window.history.back()
    }
  }

}
</script>

<style scoped>
.comment-item-details {
  font-size: 0.7em;
  color: #828282;
  margin-top: 1.5em;
}

textarea {
  width: 600px;
  height: 150px;
}
</style>
