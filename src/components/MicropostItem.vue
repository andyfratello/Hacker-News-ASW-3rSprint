<template>
  <div class="microposts-item">
    <p class="microposts-item-title">
      <span v-if="item.user_id === globalStore.loggedUser.id">
        <span class="unable_unvote">*</span>
      </span>
      <span v-else>
        <span v-if="this.voted_microposts === true" class="already_voted"></span>
        <span v-else>
          <button class="upvoted_button_c" v-on:click="voteLike">▲</button>
        </span>
      </span>
      <router-link :to="{ path: '/micropost/' + item.id }" class="micropost-title">{{ item.title }}</router-link>
      <a :href="item.url" class='microposts-item-url'>{{ item.url | host }}</a>
    </p>
    <p class="microposts-item-details">
      {{ item.likes_count }} points by
      <span v-if="item.user_id !== globalStore.loggedUser.id">
        <router-link :to="{ path: '/users/' + item.user_id }" class="user-email">{{ item.creator_name }}</router-link>
      </span>
      <span v-else>
        <router-link to="/profile" class="user-email">{{ item.creator_name }}</router-link>
      </span>
      <timeago :datetime="item.created_at" :auto-update="60"></timeago>
      |
      <router-link :to="{ path: '/micropost/' + item.id}" class="comment-item-url">discuss</router-link>
      <a v-if="this.voted_microposts === true">
        |
        <button class="downvoted_button_c" v-on:click="unvote">unvote</button>
      </a>
      <span v-if="item.user_id === globalStore.loggedUser.id">|
        <router-link :to="{ path: '/micropost/' + item.id + '/edit'}" class="comment-item-url">edit</router-link>
        |
        <a class="downvoted_button_c" v-on:click="deleteMicropost">delete</a>
      </span>
    </p>
    <span>
  </span>
  </div>
</template>

<script>
import axios from 'axios'
import {globalStore} from '../model/sesion.js'

const BASE_URL = 'https://mysite-mnjc.onrender.com'

export default {
  computed: {
    globalStore () {
      return globalStore
    }
  },
  props: ['item'],
  name: 'MicropostItem',
  data () {
    return {
      voted_microposts: false
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
        if ((json[i]['id']) === this.item.id) {
          this.voted_microposts = true
        }
      }
    }
  },
  methods: {
    deleteMicropost: async function () {
      console.log(this.item.id)
      console.log(BASE_URL + 'microposts' + this.item.id + '.json')
      await axios.delete(BASE_URL + '/microposts/' + this.item.id + '.json',
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
      const response = await fetch(BASE_URL + '/microposts/' + this.item.id + '/likes.json', requestOptions)
      const json = await response.json()
      console.log(json['likes_count'])
      this.item.likes_count = json['likes_count']
      this.voted_microposts = true
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
      const response = await fetch(BASE_URL + '/microposts/' + this.item.id + '/likes.json', requestOptions)
      const json = await response.json()
      console.log(json['likes_count'])
      this.item.likes_count = json['likes_count']
      this.voted_microposts = false
      this.$forceUpdate()
      this.$router.push({name: 'Home'})
      this.$router.back()
    }
  }
}
</script>

<style>
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
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: normal;
}

.downvoted_button_c {
  color: #828282;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
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

.already_voted {
  font-size: 1.1em;
  padding-left: 12px;
  padding-right: 2px;
}
</style>
