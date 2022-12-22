<template>
  <div class="container">
    <h2>Submit</h2>
    <input type="text" placeholder="title" name="title" v-model="posts.title" required> <br> <br>
    <input type="text" placeholder="url" name="url" v-model="posts.url"> <br> <br>
    <div v-if="isValid" class="url-valid"> URL invalid </div>
    <textarea placeholder="text" name="text" v-model="posts.text" required></textarea> <br> <br>
    <button type="submit" v-on:click="postData" class="button-submit">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'
import {globalStore} from '../model/sesion.js'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'
const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

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
            'X-API-KEY': globalStore.loggedUser.api_key
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
  },
  computed: {
    isValid () {
      console.log('entro')
      console.log('Es: ' + regex.test(this.posts.url))
      if (this.posts.url === '') return false
      return !regex.test(this.posts.url)
    }
  }
}
</script>

<style>
.button-submit {
  min-height: 36px;
}
.url-valid{
  font-size: 15px;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  margin-top: -0.7em;
  color: red;
}
</style>
