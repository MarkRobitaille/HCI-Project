<template>
  <div class="settingsBacksplash">
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <h1>SETTINGS</h1>
    <div class="settingsBG">

    <div class="settingsHead">
      <!-- <h1>SETTINGS</h1> -->
    </div>

    <div class="settingsBody">
      <!-- General Profile Settings -->
      <!-- Make the name customize for who's profile you're in -->
      <h2>{{currentUser.name}}'s Profile</h2>
      <img
        :src="require('../assets/' + currentUser.image)"
        alt="Profile picture"
        class="profileImg"
      />
      <h3>
        <a href="#/settings" class="settingsLink">Change profile picture</a>
        <a href="#/settings" class="settingsLink">Change email</a>
        <a href="#/settings" class="settingsLink">Change name</a>
        <a href="#/settings" class="settingsLink">Change password</a>
      </h3>

      <!-- Calendar Settings -->
      <h2>Calendar</h2>
      <h3>
        <div class="settingsLink">
          <a href="#/settings">Change calendar color</a>
        </div>
        <div class="settingsLink">
          <a href="#/settings">Change calendar icon</a>
        </div>
      </h3>
</div>
      <!-- Family code -->
      <div class="familyCode">
        <h2 >
          Family code:
          <br />
          </h2>
          <div class="code">HN21Z77</div>
        <!-- </h2> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store

export default {
  name: "Settings",
  components: {
    // List of all components used in this component
  },
  props: {
    // List of data passed in from parent component
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
    };
  },
  computed: {
    // Computed variables
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },
  methods: {
    // Methods in this component
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */

.settingsBacksplash{
  background: #F37335;
  height: 100vh;
  /* padding-top:2%; */
}

.settingsBody h2{
  font-size: 2vw;
}

.settingsBG{
  background:white;
  margin-left: 2%;
  margin-right: 2%;
  /* margin-top:-5%; */
  padding-top: 3%;
  margin-bottom:2%;
  width: 96%;
  height: 78%;
  font-family: 'Roboto';
}

.settingsLink {
  display: block;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
}

.familyCode h2 {
  margin-left: 48%;
  text-align: center;
  margin-top: -25%;
  color:black;
  margin-bottom: 2vh;
  /* border: 1px solid black; */
}

.code {
  width: 20%;
  font-size: 3.5vw;
  margin-left: 49%;
  border: 1px solid black;
  /* margin-top: 1vh; */
  padding: 1vh;
  display:inline;
  color:black;
}
.settingsBacksplash h1{
  text-align: center;
  color:white;
  font-family: 'Alata';
}
.settingsBody {
  /* margin-top: 5%; */
  margin-left: 5%;
  text-align: justify;
  font-size: 1vw;
  color:black;
}
.profileImg {
  width: 10%;
  height: 10%;
  border-radius: 50%;
}

a{
  color:rgb(206, 90, 33);
}

</style>
