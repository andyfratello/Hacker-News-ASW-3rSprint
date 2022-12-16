<template>
  <div class="microposts-item">
    <p class="microposts-item-title">
      <span v-if="item.user_id === 1">
        <span class="unable_unvote">*</span>
      </span>
      <span v-else>
        <span v-if="this.voted_microposts === true" class="unable_unvote">
        *
        </span>
        <span v-else>
          <button class="upvoted_button_c" v-on:click= "voteLike">▲</button>
        </span>
      </span>
      <router-link :to="{ path: 'micropost/' + item.id }" class="micropost-title">{{ item.title }}</router-link>
      <a :href="item.url" class='microposts-item-url'>{{ item.url }}</a>
    </p>
    <p class="microposts-item-details">{{ item.likes_count }} points by {{ item.creator_name }}
      <timeago :datetime="item.created_at" :auto-update="60"></timeago>
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
    if ((json[0]['id']) === this.item.id) {
      this.voted_microposts = true
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
      await fetch(BASE_URL + '/microposts/' + this.item.id + '/likes.json', requestOptions)
      this.voted_microposts = true
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

.micropost-title:visited {
  font-size: 1.1em;
  font-weight: bold;
  text-decoration: none;
  color: #828282;
}

.unable_unvote {
  color: orangered;
  padding-left: 8px;
  padding-right: 3px;
}

.upvoted_button_c {
  font-size: 8pt;
  color: #9a9a9a;
  outline: none;
  border: none;
  background: none;
  width: 20px;
  height: 20px;
  text-align: left;
  cursor: pointer;
  line-height: 0;
  padding-left: -3px;
}
</style>
