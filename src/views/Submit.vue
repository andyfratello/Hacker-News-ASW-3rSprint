<template>
  <div class="container">
    <h2>Submit</h2>
    <input type="text" placeholder="title" name="title" required> <br> <br>
    <input type="text" placeholder="url" name="url"> <br> <br>
    <textarea placeholder="text" name="text" required></textarea> <br> <br>
    <input type="text" placeholder="apiKey" name="apikey" required> <br> <br>
    <button type="submit" v-on:click= "postData">Submit</button>
  </div>
</template>

<script>

export default {
  name: 'Submit',
  data () {
    return {
      posts: {
        title: null,
        url: null,
        text: null,
        apikey: null

      }
    }
  },
  methods: {
    postData: function () {
      var title = document.getElementsByName('title')[0].value
      var url = document.getElementsByName('url')[0].value
      var text = document.getElementsByName('text')[0].value

      var xmlhttp = new XMLHttpRequest()
      xmlhttp.open('POST', 'https://mysite-2ok7.onrender.com/' + title + '&url=' + url + '&text=' + text + '&apiKey=')
      xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          window.location.href = '/'
        }
      }
      xmlhttp.setRequestHeader('Content-type', 'application/json')
      xmlhttp.setRequestHeader('Accept', 'application/json')
      xmlhttp.send()
    }
  },
  created: function () {

  }

}
</script>
