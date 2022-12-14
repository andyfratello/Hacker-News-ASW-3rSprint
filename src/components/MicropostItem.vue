<template>
  <div class="microposts-item">
    <p class="microposts-item-title">{{ item.title }} <a :href="item.url"
                                                         class='microposts-item-details'>{{ item.url }}</a>
    </p>
    <p class="microposts-item-details">{{ item.likes_count }} points by userId: {{ item.user_id }}
      <timeago :datetime="item.created_at" :auto-update="60"></timeago></p>
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
  font-size: 0.9em
}

.microposts-item-details {
  font-size: 0.7em;
  color: #828282;
}

</style>
