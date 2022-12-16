<template>
  <div class="container">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div>
      <h3 class="user-email-profile">{{ user.email }}</h3>
      <p class="user-about">About:</p>
      <p><textarea placeholder="Say something about you..." name="text" required
                   v-model:="user.about"></textarea>
      </p>
      <p>Created:
        <b>
          <timeago :datetime="user.created_at" :auto-update="60"></timeago>
        </b>
      </p>
      <p>
        <!-- cal canviar id 1 per l'id del user -->
        <router-link :to="{ path: '/user-submissions/' + '1' }" class="user-links">submissions</router-link>
      </p>
      <p class="user-links">comments</p>
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
  margin-left: 0.5em;
  text-decoration: underline;
}
</style>
