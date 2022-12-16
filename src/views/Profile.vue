<template>
  <div class="container">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div>
      <div>
        <h3 class="user-email-profile">{{ user.email }}</h3>
        <p class="user-about"> About:</p>
        <p><textarea v-model="user.about" placeholder="Say something about you..." name="about"
        ></textarea>
        </p>
        <p>Created:
          <b>
            <timeago :datetime="user.created_at" :auto-update="60"></timeago>
          </b>
        </p>
        <p>Api Key: {{ user.api_key }}</p>
        <p>
          <router-link :to="{ path: '/user-submissions/' + user.id }" class="user-links">submissions</router-link>
        </p>
        <p>
          <router-link to="/threads" class="user-links">comments</router-link>
        </p>
        <p>
          <router-link :to="{ path: '/upvoted-submissions/' + user.id }" class="user-links">upvoted submissions</router-link>
          <span>/</span>
          <router-link :to="{ path: '/upvoted-comments/' + user.id }" class="user-links-comments">comments</router-link>
        </p>
        <p>
          <button>
            update
          </button>
        </p>

      </div>
    </div>

  </div>
</template>

<script>
import {ref, onMounted} from 'vue'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  setup () {
    const user = ref([])
    const loading = ref(true)

    onMounted(async () => {
      const response = await fetch(BASE_URL + '/users/1.json')
      const json = await response.json()
      console.log(json)
      user.value = json
      loading.value = false
    })
    return {
      user,
      loading
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
</style>
