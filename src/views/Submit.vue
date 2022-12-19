<template>
  <div class="container">
    <h2>Submit</h2>
    <input type="text" placeholder="title" name="title" v-model="posts.title" required> <br> <br>
    <input type="text" placeholder="url" name="url" v-model="posts.url"> <br> <br>
    <textarea placeholder="text" name="text" v-model="posts.text" required></textarea> <br> <br>
    <button type="submit" v-on:click= "postData">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'Submit',
  data () {
    return {
      posts: {
        title: '',
        url: '',
        text: ''
      }
    }
  },
  methods: {
    async postData () {
      await axios.post(BASE_URL + 'microposts.json', this.posts,
        {
          'headers': {
            'X-API-KEY': 'KEgviRuGemHSgbsYzEASWdVy'
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.url === this.posts.url && res.data.title !== this.posts.title) {
            this.$router.push('/micropost/' + res.data.id)
          } else {
            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.submit-button {
  color: white;
  text-decoration: none;
}
</style>
