<template>
  <div class="container">
    <p class="microposts-item-title">
      <span class="micropost-title">{{ micropost.title }}</span>
      <a :href="micropost.url" class='microposts-item-url'>{{ micropost.url }}</a>
    </p>
    <p class="microposts-item-details">{{ micropost.likes_count }} points by {{ micropost.creator_name }}
      <timeago :datetime="micropost.created_at" :auto-update="60"></timeago>
    </p>
    <p class="micropost-text">
      {{ micropost.text }}
    </p>
    <textarea v-model="text" id="comment" placeholder="write a comment..."></textarea>
    <p>
      <button v-on:click="addComment()">add comment</button>
    </p>
    <div>
      <comment-item v-for="comment in onlyParents(comments)" :key="comment.id" :comment="comment"/>
    </div>
  </div>
</template>

<script>
import CommentItem from '../components/CommentItem.vue'
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'Single',
  components: {CommentItem},
  data () {
    return {
      comments: null,
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
      .then(response => (this.comments = response.data)
      )
  },
  methods: {
    onlyParents (arr) {
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i].parent_id != null) {
            arr.splice(i, 1)
          }
        }
        return arr
      }
    },
    addComment () {
      axios.post(BASE_URL + 'comments.json',
        {
          'micropost_id': this.$route.params.id,
          'text': document.getElementById('comment').value,
          'parent_id': null
        },
        {
          'headers': {
            'X-API-KEY': 'KEgviRuGemHSgbsYzEASWdVy'
          }
        })
        .catch((err) => {
          console.log(err)
        })
      window.location.reload()
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
