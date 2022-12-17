<template>
  <div class="container">
    <p class="comment-item-details">{{ comment.likes_count }} points by {{ comment.creator_name }}
      <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
    </p>
    <p class="comment-text">
      {{ comment.text }}
    </p>
    <textarea v-model="text" placeholder="write a comment..."></textarea>
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
      micropost: null
    }
  },
  async mounted () {
    await axios.get(BASE_URL + 'microposts/' + this.$route.params.id + '.json')
      .then(response => (this.micropost = response.data))
    /* const response2 = await fetch(`${BASE_URL}/comments.json?micropost=` + this.micropost.id)
     const json = await response2.json()
     console.log(json)
     this.comments = json */
    await axios.get(`${BASE_URL}/comments.json?micropost=` + this.micropost.id)
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
        .catch((err) => { console.log(err) })
    }
  }

}

</script>

<style scoped>
.microposts-item-title::before {
  counter-increment: microposts;
  content: counter(microposts) ". ";
  color: #828282;
}

.microposts-item {
  padding-top: 0.3em;
  font-size: 0.9em
}

.microposts-item-details {
  font-size: 0.7em;
  color: #828282;
  margin-top: -0.5em;
}

.microposts-item-url {
  font-size: 0.7em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: none;
}

.microposts-item-url:hover {
  font-size: 0.7em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: underline;
}

.micropost-title {
  font-size: 1.1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: none;
  font-weight: 600;
}

.micropost-title:visited {
  font-size: 1.1em;
  font-weight: bold;
  text-decoration: none;
  color: #828282;
}

textarea {
  width: 600px;
  height: 150px;
}
</style>
