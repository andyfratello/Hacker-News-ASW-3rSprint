<template>
  <div class="container">
    <p class="microposts-item-title">
      <span class="micropost-title">{{ micropost.title }}</span>
      <a :href="micropost.url" class='microposts-item-url'>{{ micropost.url }}</a>
    </p>
    <p class="microposts-item-details">{{ micropost.likes_count }} points by {{ micropost.creator_name }}
      <timeago :datetime="micropost.created_at" :auto-update="60"></timeago>
    </p>
    <p class="micropost-text">
      {{ micropost.text }}
    </p>
    <textarea placeholder="write a comment..." name="text"></textarea>
  </div>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'Single',
  data: function () {
    return {
      micropost: {},
      comments: []
    }
  },
  created: function () {
    axios.get(BASE_URL + 'microposts/' + this.$route.params.id + '.json')
      .then((res) => {
        this.micropost = res.data
        this.micropost.comments = []
        this.micropost.kids.forEach(id => {
          axios.get(BASE_URL + 'comments/' + id + '.json')
            .then(res => {
              this.comments.push(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.microposts-item-title::before {
  counter-increment: microposts;
  content: counter(microposts) ". ";
  color: #828282;
}

.microposts-item {
  padding-top: 0.3em;
  font-size: 0.9em
}

.microposts-item-details {
  font-size: 0.7em;
  color: #828282;
  margin-top: -0.5em;
}

.microposts-item-url {
  font-size: 0.7em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: none;
}

.microposts-item-url:hover {
  font-size: 0.7em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: underline;
}

.micropost-title {
  font-size: 1.1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: none;
  font-weight: 600;
}

.micropost-title:visited {
  font-size: 1.1em;
  font-weight: bold;
  text-decoration: none;
  color: #828282;
}

textarea {
  width: 600px;
  height: 150px;
}
</style>
