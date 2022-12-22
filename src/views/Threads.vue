<template>
  <div class="home">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div>
      <comment-item v-for="comment in onlyParents(comments)" :key="comment.id" :comment="comment"/>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import CommentItem from '../components/CommentItem.vue'
import {globalStore} from '../model/sesion'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  components: {CommentItem},
  setup () {
    const comments = ref([])
    const loading = ref(true)

    onMounted(async () => {
      console.log(globalStore.loggedUser.id)
      const response = await fetch(BASE_URL + '/comments.json?user=' + globalStore.loggedUser.id)
      const json = await response.json()
      console.log(json)
      comments.value = json
      loading.value = false
    })
    return {
      comments,
      loading
    }
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
    }
  }
}
</script>

<style scoped>
.home {
  counter-reset: microposts;
  background-color: #f6f6ef;
  padding-left: 2em
}
</style>
