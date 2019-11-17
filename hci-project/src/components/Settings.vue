<template>
  <div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="settingsBG"></div>

    <div class="settingsHead">
      <h1>Change Settings</h1>
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

      <!-- Family code -->
      <div class="familyCode">
        <h2>
          Family code:
          <br />
          <div class="code">HN21Z77</div>
        </h2>
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

.settingsLink {
  display: block;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
}
.familyCode {
  margin-left: 0%;
  text-align: center;
}
.code {
  width: 20%;
  font-size: 3.5vw;
  margin-left: 40%;
  border: 1px solid black;
}
.settingsHead {
  text-align: center;
}
.settingsBody {
  margin-left: 5%;
  text-align: justify;
}
.profileImg {
  width: 10%;
  height: 10%;
  border-radius: 50%;
}
</style>
