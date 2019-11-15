<template>
  <div class="main">
    <div class="splash" v-if="currentUser.id == 0">
      <SplashPage></SplashPage>
    </div>
    <div v-else>
      <div class="navbar">
        <a href="#/" class="active">Home</a>
        <a href="#/messenger">Messenger</a>
        <a href="#/calendar">Calendar</a>
        <a href="#/lists">Lists</a>
        <a href="#/settings">Settings</a>
      </div>
      <div class="content">
        <div id="app">
          <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SplashPage from './components/SplashPage.vue'
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    SplashPage
  },
  data() {
    return {
      // tempDate: null,
      // currDate: null,
      // convertedDate: null,
      // today: null
    };
  },
  created() {
    this.$store.dispatch("initializeJSONData");
    // this.tempDate = this.calendar[0].days[0].events[0].startTime
    // this.currDate = new Date(this.calendar[0].days[0].events[0].startTime);
    // this.convertedDate = this.currDate.toString();
    // this.today = new Date();
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      users: "getUsers",
      messenger: "getMessenger",
      calendar: "getCalendar",
      lists: "getLists"
    })
  }
};
</script>

<style>
/* IDs */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
/* HTML elements */
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
h1 {
  color: black;
  margin: 0;
  font-size: 8vh;
  padding: 1%;
}

/* Custom classes */
.main {
  padding: 0;
  margin: 0;
}
.splash {
  width: 100%;
  height: 100vh;
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
  background-color: #def5fc;
  width: 80%;
  margin-left: 20%;
  padding: 0;
  margin-top: 0;
  height: 100vh;
  position: relative;
}
</style>
