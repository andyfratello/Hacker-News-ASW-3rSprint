<template>
  <div class="container">
    <p class="comment-item-details">{{ comment.likes_count }} points by <b>{{ comment.creator_name }}</b>
      <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
    </p>
    <p class="comment-text">
      {{ comment.text }}
    </p>
    <textarea v-model="comment.text" placeholder="Edit the comment..."></textarea>
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
      comment: null
    }
  },
  async mounted () {
    await axios.get(`${BASE_URL}/comments/` + this.$route.params.id + '.json')
      .then(response => (this.comment = response.data)
      )
  },
  methods: {
    reply () {
      axios.post(BASE_URL + 'comments.json',
        {
          'micropost_id': this.micropost.id,
          'text': this.text,
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
    },
    onlyParents (arr) {
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i].parent_id != null) {
            arr.splice(i, 1)
          }
        }
        return arr
      }
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
