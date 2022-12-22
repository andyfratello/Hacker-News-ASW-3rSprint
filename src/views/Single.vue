<template>
  <div class="container">
    <div class="microposts-item">
      <p class="microposts-item-title">
        <span v-if="micropost.user_id === globalStore.loggedUser.id">
          <span class="unable_unvote">*</span>
        </span>
        <span v-else>
          <span v-if="this.voted === true" class="already_voted"></span>
          <span v-else>
            <button class="upvoted_button_c" v-on:click= "voteLike">▲</button>
          </span>
        </span>
        <span class="micropost-title">{{ micropost.title }}</span>
        <a :href="micropost.url" class='microposts-item-url'>{{ micropost.url }}</a>
      </p>
      <p class="microposts-item-details">
        {{ micropost.likes_count }} points by
        <span v-if="micropost.user_id !== globalStore.loggedUser.id">
          <router-link :to="{ path: '/users/' + micropost.user_id }" class="user-email">{{ micropost.creator_name }}</router-link>
        </span>
        <span v-else>
          <router-link to="/profile" class="user-email">{{ micropost.creator_name }}</router-link>
        </span>
        <timeago :datetime="micropost.created_at" :auto-update="60"></timeago>
        |
        <a class="comment-item-url" href="#">comment</a>
        <a v-if="this.voted === true">
          | <button class="downvoted_button_c" v-on:click="unvote">unvote</button>
        </a>
        <span v-if="micropost.user_id === globalStore.loggedUser.id">|
          <router-link :to="{ path: '/micropost/' + micropost.id + '/edit'}" class="comment-item-url">edit</router-link>
          |
          <a class="downvoted_button_c" v-on:click="deleteMicropost">delete</a>
        </span>
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
  </div>
</template>

<script>
import CommentItem from '../components/CommentItem.vue'
import axios from 'axios'
import {globalStore} from '../model/sesion.js'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  computed: {
    globalStore () {
      return globalStore
    }
  },
  name: 'Single',
  components: {CommentItem},
  data () {
    return {
      micropost: {},
      comments: [],
      voted: false
    }
  },
  async mounted () {
    await axios.get(BASE_URL + 'microposts/' + this.$route.params.id + '.json')
      .then(response => (this.micropost = response.data))

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
            'X-API-KEY': globalStore.loggedUser.api_key
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.$router.push({name: 'Submit'})
      this.$router.back()
    },
    deleteMicropost: async function () {
      await axios.delete(BASE_URL + '/microposts/' + this.item.id + '.json',
        {
          'headers': {
            'X-API-KEY': globalStore.loggedUser.api_key
          }
        }
      )
      await this.$router.push({name: 'Submit'})
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
      const response = await fetch(BASE_URL + '/microposts/' + this.micropost.id + '/likes.json', requestOptions)
      const json = await response.json()
      this.micropost.likes_count = json['likes_count']
      this.voted = true
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
      const response = await fetch(BASE_URL + '/microposts/' + this.micropost.id + '/likes.json', requestOptions)
      const json = await response.json()
      this.micropost.likes_count = json['likes_count']
      this.voted = false
      this.$forceUpdate()
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
    const response = await fetch(BASE_URL + '/users/upvoted_submissions/' + globalStore.loggedUser.id + '.json', requestOptions)
    const json = await response.json()
    if (json != null) {
      for (let i = 0; i < json.length; ++i) {
        if ((json[i]['id']) === this.micropost.id) {
          this.voted = true
        }
      }
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

.unable_unvote {
  font-size: 1.1em;
  color: orangered;
  padding-left: 5px;
  padding-right: 2px;
}

.upvoted_button_c {
  font-size: 8pt;
  color: #9a9a9a;
  background:none;
  border:none;
  margin:0;
  padding:0;
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
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  font-weight: normal;
  text-decoration: underline;
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

.comment-item-url {
  font-size: 1em;
  color: #828282;
  margin-top: 0.5em;
  text-decoration: none;
}

.comment-item-url:hover {
  font-size: 1em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: underline;
}
textarea {
  width: 600px;
  height: 150px;
}
</style>
