<template>
  <div>
    <div class="comment-item">
      <p class="comment-item-details">
        <span v-if="comment.user_id === globalStore.loggedUser.id">
          <span class="unable_unvote">*</span>
        </span>
        <span v-else>
          <span v-if="this.voted_comment === true" class="unable_unvote"></span>
          <span v-else>
            <button class="upvoted_button_c" v-on:click= "voteLike">▲</button>
          </span>
        </span>
        {{ comment.likes_count }} points by
        <span v-if="comment.user_id !== globalStore.loggedUser.id">
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
        <span v-if="comment.user_id === globalStore.loggedUser.id">|
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
        <router-link :to="{ path: '/comments/' + comment.id + '/reply'}" class="reply-link">{{ 'reply' }}</router-link>
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
import { globalStore } from '../model/sesion'

const BASE_URL = 'https://mysite-mnjc.onrender.com'

export default {
  computed: {
    globalStore () {
      return globalStore
    }
  },
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
        'x-api-key': globalStore.loggedUser.api_key
      }
    }
    const response = await fetch(BASE_URL + '/users/upvoted_comments/' + globalStore.loggedUser.id + '.json', requestOptions)
    const json = await response.json()
    if (json != null) {
      for (let i = 0; i < json.length; ++i) {
        if ((json[i]['comment_id']) === this.comment.id) {
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
      await axios.delete(BASE_URL + '/comments/' + this.comment.id + '.json',
        {
          'headers': {
            'X-API-KEY': globalStore.loggedUser.api_key
          }
        }
      )
      this.$router.push({name: 'Submit'})
      this.$router.back()
    },
    async voteLike () {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': globalStore.loggedUser.api_key
        }
      }
      await fetch(BASE_URL + '/comment_likes/' + this.comment.id, requestOptions)
      await axios.get(BASE_URL + '/comments/' + this.comment.id + '.json')
        .then((res) => {
          this.comment.likes_count = res.data.likes_count
        })
      this.voted_comment = true
      this.$forceUpdate()
    },
    async unvote () {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': globalStore.loggedUser.api_key
        }
      }
      await fetch(BASE_URL + '/comment_likes/' + this.comment.id, requestOptions)
      await axios.get(BASE_URL + '/comments/' + this.comment.id + '.json')
        .then((res) => {
          this.comment.likes_count = res.data.likes_count
        })
      this.voted_comment = false
      this.$forceUpdate()
      this.$router.push({name: 'Home'})
      this.$router.back()
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

.comment-item-url {
  font-size: 1em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: none;
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
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: normal;
}

.downvoted_button_c {
  color: #828282;
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  font-weight: normal;
}

.downvoted_button_c:hover {
  color: #828282;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: normal;
  text-decoration: underline;
}

.reply-link {
  font-size: 1em;
  color: black;
  cursor: pointer;
}

.user-email {
  font-size: 1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: none;
}

.user-email:hover {
  font-size: 1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: underline;
}
</style>
