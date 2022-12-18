<template>
  <div>
    <div class="comment-item">
      <p class="comment-item-details">
        <span v-if="comment.user_id === 1">
          <span class="unable_unvote">*</span>
        </span>
        <span v-else>
          <span v-if="this.voted_comment === true" class="unable_unvote">*</span>
          <span v-else>
            <button class="upvoted_button_c" v-on:click= "voteLike">▲</button>
          </span>
        </span>
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
        <router-link :to="{ path: '/micropost/' + comment.micropost_id }" class="comment-item-url">parent</router-link>
        <span v-if="comment.user_id===1">|
          <router-link :to="{ path: '/comments/' + comment.id }" class="comment-item-url">edit</router-link>
          |
          <a class="comment-item-url" v-on:click="deleteComment">delete</a>
        </span>
        <span v-if="this.voted_comment === true">
          | <button class="downvoted_button_c" v-on:click="unvote">unvote</button>
        </span>
      </p>
      <p class="comment-text">{{ comment.text }}</p>
      <p>
        <router-link :to="{ path: '/comments/' + comment.id }" class="reply-link">{{ 'reply' }}</router-link>
      </p>
    </div>
    <div>
      <comment-item v-for="comment in onlyChilds(comments)" :key="comment.id" :comment="comment"
                    class="comment-comment"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com'

export default {
  props: ['comment'],
  name: 'CommentItem',
  data () {
    return {
      comments: null,
      micropost: null,
      voted_comment: false
    }
  },
  async mounted () {
    await axios.get(`${BASE_URL}/comments.json`)
      .then(response => (this.comments = response.data)
      )
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
    const response = await fetch(BASE_URL + '/users/upvoted_comments/1.json', requestOptions)
    const json = await response.json()
    console.log(json)
    if (json != null) {
      for (let i = 0; i < json.length; ++i) {
        if ((json[i]['comment_id']) === this.comment.id) {
          console.log()
          this.voted_comment = true
        }
      }
    }
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
    },
    deleteComment: async function () {
      console.log(this.comment.id)
      console.log(BASE_URL + 'microposts' + this.comment.id + '.json')
      await axios.delete(BASE_URL + '/comments/' + this.comment.id + '.json',
        {
          'headers': {
            'X-API-KEY': 'KEgviRuGemHSgbsYzEASWdVy'
          }
        }
      )
      window.location.reload()
    },
    async voteLike () {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'KEgviRuGemHSgbsYzEASWdVy'
        }
      }
      console.log(this.comment.id)
      const response = await fetch(BASE_URL + '/comment_likes/' + this.comment.id, requestOptions)
      console.log(response.json())
      this.voted_comment = true
    },
    async unvote () {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'KEgviRuGemHSgbsYzEASWdVy'
        }
      }
      await fetch(BASE_URL + '/comment_likes/' + this.comment.id, requestOptions)
      this.voted_comment = false
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

.comment-comment {
  padding-left: 1em;
  margin-top: -1em;
}

.unable_unvote {
  color: orangered;
  padding-left: 8px;
  padding-right: 3px;
}

.upvoted_button_c {
  font-size: 8pt;
  color: #9a9a9a;
  outline: none;
  border: none;
  background: none;
  width: 20px;
  height: 20px;
  text-align: left;
  cursor: pointer;
  line-height: 0;
  padding-left: -3px;
}

.downvoted_button_c {
  font-size: 7pt;
  color: #828282;
  outline: none;
  border: none;
  background: none;
  width: 40px;
  text-align: left;
  cursor: pointer;
  font-family: Verdana, Geneva, sans-serif;
  text-decoration: underline;
}
</style>
