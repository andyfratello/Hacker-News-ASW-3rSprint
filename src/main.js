// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './utils/filter'
import {globalStore} from './model/sesion'

Vue.config.productionTip = false
getUser()
async function getUser () {
  const response = await fetch('https://mysite-mnjc.onrender.com/' + '/users/1.json')
  const json = await response.json()
  console.log(json)
  globalStore.loggedUser = json
  console.log(globalStore.loggedUser)
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
