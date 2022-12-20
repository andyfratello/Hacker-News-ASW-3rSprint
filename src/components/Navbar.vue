<template>
  <div class="pure-menu pure-menu-horizontal">
    <div class="container" style="display:flex;">
      <li class="pure-menu-item">
        <img class="logo" src= 'https://avatars.githubusercontent.com/u/4703068?s=280&v=4'/>
      </li>
      <router-link to="/" class="pure-menu-heading pure-menu-link">Hacker News</router-link>
      <ul class="pure-menu-list" style="display:flex;">
        <div>
          |
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/new">new</router-link>
          </li>
          |
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/ask">ask</router-link>
          </li>
          |
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/threads">threads</router-link>
          </li>
          |
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/submit">submit</router-link>
          </li>
          |

        </div>

        <div class="alinear">
          <router-link class="pure-menu-link" to="/profile">profile</router-link>
        </div>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.pure-menu {
  background-color: #e17842;
}
.pure-menu a {
  color: white;
}

</style>
