<template>
  <div class="home">
    <div>
      <micropost-item v-for="micropost in microposts" :key="micropost.id" :item="micropost"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MicropostItem from '../components/MicropostItem.vue'
import { globalStore } from '../model/sesion'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'UpvotedSubmissions',
  components: {MicropostItem},
  data: function () {
    return {
      microposts: [],
      AuthStr: globalStore.loggedUser.api_key
    }
  },
  created: function () {
    axios.get(BASE_URL + 'users/upvoted_submissions/' + this.$route.params.id + '.json', {
      'headers': { 'X-API-KEY': this.AuthStr } })
      .then((res) => {
        this.microposts = res.data
      })
      .catch((err) => {
        console.log(err)
      })
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
