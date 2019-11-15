<template>
  <div> <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="header">
      <h1>Home</h1>
    </div>
    <img src="../assets/FamilyPic.png" alt="Family image" class="homePageImage">
    <p class="welcomeMessage">Welcome, Bobby!</p>
    <p class="dateMessage">Today is October 25, 2019</p>
    <a href="#/Calendar" class="calendarNotifs"><strong>3 Events today</strong></a>
    <br/>
    <a href="#/Messenger" class="messageNotifs"><strong>1 unread conversation</strong></a>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: 'Home',
  components: { // List of all components used in this component

  },
  props: { // List of data passed in from parent component

  },
  data() { // List of local data in this component
    return {
        // Variables go in here
    }
  },
  computed: { // Computed variables 

  },
  methods: { // Methods in this component

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
.header {
  background: white;
  border-bottom: solid 1px #ededed;
  height: 10vh;
  color: black;
  padding-bottom: 2.5vh;
}
.homePageImage{
  margin-top: 2vh;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  border: 2px solid black
}
.welcomeMessage{
  font-size: 4vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
}
.dateMessage{
  font-size: 3vw;
  margin-top: 1vh;
  margin-bottom: 3vh;
}
.calendarNotifs, .messageNotifs{
  font-size: 2vw;
  margin-bottom: 1vh;
  margin-top: 1vh;
}
</style>
