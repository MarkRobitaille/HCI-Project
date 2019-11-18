<template>
  <div class="home"> <!-- Can only have 1 parent element in a component -->
    <div class="homeBG"></div>

    <img src="../assets/FamilyPic.png" alt="Family image" class="homePageImage">
    <p class="welcomeMessage">Welcome, {{currentUser.name}}!</p>
    <p class="dateMessage">Today is {{formattedToday}}.</p>

    <div class="notifs">
      <a href="#/Calendar" class="calendarNotifs"><strong>{{eventsTodayStr}}</strong></a>
      <br/>
      <a href="#/Messenger" class="messageNotifs"><strong>{{conversationsStr}}</strong></a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: 'Home',
  data() { // List of local data in this component
    return {
        // Variables go in here
        todayDate: null,
        formattedDate: "",
        eventsToday: 0
    }
  },
  created() {
    this.todayDate = new Date();
  },
  computed: { // Computed variables 
    ...mapGetters({
      currentUser: "getCurrentUser",
      calendar: 'getCalendar',
      today: 'getToday',
      unreadMessageCount: "getUnreadMessageCount"
    }),
    formattedToday: function () {
      return this.todayDate.toDateString();
    },
    eventsTodayStr: function () {
      let eventsToday = this.calendar[this.today.month].days[this.today.day].events.length;
      let str;

      if (eventsToday<=0) {
        str = "No events today";
      } else if (eventsToday==0) {
        str = "1 event today";
      } else {
        str = eventsToday + " events today";
      }

      return str;
    },
    conversationsStr: function () {
      let str;

      if (this.unreadMessageCount<=0) {
        str = "No new messages";
      } else if (this.unreadMessageCount==0) {
        str = "1 unread conversation";
      } else {
        str = this.unreadMessageCount + " unread conversation";
      }

      return str;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>

  @import url('https://fonts.googleapis.com/css?family=Alata|Roboto&display=swap');
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
/* .header {
  background: white;
  border-bottom: solid 1px #ededed;
  height: 10vh;
  color: black;
  padding-bottom: 2.5vh;
} */

.home{
  text-align:center;
  margin-bottom: 10vh;
}

.homeBG{
  z-index: -1;
  height: 100vh;
  width: 100%;
  position: fixed;
   background: rgb(78, 119, 233);  /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left, 
    rgb(182, 233, 248), 
    rgb(124, 148, 228)
  );  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left, 
    rgb(153, 223, 245), 
    rgb(78, 119, 233)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.homePageImage{
  margin-top: 10vh;
  width: 20%;
  height: auto;
  border-radius: 50%;
  /* border: 1px solid white; */
}
.welcomeMessage{
  font-family:'Alata', sans-serif;
  color:white;
  font-size: 5vw;
  margin-top: 1vh;
  text-align: center;
  margin-bottom: 1vh;
}
.dateMessage{
  font-family: 'Roboto', sans-serif;
  color:white;
  font-size: 2vw;
  text-align: center;
  margin-top: 1vh;
  margin-bottom: 3vh;
  /* margin-left: calc(50% - 23%); */
}
.calendarNotifs, .messageNotifs{
  font-family: 'Roboto', sans-serif;
  font-size: 2vw;
  color: rgb(56, 59, 59);
  margin-bottom: 1vh;
  margin-top: 1vh;
}

a {
  text-decoration: none;
}

.notifs{
  background: rgb(255, 255, 255, 0.6);
  margin-top: 1vh;
  /* margin-bottom: 1vh; */
  margin-left: calc(50% - 22.5%);
  width: 45%;
  padding-top: 3vh;
  padding-bottom: 3vh;
  border-radius: 25px;
}

</style>
