<template>
  <div class="microposts-item">
    <p class="microposts-item-title">
      <router-link :to="{ path: '/micropost/' + item.id }" class="micropost-title">{{ item.title }}</router-link>
      <a :href="item.url" class='microposts-item-url'>{{ item.url }}</a>
    </p>
    <p class="microposts-item-details">
      {{ item.likes_count }} points by
      <router-link :to="{ path: '/users/' + item.user_id }" class="user-email">{{ item.creator_name }}</router-link>
      <timeago :datetime="item.created_at" :auto-update="60"></timeago>
      |
      <a class="comment-item-url" href="#">comment</a>
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
export default {
  props: ['item'],
  name: 'MicropostItem'
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
</style>