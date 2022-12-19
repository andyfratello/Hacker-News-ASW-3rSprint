<template>
  <div class="microposts-item">
    <p class="microposts-item-title">
      <span v-if="micropost.user_id === 1">
        <span class="unable_unvote">*</span>
      </span>
      <span v-else>
        <span v-if="this.voted === true" class="unable_unvote">*</span>
        <span v-else>
          <button class="upvoted_button_c" v-on:click= "voteLike">▲</button>
        </span>
      </span>
      <router-link :to="{ path: 'micropost/' + micropost.id }" class="micropost-title">{{ micropost.title }}</router-link>
      <a :href="micropost.url" class='microposts-item-url'>{{ micropost.url }}</a>
    </p>
    <p class="microposts-item-details">
      {{ micropost.likes_count }} points by
      <span v-if="micropost.user_id!==1">
        <router-link :to="{ path: '/users/' + micropost.user_id }" class="user-email">{{ micropost.creator_name }}</router-link>
      </span>
      <span v-else>
        <router-link to="/profile" class="user-email">{{ micropost.creator_name }}</router-link>
      </span>
      <timeago :datetime="micropost.created_at" :auto-update="60"></timeago>
      |
      <a class="comment-item-url" href="#">comment</a>
      <a v-if="this.voted === true">
        | <button class="downvoted_button_c" v-on:click="unvote">unvote</button>
      </a>
      <span v-if="micropost.user_id===1">|
        <a class="comment-item-url" href="#">edit</a>
        |
        <a class="comment-item-url" href="#">delete</a>
      </span>
    </p>
    <p class="micropost-text">
      {{ micropost.text }}
    </p>
    <textarea placeholder="write a comment..." name="text"></textarea>
    <span>
  </span>
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
      comments: [],
      voted: false
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
  },
  async beforeCreate () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': 'KEgviRuGemHSgbsYzEASWdVy'
      }
    }
    const response = await fetch(BASE_URL + '/users/upvoted_submissions/1.json', requestOptions)
    const json = await response.json()
    console.log(json)
    if (json != null) {
      for (let i = 0; i < json.length; ++i) {
        if ((json[i]['id']) === this.micropost.id) {
          console.log()
          this.voted = true
        }
      }
    }
  },
  methods: {
    async voteLike () {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'KEgviRuGemHSgbsYzEASWdVy'
        }
      }
      console.log(this.micropost.id)
      const response = await fetch(BASE_URL + '/microposts/' + this.micropost.id + '/likes.json', requestOptions)
      console.log(response.json())
      this.voted = true
    },
    async unvote () {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'KEgviRuGemHSgbsYzEASWdVy'
        }
      }
      await fetch(BASE_URL + '/microposts/' + this.micropost.id + '/likes.json', requestOptions)
      this.voted = false
    }
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

.unable_unvote {
  font-size: 1.1em;
  color: orangered;
  padding-left: 5px;
  padding-right: 2px;
}

.upvoted_button_c {
  font-size: 8pt;
  color: #9a9a9a;
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  font-weight: normal;
}

.downvoted_button_c {
  color: #828282;
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  font-weight: normal;
}

.downvoted_button_c:hover {
  color: #828282;
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  font-weight: normal;
  text-decoration: underline;
}

.user-email {
  font-size: 1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: none;
}

.user-email:hover {
  font-size: 1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: underline;
}

.comment-item-url {
  font-size: 1em;
  color: #828282;
  margin-top: 0.5em;
  text-decoration: none;
}

.comment-item-url:hover {
  font-size: 1em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: underline;
}
textarea {
  width: 600px;
  height: 150px;
}
</style>
