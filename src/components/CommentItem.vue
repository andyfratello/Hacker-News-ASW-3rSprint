<template>
  <div>
    <div class="comment-item">
      <p class="comment-item-details">{{ comment.likes_count }} points by <span
        class="comment-creator">{{ comment.creator_name }}</span>
        <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
        |
        <a class="comment-item-url" href="#">parent</a>
        <span v-if="comment.user_id===1">|
        <a class="comment-item-url" href="#">edit</a>
        |
        <a class="comment-item-url" href="#">delete</a>
        </span>
      </p>

      <p class="comment-text">{{ comment.text }}</p>
      <p><a class="comment-item-url" href="#">reply</a></p>
    </div>
  </div>

</template>

<script>
export default {
  props: ['comment'],
  name: 'CommentItem'
}
</script>

<style scoped>

.comment-item {
  padding-top: 0.3em;
  font-size: 0.9em
}

.comment-text {
  margin-top: -0.5em;
  font-size: 0.9em;
  color: black;

}

.comment-creator {
  font-size: 1em;
  color: rgba(7, 13, 13, 0.95);
  text-decoration: none;
  font-weight: 600;
}

.comment-item-details {
  font-size: 0.7em;
  color: #828282;
  margin-top: 0.5em;
}

.comment-item-url:hover {
  font-size: 0.7em;
  color: #828282;
  margin-top: -0.5em;
  text-decoration: underline;
}

</style>
