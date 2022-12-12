<template>
  <div class="pure-menu pure-menu-horizontal">
    <div class="container">
      <a href="#" class="pure-menu-heading pure-menu-link"><b>Hacker News</b></a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">new</a>
        </li>
        |
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">threads</a>
        </li>
        |
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">ask</a>
        </li>
        |
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">submit</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.pure-menu {
  background-color: #ef6537;
}
.pure-menu a {
  color: black;
}
</style>
