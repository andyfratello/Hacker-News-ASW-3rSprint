<template>
  <div class="container">
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
      {{ comment.likes_count }} points by <b>{{ comment.creator_name }}</b>
      <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
      <span v-if="this.voted_comment === true">
          | <button class="downvoted_button_c" v-on:click="unvote">unvote</button>
      </span>
    </p>
    <!-- <p class="comment-text">
      {{ comment.text }}
    </p> -->
    <textarea v-model="comment.text" placeholder="Edit the comment..."></textarea>
    <br>
    <div>
      <button v-on:click="edit">edit comment</button>
    </div>
  </div>
</template>

<script>
import CommentItem from '../components/CommentItem.vue'
import axios from 'axios'
import {globalStore} from '../model/sesion'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  computed: {
    globalStore () {
      return globalStore
    }
  },
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
        'x-api-key': globalStore.loggedUser.api_key
      }
    }
    const response = await fetch(BASE_URL + 'users/upvoted_comments/' + globalStore.loggedUser.id + '.json', requestOptions)
    const json = await response.json()
    console.log(json)
    if (json != null) {
      for (let i = 0; i < json.length; ++i) {
        if ((json[i]['id']) === this.item.id) {
          console.log()
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
    async voteLike () {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': globalStore.loggedUser.api_key
        }
      }
      console.log(this.item.id)
      const response = await fetch(BASE_URL + '/comment_likes/' + this.item.id, requestOptions)
      console.log(response.json())
      this.voted_comment = true
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
      await fetch(BASE_URL + 'comment_likes/' + this.item.id, requestOptions)
      this.voted_comment = false
    },
    async edit () {
      axios.put(BASE_URL + 'comments/' + this.comment.id + '.json',
        {
          'text': this.comment.text
        },
        {
          'headers': {
            'X-API-KEY': globalStore.loggedUser.api_key
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
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  font-weight: normal;
  text-decoration: underline;
}

textarea {
  width: 600px;
  height: 150px;
}
</style>
