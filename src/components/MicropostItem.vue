<template>
  <div class="microposts-item">
    <p class="microposts-item-title">
      <span v-if="item.user_id === 1">
        <span class="unable_unvote">*</span>
      </span>
      <span v-else>
        <span v-if="this.voted_microposts === true" class="already_voted"></span>
        <span v-else>
          <button class="upvoted_button_c" v-on:click= "voteLike">▲</button>
        </span>
      </span>
      <router-link :to="{ path: 'micropost/' + item.id }" class="micropost-title">{{ item.title }}</router-link>
      <a :href="item.url" class='microposts-item-url'>{{ item.url }}</a>
    </p>
    <p class="microposts-item-details">
      {{ item.likes_count }} points by
      <span v-if="item.user_id!==1">
        <router-link :to="{ path: '/users/' + item.user_id }" class="user-email">{{ item.creator_name }}</router-link>
      </span>
      <span v-else>
        <router-link to="/profile" class="user-email">{{ item.creator_name }}</router-link>
      </span>
      <timeago :datetime="item.created_at" :auto-update="60"></timeago>
      |
      <a class="comment-item-url" href="#">comment</a>
      <a v-if="this.voted_microposts === true">
        | <button class="downvoted_button_c" v-on:click="unvote">unvote</button>
      </a>
      <span v-if="item.user_id===1">|
        <a class="comment-item-url" href="#">edit</a>
        |
        <a class="comment-item-url" href="#">delete</a>
      </span>
    </p>
    <span>
  </span>
  </div>
</template>

<script>

const BASE_URL = 'https://mysite-mnjc.onrender.com'
export default {
  props: ['item'],
  name: 'MicropostItem',
  data () {
    return {
      voted_microposts: false
    }
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
        if ((json[i]['id']) === this.item.id) {
          console.log()
          this.voted_microposts = true
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
      console.log(this.item.id)
      const response = await fetch(BASE_URL + '/microposts/' + this.item.id + '/likes.json', requestOptions)
      console.log(response.json())
      this.voted_microposts = true
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
      await fetch(BASE_URL + '/microposts/' + this.item.id + '/likes.json', requestOptions)
      this.voted_microposts = false
    }
  }
}
</script>

<style>
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

.micropost-creator {
  font-size: 1em;
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

.already_voted {
  font-size: 7pt;
  color: #F6F6EF;
  outline: none;
  border: none;
  background: none;
  width: 40px;
  text-align: left;
  font-family: Verdana, Geneva, sans-serif;
  padding-left: 14px;
}
</style>
