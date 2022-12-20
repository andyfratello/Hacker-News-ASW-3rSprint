<template>
  <div class="container">
    <p class="microposts-item-title">
      <span class="micropost-title">{{ micropost.title }}</span>
      <a :href="micropost.url" class='microposts-item-url'>{{ micropost.url }}</a>
    </p>
    <p class="microposts-item-details">
      {{ micropost.likes_count }} points by
      <span v-if="micropost.user_id!==1">
        <router-link :to="{ path: '/users/' + micropost.user_id }" class="user-email">{{ micropost.creator_name }}</router-link>
      </span>
      <span v-else>
        <router-link to="/profile" class="user-email">{{ micropost.creator_name }}</router-link>
      </span>
      <timeago :datetime="micropost.created_at" :auto-update="60"></timeago>
    </p>
    <p class="micropost-text">
      {{ micropost.text }}
    </p>
    <p class="container">
        <label>title:</label>
        <input id="title" v-bind:placeholder="micropost.title">
    </p>
    <p class="container" v-if="micropost.url !== ''">
      <label>url: {{micropost.url}}</label>
    </p>
    <p class="container" v-else>
      <label>text:</label>
      <input id="text" v-bind:placeholder="micropost.text">
    </p>
    <button type="submit" v-on:click= "edit">Update</button>
  </div>
</template>

<script>

import MicropostItem from '../components/MicropostItem.vue'
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  components: {MicropostItem},
  name: 'EditMicropost',
  data: function () {
    return {
      micropost: {},
      data: {}
    }
  },
  created: function () {
    axios.get(BASE_URL + 'microposts/' + this.$route.params.id + '.json')
      .then((res) => {
        this.micropost = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    async edit () {
      console.log(document.getElementById('title').value)
      console.log(document.getElementById('text').value)
      if (document.getElementById('title').value !== '' && document.getElementById('text').value !== '') {
        this.data = {
          'title': document.getElementById('title').value,
          'text': document.getElementById('text').value
        }
      } else if (document.getElementById('text').value !== '') {
        this.data = {
          'text': document.getElementById('text').value
        }
      } else if (document.getElementById('title').value !== '') {
        this.data = {
          'title': document.getElementById('title').value
        }
      }
      axios.put(BASE_URL + 'microposts/' + this.$route.params.id + '.json',
        this.data,
        {
          'headers': {
            'accept': 'application/json',
            'X-API-KEY': 'KEgviRuGemHSgbsYzEASWdVy',
            'Content-Type': 'application/json'
          }
        })
        .catch((err) => {
          console.log(err)
        })
      await this.$router.push({name: 'Home'})
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
  cursor: pointer;
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
  cursor: pointer;
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
