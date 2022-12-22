<template>
  <div class="container">
    <div class="dropdown">
      <button class="dropbtn">Choose profile</button>
      <div class="dropdown-content">
        <a href="#" v-on:click="getUser1">User 1</a>
        <a href="#" v-on:click="getUser2">User 2</a>
        <a href="#" v-on:click="getUser3">User 3</a>
      </div>
    </div>
    <h3 class="user-email-profile">{{ globalStore.loggedUser.email }}</h3>
    <p class="user-about">About:</p>
    <p><textarea v-model="globalStore.loggedUser.about" placeholder="Say something about you..." name="about"
    ></textarea>
    </p>
    <p>Created:
      <b>
        <timeago :datetime="globalStore.loggedUser.created_at" :auto-update="60"></timeago>
      </b>
    </p>
    <p>Api Key: {{ globalStore.loggedUser.api_key }}</p>
    <p>
      <router-link :to="{ path: '/user-submissions/' + globalStore.loggedUser.id }" class="user-links">submissions</router-link>
    </p>
    <p>
      <router-link to="/threads" class="user-links">comments</router-link>
    </p>
    <p>
      <router-link :to="{ path: '/upvoted-submissions/' + globalStore.loggedUser.id }" class="user-links">upvoted submissions
      </router-link>
      <span>/</span>
      <router-link :to="{ path: '/upvoted-comments/' + globalStore.loggedUser.id }" class="user-links-comments">comments</router-link>
    </p>
    <p>
      <button v-on:click="update" class="button-update">Update</button>
    </p>
  </div>
</template>

<script>
import {globalStore} from '../model/sesion.js'
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  computed: {
    globalStore () {
      return globalStore
    }
  },
  methods: {
    update () {
      let formData = new FormData()
      formData.append('about', this.globalStore.loggedUser.about)

      //  El this.$route.params.id no funciona
      axios.put(BASE_URL + 'users/' + this.globalStore.loggedUser.id + '.json', formData, {'headers': {'X-API-KEY': globalStore.loggedUser.api_key}})
        .then(response => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getUser1 () {
      const response = await fetch(BASE_URL + '/users/1.json')
      globalStore.loggedUser = await response.json()
    },
    async getUser2 () {
      const response = await fetch(BASE_URL + '/users/2.json')
      globalStore.loggedUser = await response.json()
    },
    async getUser3 () {
      const response = await fetch(BASE_URL + '/users/3.json')
      globalStore.loggedUser = await response.json()
    }
  }
}
</script>

<style>
.user-about {
  margin-bottom: -1em;
  margin-left: 0.3em;
}

.user-email-profile {
  margin-top: 2em;
  text-decoration: none;
}

.user-email-profile:hover {
  margin-top: 2em;
  text-decoration: none;
}

.user-links {
  margin-left: 3.5em;
  margin-bottom: -0.5em;
  text-decoration: underline;
  margin-right: 0.3em;
  color: #828282;
}

.user-links-comments {
  margin-left: 0.4em;
  text-decoration: underline;
  color: #828282;
}

.button-update {
  height: 36px;
}

/* Dropdown Button */
.dropbtn {
  background-color: darkorange;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: darkorange;
}
</style>
