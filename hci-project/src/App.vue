<template>
  <div class="main">
    <div class="navbar">
      <a href="#/" :class="activeSection==0? 'activeNavbarSection' : 'navbarSection'">Home</a>
      <a href="#/messenger" :class="activeSection==1? 'activeNavbarSection' : 'navbarSection'">
        <div v-if="unreadMessageCount>0" class="notification"></div>Messenger
      </a>
      <a
        href="#/calendar"
        :class="activeSection==2? 'activeNavbarSection' : 'navbarSection'"
      >Calendar</a>
      <a href="#/lists" :class="activeSection==3? 'activeNavbarSection' : 'navbarSection'">Lists</a>
      <a
        href="#/settings"
        :class="activeSection==4? 'activeNavbarSection' : 'navbarSection'"
      >Settings</a>
      <button>Log out</button>
    </div>
    <div class="content">
      <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    // HelloWorld
  },
  data() {
    return {
      activeSection: 0,
      tempDate: null,
      currDate: null,
      convertedDate: null,
      today: null
    };
  },
  created() {
    this.$store.dispatch("initializeJSONData");
    this.setActiveSection(this.$route.name);
    // this.tempDate = this.calendar[0].days[0].events[0].startTime
    // this.currDate = new Date(this.calendar[0].days[0].events[0].startTime);
    // this.convertedDate = this.currDate.toString();
    // this.today = new Date();
  },
  watch: {
    $route(to) {
      // (to, from) {
      // Track changes to route to update css
      this.setActiveSection(to.name);
    }
  },
  computed: {
    ...mapGetters({
      users: "getUsers",
      unreadMessageCount: "getUnreadMessageCount"
      // messenger: 'getMessenger',
      // calendar: 'getCalendar',
      // lists: 'getLists'
    })
  },
  methods: {
    setActiveSection(routeName) {
      switch (routeName) {
        case "Home":
          this.activeSection = 0;
          break;
        case "Messenger":
          this.activeSection = 1;
          break;
        case "Calendar":
          this.activeSection = 2;
          break;
        case "Lists":
          this.activeSection = 3;
          break;
        case "Settings":
          this.activeSection = 4;
          break;
      }
    }
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
.navbarSection {
}
.activeNavbarSection {
  font-weight: bold;
}
.notification {
  background: red;
  position: absolute;
  border-radius: 50%;
  width: 1.25vw;
  height: 1.25vw;
}
</style>
