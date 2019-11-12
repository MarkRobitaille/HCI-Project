<template>
  <div class="main">
    <div class="navbar">
      <a href="#" class="active">Home</a>
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
      <a href="#">Link 4</a>
    </div>
    <div class="content">
      <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  min-height: 100vh;
}
.main {
  padding: 0;
  margin: 0;
}
.navbar {
  float: left;
  position: fixed;
  width: 20%;
  padding: 0;
  margin: 0;
}
.navbar a {
  display: block;
  padding: 5%;
  margin: 0;
}
.content {
  background-color: lightblue;
  width: 80%;
  margin-left: 20%;
  padding: 0;
  margin-top: 0;
  height: 100vh;
}
</style>
