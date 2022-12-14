<template>
  <div class="microposts-item">
    <p class="microposts-item-title"><b>{{ item.title }}</b> <a :href="item.url"
                                                         class='microposts-item-details'>{{ item.url }}</a>
    </p>
    <p class="microposts-item-details">{{ item.likes_count }} points by {{ item.creator_name }}
      <timeago :datetime="item.created_at" :auto-update="60"></timeago>
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

</style>
