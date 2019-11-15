<template>
  <div class="sideWindow">
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="dayHeader">
      <div class="smallDayCol">
        <button class="dayButton">Create</button>
      </div>
      <div class="largeDayCol">
        <h2>Add Event</h2>
      </div>
      <div class="smallDayCol">
        <button class="dayButton" @click="closeWindow()">Cancel</button>
      </div>
    </div>

    <div class="eventDetails">
      <div class="eventInput">
        <div class="mediumDayCol">
          <div class="eventInputLabel">Name:</div>
        </div>
        <div class="largeDayCol">
          <input v-model="name" class="eventInputField" type="text">
        </div>
      </div>
      <div class="eventInput">
        <div class="mediumDayCol">
          <div class="eventInputLabel">Date:</div>
        </div>
        <div class="largeDayCol">
          <input v-model="date" class="eventInputField" type="date" />
        </div>
      </div>
      <div class="eventInput">
        <div class="mediumDayCol">
          <div class="eventInputLabel">All Day Event:</div>
        </div>
        <div class="largeDayCol">
          <input v-model="allDay" class="checkbox" type="checkbox" />
        </div>
      </div>
      <div class="eventInput">
        <div class="mediumDayCol">
          <div class="eventInputLabel">Start Time:</div>
        </div>
        <div class="largeDayCol">
          <input v-model="startTime" :disabled="allDay" class="eventInputField" type="time" />
        </div>
      </div>
      <div class="eventInput">
        <div class="mediumDayCol">
          <div class="eventInputLabel">End Time:</div>
        </div>
        <div class="largeDayCol">
          <input v-model="endTime" :disabled="allDay" class="eventInputField" type="time" />
        </div>
      </div>
      <div class="eventInput">
        <div class="mediumDayCol">
          <div class="eventInputLabel">Description:</div>
        </div>
        <div class="largeDayCol">
          <textarea v-model="description" id="eventDescription" class="eventInputField" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: "AddEvent",
  components: {
    // List of all components used in this component
  },
  props: {
    // List of data passed in from parent component
    month: {
      type: Number,
      required: false
    },
    day: {
      type: Number,
      required: false
    }
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
      name: "",
      date: "",
      allDay: false,
      startTime: "",
      endTime: "",
      description: ""
    };
  },
  created() {
      // Determine passed in date and month
      if (this.day!=undefined && this.day!=null && this.day>=0) {
          this.date = "2019-" + this.month+1 + "-" + this.day+1;
      }
  },
  computed: {
    // Computed variables
  },
  methods: {
    // Methods in this component
    closeWindow() {
      this.$store.dispatch("setAddEvent", false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
/* Include the padding and border in an element's total width and height */
.sideWindow {
  position: fixed;
  width: 25%;
  height: 100vh;
  right: 0;
  top: 0;
  z-index: 10;
  background-color: lightcoral;
}
.dayHeader {
  height: 15vh;
  width: 100%;
}
.smallDayCol {
  width: 20%;
  float: left;
  height: 10vh;
}
.mediumDayCol {
  width: 40%;
  float: left;
  height: 10vh;
}
.largeDayCol {
  width: 60%;
  float: left;
  height: 10vh;
}
.xLargeDayCol {
  width: 80%;
  float: left;
  height: 10vh;
}
.dayButton {
  margin-top: 3.5vh;
}
.eventDetails {
  width: 100%;
}
.eventInput {
  height: 10vh;
  text-align: right;
  /* vertical-align: middle; */
  /* padding: 5%; */
  padding-left: 5%;
  padding-right: 5%;
  /* margin-left:auto; 
  margin-right:0; */
}
.eventInputField {
  vertical-align: middle;
  width: 100%;
}
.eventInputLabel {
  margin-right: 5%;
}
.checkbox {
  float: left;
}
</style>
