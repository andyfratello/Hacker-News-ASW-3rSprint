<template>
  <div class="container">
    <div>
      <h3 class="user-email-profile">{{ user.email }}</h3>
      <p class="user-about-us">About: <b>{{ user.about }}</b></p>
      <br>
      <p>Created:
        <b>
          <timeago :datetime="user.created_at" :auto-update="60"></timeago>
        </b>
      </p>
      <p>
        <router-link :to="{ path: '/user-submissions/' + user.id }" class="user-links">submissions</router-link>
      </p>
      <p>
        <router-link :to="{ path: '/user-comments/' + user.id }" class="user-links">comments</router-link>
      </p>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'
export default {
  name: 'User',
  data: function () {
    return {
      user: {}
    }
  },
  created: function () {
    axios.get(BASE_URL + 'users/' + this.$route.params.id + '.json')
      .then((res) => {
        this.user = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    axios.put(BASE_URL + 'users/' + this.$route.params.id + '.json')
      .then((res) => {
        this.res = res.status
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style>
.user-about-us {
  margin-bottom: -1em;
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
  margin-left: 0.5em;
  text-decoration: underline;
}
</style>
