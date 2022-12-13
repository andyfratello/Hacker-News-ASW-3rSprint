<template>
  <div class="home">
    <div ref-if="loading">
      <h3>Loading...</h3>
    </div>
    <div>
      <micropost-item v-for="item in items" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import MicropostItem from '../components/MicropostItem.vue'

const BASE_URL = 'https://mysite-ujgs.onrender.com/'

export default {
  components: {MicropostItem},
  setup () {
    const items = ref([])
    const loading = ref(true)

    onMounted(async () => {
      const response = await fetch(BASE_URL + '/microposts.json')
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

<style scoped>
.home {
  background-color: #f6f6ef;
}

</style>
