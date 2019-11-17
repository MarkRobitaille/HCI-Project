<template>
  <div class="main">
    <div class="splash" v-if="currentUser.id <= 0">
      <SplashPage></SplashPage>
    </div>
    <!-- <<div class="navbar">
      <a href="#/" :class="activeSection==0? 'activeNavbarSection' : 'navbarSection'">Home</a>
      <a href="#/messenger" :class="activeSection==1? 'activeNavbarSection' : 'navbarSection'"> -->
    <div v-else>
          <div class="navbar">
      <div
        class="navTabs"
        id="homeTab"
        :class="activeSection==0? 'activeNavbarSection' : 'navbarSection'"
        @click="changeSection('/')"
      >
        <!-- <font-awesome-icon icon="home" size="4x"/> -->HOME
      </div>

      <div
        class="navTabs"
        id="messengerTab"
        :class="activeSection==1? 'activeNavbarSection' : 'navbarSection'"
        @click="changeSection('/messenger')"
      >
        <div v-if="unreadMessageCount>0" class="notification"></div>Messenger
      </div>

      <div
        class="navTabs"
        id="calendarTab"
        :class="activeSection==2? 'activeNavbarSection' : 'navbarSection'"
        @click="changeSection('/calendar')"
      >Calendar</div>

      <div
        class="navTabs"
        id="listTab"
        :class="activeSection==3? 'activeNavbarSection' : 'navbarSection'"
        @click="changeSection('/lists')"
      >Lists</div>

      <div
        class="navTabs"
        id="settingsTab"
        :class="activeSection==4? 'activeNavbarSection' : 'navbarSection'"
        @click="changeSection('/settings')"
      >Settings</div>

      <div class="logoutButton">
        <button @click="logOut()">Log out</button>
      </div>
    </div>
      <div class="content">
        <div id="app">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SplashPage from './components/SplashPage.vue'
// import HelloWorld from './components/HelloWorld.vue'
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    SplashPage
  },
  data() {
    return {
      activeSection: 0,
      tempDate: null,
      currDate: null,
      convertedDate: null
    };
  },
  created() {
    this.$store.dispatch("initializeJSONData");
    let today = new Date();
    this.$store.dispatch("setToday", {
      month: today.getMonth(),
      day: today.getDate() - 1
    });
    this.setActiveSection(this.$route.name);
  },
  watch: {
    $route: function(to) {
      // Track changes to route to update css
      this.setActiveSection(to.name);
    },
    "currentUser.id": function() {
      this.setActiveSection(this.$route.name);
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      unreadMessageCount: "getUnreadMessageCount"
    })
  },
  methods: {
    changeSection(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    setActiveSection(routeName) {
      if (this.currentUser.id>0) {
        document.title = routeName;
      } else {
        document.title = "Log in or Register";
      }
      
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
    },
    logOut() {
      this.$store.dispatch("setCurrentUser", { id: 0 });
    }
  }
};
</script>

<style>
/* IDs */
@import url("https://fonts.googleapis.com/css?family=Alata|Roboto&display=swap");
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
  font-family: "Roboto", sans-serif;
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

.navTabs {
  background-color: black;
  margin-left: 4vh;
  height: 15vh;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  /* border-bottom: solid 1.5px white; */
}

#homeTab {
  /* margin-top: 0.5vh; */
  background: #7f7fd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#messengerTab {
  background: #43c6ac; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f8ffae,
    #43c6ac
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f8ffae,
    #43c6ac
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#calendarTab {
  background: #f12711; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f5af19,
    #f12711
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f5af19,
    #f12711
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#listTab {
  background: #9796f0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #fbc7d4,
    #9796f0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #fbc7d4,
    #9796f0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#settingsTab {
  background: #eecda3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ef629f,
    #eecda3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ef629f,
    #eecda3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.leftIconOffset {
  margin-right: 0.5vw;
}
.rightIconOffset {
  margin-left: 0.5vw;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* position: absolute */
}
.whiteIcon {
  color: white;
}
</style>
