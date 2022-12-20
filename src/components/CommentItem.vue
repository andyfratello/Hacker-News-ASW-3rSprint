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
          <a class="comment-item-url" v-on:click="deleteComment">delete</a>
        </span>
      </p>

      <p class="comment-text">{{ comment.text }}</p>
      <p><a class="comment-item-url" href="#">reply</a></p>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  props: ['comment'],
  name: 'CommentItem',
  methods: {
    deleteComment: async function () {
      console.log(this.item.id)
      console.log(BASE_URL + 'microposts' + this.item.id + '.json')
      await axios.delete(BASE_URL + 'comments/' + this.comment.id + '.json',
        {
          'headers': {
            'X-API-KEY': 'KEgviRuGemHSgbsYzEASWdVy'
          }
        }
      )
      window.location.reload()
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
.comment-item-details {
  font-size: 0.7em;
  color: #828282;
  margin-top: 0.5em;
  cursor: pointer;
}

.comment-item-url:hover {
  font-size: 1em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: underline;
}

</style>
