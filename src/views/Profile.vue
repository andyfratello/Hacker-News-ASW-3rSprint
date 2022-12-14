<template>
  <div class="container">
    <h2>Profile</h2>
    <div>
      <div>
        <h3>{{ user.email }}</h3>
        <p>About: We enjoy HackerNews</p>
        <p>Date creation: {{ user.created_at }}</p>
        <p>Date updated: {{ user.updated_at }}</p>
        <p>Api Key: </p>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, onMounted} from 'vue'

const BASE_URL = 'https://mysite-ujgs.onrender.com/'

export default {
  setup () {
    const items = ref([])
    const loading = ref(true)

    onMounted(async () => {
      const response = await fetch(BASE_URL + '/users/2.json')
      const json = await response.json()
      console.log(json)
      items.value = json
      loading.value = false
    })
    return {
      items,
      loading
    }
  }

}
</script>
