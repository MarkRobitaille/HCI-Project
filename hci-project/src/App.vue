<template>
  <div class="main">
    <div class="splash" v-if="currentUser.id <= 0">
      <SplashPage></SplashPage>
    </div>
    <!-- <<div class="navbar">
      <a href="#/" :class="activeSection==0? 'activeNavbarSection' : 'navbarSection'">Home</a>
    <a href="#/messenger" :class="activeSection==1? 'activeNavbarSection' : 'navbarSection'">-->
    <div v-else>
      <div class="navbar">
        <div
          class="navTabs"
          id="homeTab"
          :class="activeSection==0? 'activeNavbarSection' : 'navbarSection'"
          @click="changeSection('/')"
        >
          <font-awesome-icon icon="home" class="homeIcon leftIconOffset" size="2x" />HOME
        </div>
        <div
          class="navTabs"
          id="messengerTab"
          :class="activeSection==1? 'activeNavbarSection' : 'navbarSection'"
          @click="changeSection('/messenger')"
        >
          <div v-if="unreadMessageCount>0" class="notification"></div>
          <font-awesome-icon icon="comment" class="commentIcon leftIconOffset" size="2x" />MESSENGER
        </div>
        <div
          class="navTabs"
          id="calendarTab"
          :class="activeSection==2? 'activeNavbarSection' : 'navbarSection'"
          @click="changeSection('/calendar')"
        >
          <font-awesome-icon icon="calendar-alt" class="calendarIcon leftIconOffset" size="2x" />CALENDAR
        </div>
        <div
          class="navTabs"
          id="listTab"
          :class="activeSection==3? 'activeNavbarSection' : 'navbarSection'"
          @click="changeSection('/lists')"
        >
          <font-awesome-icon icon="list-ul" class="listIcon leftIconOffset" size="2x" />LISTS
        </div>
        <div
          class="navTabs"
          id="settingsTab"
          :class="activeSection==4? 'activeNavbarSection' : 'navbarSection'"
          @click="changeSection('/settings')"
        >
          <font-awesome-icon icon="cog" class="settingsIco leftIconOffset" size="2x" />SETTINGS
        </div>
        <div class="logoutButton">
          <button @click="logOut()">
            <font-awesome-icon icon="power-off" class="homeIcon" size="3x" />
            <h1>LOG OUT</h1>
          </button>
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
import SplashPage from "./components/SplashPage.vue";
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
      if (this.currentUser.id > 0) {
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
  margin-left: 4.5vh;
  /* opacity: 0.8; */
}
.activeNavbarSection {
  font-weight: bold;
  margin-left: 1vh;
}
.notification {
  background: red;
  position: absolute;
  border-radius: 50%;
  width: 1.5vw;
  height: 1.5vw;
  margin-top: -2.5vh;
}

.navTabs {
  color: white;
  font-size: 1.6vw;
  line-height: 15vh;
  text-align: center;
  font-family: "Alata", sans-serif;
  padding-top: 2vh;
  /* margin-left: 4vh; */
  height: 15vh;

  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  /* border-bottom: solid 1.5px white; */
}

#homeTab {
  /* margin-top: 0.5vh; */
  background: rgb(78, 119, 233);  /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right, 
    rgb(182, 233, 248), 
    rgb(124, 148, 228)
  );  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right, 
    rgb(153, 223, 245), 
    rgb(78, 119, 233)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#messengerTab {
  /* background: #11998e;
  background: -webkit-linear-gradient(
    to right,
    #38ef7d,
    #11998e
  ); 
  background: linear-gradient(
    to right,
    #38ef7d,
    #11998e
  );  */

 background: #9796f0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #bbb9fc,
    #693dbb
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #bbb9fc,
    #693dbb
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* background: #ee9ca7; 
background: -webkit-linear-gradient(to right, #fcc9cf, #fc6b7e);  
background: linear-gradient(to right, #fcc9cf, #fc6b7e);  */
}

#calendarTab {
  /* background: #f12711; 
  background: -webkit-linear-gradient(
    to right,
    #f5af19,
    #f12711
  ); /
  /* background: linear-gradient(
    to right,
    #f5af19,
    #f12711
  ); 
  /* background: #FDC830; 
background: -webkit-linear-gradient(to left, #F37335, #FDC830);  
background: linear-gradient(to left, #F37335, #FDC830);  */
 background: rgb(0, 167, 69);  /* fallback for old browsers */
background: -webkit-linear-gradient(
  to right, 
  rgb(139, 247, 150), 
  rgb(0, 167, 69)
  );  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(
  to right, 
  rgb(139, 247, 150), 
  rgb(0, 167, 69)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

#listTab {

    background: rgb(0, 155, 182);  /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right, 
    rgb(190, 239, 248),
    rgb(23, 185, 214)
  );  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right, 
    rgb(159, 236, 252),
    rgb(0, 155, 182)
  ); 

}

#settingsTab {

  background: #fc2222;  /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right, 
    #ffa3a3, 
    #fc2222
  );  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right, 
    #ffa3a3, 
    #fc2222
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.leftIconOffset {
  margin-right: 0.5vw;
}
.rightIconOffset {
  margin-left: 0.5vw;
}
.whiteIcon {
  color: white;
}

/* Vue Transition CSS */

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.logoutButton button {
  background: white;
  border: none;
  color: #404040;
  text-decoration: none;
  line-height: 1vh;
  text-align: center;
  margin-left: 40%;
  margin-top: 10%;
}

.logoutButton h1 {
  font-size: 1vw;
  color: #404040;
  margin-top: 1vh;
  /* clear:both; */
  font-family: 'Alata';
  display: inline-block;
  white-space: nowrap;
}
</style>
