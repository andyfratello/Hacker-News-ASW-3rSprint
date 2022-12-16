<template>
  <div class="home">
    <div>
      <micropost-item v-for="item in microposts" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MicropostItem from '../components/MicropostItem.vue'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'UserSubmissions',
  components: {MicropostItem},
  data: function () {
    return {
      microposts: []
    }
  },
  created: function () {
    axios.get(BASE_URL + 'microposts.json?user=' + this.$route.params.id)
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
