<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import MicropostItem from './components/MicropostItem.vue'

export default {
  name: 'App',
  components: {
    navbar: Navbar,
    micropost: MicropostItem
  }
}
</script>

<style>

</style>
