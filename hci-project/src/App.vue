<template>
  <div class="main">
    <div class="navbar">

      <div type="button" class="navTabs" id="homeTab">
        <!-- <font-awesome-icon icon="home" size="4x"/> -->
        <a href="#/" :class="activeSection==0? 'activeNavbarSection' : 'navbarSection'"> HOME</a>
      </div>

      <div class="navTabs" id = "messengerTab">
        <a href="#/messenger" :class="activeSection==1? 'activeNavbarSection' : 'navbarSection'">
          <div v-if="unreadMessageCount>0" class="notification"></div>Messenger
        </a>
      </div>

      <div class="navTabs" id="calendarTab">
        <a
          href="#/calendar"
          :class="activeSection==2? 'activeNavbarSection' : 'navbarSection'"
        >Calendar</a>
      </div>

      <div class="navTabs" id="listTab">
        <a href="#/lists" :class="activeSection==3? 'activeNavbarSection' : 'navbarSection'">Lists</a>
      </div>
      
      <div class="navTabs" id="settingsTab">
        <a
          href="#/settings"
          :class="activeSection==4? 'activeNavbarSection' : 'navbarSection'"
        >Settings</a>
      </div>

      <div class="logoutButton">
        <button>Log out</button>
      </div>

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
@import url('https://fonts.googleapis.com/css?family=Alata|Roboto&display=swap');
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
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  color: white;
  font-size: 2vw;
  line-height: 15vh;
  text-align: center;
  display: block;
  margin: 0;
}
.content {
  /* background-color: #def5fc; */
  width: 80%;
  margin-left: 20%;
  padding: 0;
  margin-top: 0;
  height: 100vh;
  position: relative;
}
.navbarSection {
  /* FADE OUT COLORS OF NOT ACTIVE TABS */
  /* background: white; */
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

.navTabs{

  background-color: black;
  margin-left: 4vh;
  height: 15vh;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  /* border-bottom: solid 1.5px white; */

}

#homeTab{

  /* margin-top: 0.5vh; */
  background: #7F7FD5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

#messengerTab{

  background: #43C6AC;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #F8FFAE, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #F8FFAE, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

#calendarTab{

  background: #f12711;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f5af19, #f12711);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f5af19, #f12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

#listTab{

  background: #9796f0;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}

#settingsTab{

  background: #EECDA3;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #EF629F, #EECDA3);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #EF629F, #EECDA3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}

</style>
