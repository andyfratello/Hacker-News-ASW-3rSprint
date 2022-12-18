<template>
  <div class="container">
    <p class="comment-item-details">
      <span v-if="comment.user_id === 1">
        <span class="unable_unvote">*</span>
      </span>
      <span v-else>
        <span v-if="this.voted_comment === true" class="unable_unvote">*</span>
        <span v-else>
          <button class="upvoted_button_c" v-on:click= "voteLike">▲</button>
        </span>
      </span>
      {{ comment.likes_count }} points by <b>{{ comment.creator_name }}</b>
      <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
      <span v-if="this.voted_comment === true">
          | <button class="downvoted_button_c" v-on:click="unvote">unvote</button>
      </span>
    </p>
    <p class="comment-text">
      {{ comment.text }}
    </p>
    <textarea v-model="comment.text" placeholder="Edit the comment..."></textarea>
    <br>
    <div>
      <button v-on:click="reply">reply</button>
    </div>
  </div>
</template>

<script>
import CommentItem from '../components/CommentItem.vue'
import axios from 'axios'

const BASE_URL = 'https://mysite-mnjc.onrender.com/'

export default {
  name: 'SingleComment',
  components: {CommentItem},
  data () {
    return {
      comment: null,
      voted_comment: false
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
    const response = await fetch(BASE_URL + 'users/upvoted_comments/1.json', requestOptions)
    const json = await response.json()
    console.log(json)
    if (json != null) {
      for (let i = 0; i < json.length; ++i) {
        if ((json[i]['id']) === this.item.id) {
          console.log()
          this.voted_comment = true
        }
      }
    }
  },
  async mounted () {
    await axios.get(`${BASE_URL}/comments/` + this.$route.params.id + '.json')
      .then(response => (this.comment = response.data)
      )
  },
  methods: {
    reply () {
      axios.post(BASE_URL + 'comments.json',
        {
          'micropost_id': this.micropost.id,
          'text': this.text,
          'parent_id': this.comment.id
        },
        {
          'headers': {
            'X-API-KEY': 'KEgviRuGemHSgbsYzEASWdVy'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onlyParents (arr) {
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i].parent_id != null) {
            arr.splice(i, 1)
          }
        }
        return arr
      }
    },
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
      const response = await fetch(BASE_URL + '/comment_likes/' + this.item.id, requestOptions)
      console.log(response.json())
      this.voted_comment = true
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
      await fetch(BASE_URL + 'comment_likes/' + this.item.id, requestOptions)
      this.voted_comment = false
    }
  }

}

</script>

<style scoped>
.comment-item-details {
  font-size: 0.7em;
  color: #828282;
  margin-top: 1.5em;
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

.downvoted_button_c {
  font-size: 7pt;
  color: #828282;
  outline: none;
  border: none;
  background: none;
  width: 40px;
  text-align: left;
  cursor: pointer;
  font-family: Verdana, Geneva, sans-serif;
  text-decoration: underline;
}

textarea {
  width: 600px;
  height: 150px;
}
</style>
