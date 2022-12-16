<template>
  <div>
    <div class="comment-item">
      <p class="comment-item-details">
        {{ comment.likes_count }} points by
        <span v-if="comment.user_id!==1">
          <router-link :to="{ path: '/users/' + comment.user_id }" class="user-email">{{
              comment.creator_name
            }}</router-link>
        </span>
        <span v-else>
          <router-link to="/profile" class="user-email">{{ comment.creator_name }}</router-link>
        </span>
        <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
        |
        <a class="comment-item-url" href="#">parent</a>
        <span v-if="comment.user_id===1">|
          <a class="comment-item-url" href="#">edit</a>
          |
          <a class="comment-item-url" href="#">delete</a>
        </span>
      </p>

      <p class="comment-text">{{ comment.text }}</p>
      <p><a class="comment-item-url" href="#">reply</a></p>
    </div>
    <div>
      <comment-item v-for="comment in onlyChilds(comments)" :key="comment.id" :comment="comment" class="comment-comment"/>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  props: ['comment'],
  name: 'CommentItem',
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
    onlyChilds (arr) {
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i].parent_id !== this.comment.id) {
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

.comment-item {
  padding-top: 0.3em;
  font-size: 0.9em
}

.comment-text {
  margin-top: -0.5em;
  font-size: 0.9em;
  color: black;

}

.comment-creator {
  font-size: 1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: none;
  font-weight: 600;
}

.comment-item-details {
  font-size: 0.7em;
  color: #828282;
  margin-top: 0.5em;
}

.comment-item-url:hover {
  font-size: 1em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: underline;
}

.comment-comment {
  padding-left: 1em;
  margin-top: -1em;
}

</style>
