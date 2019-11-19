<template>
  <div class="sideWindow">
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="dayHeader">
      <div class="smallDayCol">
        <button class="dayButtonCreate" @click="createEvent()">Create</button>
      </div>
      <div class="largeDayCol eventTitleHeader">
        <h2>Add Event</h2>
      </div>
      <div class="smallDayCol">
        <button class="dayButtonCancel" @click="closeWindow()">Cancel</button>
      </div>
    </div>

    <div class="eventDetails">
      <div v-if="errorType>0" class="errorField">
        <ErrorMessage :type="errorType" class="eventError"></ErrorMessage>
      </div>
      <div class="eventInput">
        <div class="mediumDayCol">
          <div class="eventInputLabel">Name:</div>
        </div>
        <div class="largeDayCol">
          <input v-model="name" class="eventInputField" type="text" />
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
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "AddEvent",
  components: {
    // List of all components used in this component
    ErrorMessage
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
      description: "",
      errorType: -1 // Error types 4-7 possible in Calendar
    };
  },
  created() {
    // Determine passed in date and month
    if (this.day != undefined && this.day != null && this.day >= 0) {
      let monthStr = "" + (this.month + 1);
      if (monthStr.length==1) {
        monthStr = "0" + monthStr;
      }
      let dayStr = "" + (this.day + 1);
      if (dayStr.length==1) {
        dayStr = "0" + dayStr;
      }
      this.date = "2019-" + monthStr + "-" + dayStr;
    }
  },
  computed: {
    // Computed variables
  },
  methods: {
    // Methods in this component
    closeWindow() {
      this.$store.dispatch("setAddEvent", false);
    },
    createEvent() {
      this.errorType = -1;
      // Check for errors in input
      this.inputCheck();
 
      if (this.errorType < 0) {
        // If no time information entered, assume all day event
        if (!this.allDay && this.startTime == "" && this.endTime == "") {
          this.allDay = true;
        }

        // Calculate date from string, get month and day indexes
        let eventDate = new Date(this.date + "T00:00:00");

        if (eventDate.getFullYear() == "2019") { // Calendar only has 2019, so ignore if not that year
          let monthIndex = eventDate.getMonth();
          let dayIndex = eventDate.getDate() - 1;

          // Call vuex store function to add event
          this.$store.dispatch("addEvent", {
            month: monthIndex,
            day: dayIndex,
            name: this.name,
            allDay: this.allDay,
            startTime: this.startTime,
            endTime: this.endTime,
            description: this.description
          });
        }
        this.$store.dispatch("setAddEvent", false); // Close Add Event window
      }
    },
    inputCheck() {
      // If you find a more general error, ignore more specific ones

      // Error 3 - No event name
      if (this.name == "") {
        console.log("Error 4 found");
        this.errorType = 4;
      }

      // Error 4 - No date selected
      if (this.errorType < 0 && this.date == "") {
        console.log("Error 5 found");
        this.errorType = 5;
      }

      // Error 5 - Only one of start and end time
      if (
        this.errorType < 0 && !this.allDay &&
        ((this.startTime != "" && this.endTime == "") ||
          (this.startTime == "" && this.endTime != ""))
      ) {
        console.log("Error 6 found");
        this.errorType = 6;
      }

      // Error 6 - Start time after end time
      if (this.errorType < 0 && this.startTime > this.endTime) {
        console.log("Error 7 found");
        this.errorType = 7;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Alata|Roboto&display=swap");
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
/* Include the padding and border in an element's total width and height */
.sideWindow {
  position: fixed;
  width: 35%;
  height: 100vh;
  right: 0;
  top: 0;
  z-index: 10;
  background:  rgb(0, 172, 72);  /* fallback for old browsers */
background: -webkit-linear-gradient(
  to right, 
  rgb(5, 184, 79), 
  rgb(0, 167, 69)
  );  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(
  to right, 
   rgb(5, 184, 79), 
  rgb(0, 172, 72)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color:white;
    font-family: 'Roboto';
    font-style: bold;
    font-size: 1.25vw;
}

button{
  background: rgba(255, 255, 255);
  border: none;
  color:rgb(0, 167, 69);
  /* color: #f12711; */
  font-size: 1.5vw;
  border-radius: 5vw;
  outline:none;
  padding-left: 1vw;
  padding-right: 1vw;

}

.dayButtonCreate{
    margin-left: 2vw; 
}

.dayButtonCancel{
    /* margin-right: 2.5vw; idk why this one doesnt work to move it left */
    margin-left: -2.75vw;
    color: #f12711;
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
.dayButtonCancel, .dayButtonCreate {
  margin-top: 5.5vh;
}
.eventDetails {
  width: 100%;
}
.eventTitleHeader {
  /* padding-top: calc(5vh - 24px); */
  font-family: "Alata";
  font-size: 1.7vw;
}
.errorField {
  height: 10vh;
  padding-left: 5%;
  padding-right: 5%;
}
.eventError {
  border-radius: 20px;
  padding: 0.5%;
}
.eventInput {
  height: 10vh;
  text-align: right;
  /* vertical-align: middle; */
  /* padding: 5%; */
  padding-left: 5%;
  padding-right: 20%;
  /* margin-left:auto; 
  margin-right:0; */
}
.eventInputField {
  vertical-align: middle;
  width: 13vw;
}
.eventInputLabel {
  margin-right: 5%;
}
.checkbox {
  float: left;
}

input[type=text], input[type=date], input[type=time]{
  background: white;
  height: 3vh;
  border-radius: 5vw;
  outline:none;
  padding-left: 1vw;
  padding-right: 1vw;
  box-shadow: none;
  border:none;
}

input[type=checkbox]{
  width: 2vw;
  height: 2vh;
}

input:focus{
outline: none;
}

textarea {
  background: white;
  height: 10vh;
  box-shadow: none;
  outline:none;
  border-radius: 1vw;
  outline:none;
  padding-left: 1vw;
  padding-right: 1vw;
  border:none;
}

</style>
