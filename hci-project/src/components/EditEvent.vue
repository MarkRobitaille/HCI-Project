<template>
  <div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="dayHeader">
      <div class="smallDayCol">
        <button class="dayButton" @click="updateEvent()">Save</button>
      </div>
      <div class="largeDayCol eventTitleHeader">
        <h2>Edit Event</h2>
      </div>
      <div class="smallDayCol">
        <button class="dayButton" @click="closeWindow()">Cancel</button>
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
      <div class="eventCreatedBy">Event created by {{createdBy}}.</div>
      <!-- <div class="outerEventDeleteDiv">
      <div class="eventDeleteOffsetDiv"></div>-->
      <div class="eventDeleteDiv">
        <button class="eventDeleteButton" @click="deleteEvent()">Delete<font-awesome-icon icon="trash" class="rightIconOffset"/></button>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "EditEvent",
  components: {
    // List of all components used in this component
    ErrorMessage
  },
  props: {
    // List of data passed in from parent component
    events: {
      type: Array,
      required: true
    },
    eventIndex: {
      type: Number,
      required: false
    },
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
    this.name = this.events[this.eventIndex].name;
    let monthStr = "" + (this.month + 1);
      if (monthStr.length==1) {
        monthStr = "0" + monthStr;
      }
      let dayStr = "" + (this.day + 1);
      if (monthStr.length==1) {
        dayStr = "0" + dayStr;
      }
      this.date = "2019-" + monthStr + "-" + dayStr;
    this.allDay = this.events[this.eventIndex].allDay;
    this.startTime = this.events[this.eventIndex].startTime;
    this.endTime = this.events[this.eventIndex].endTime;
    this.description = this.events[this.eventIndex].description;
  },
  computed: {
    // Computed variables
    ...mapGetters({
      users: "getUsers"
    }),
    createdBy: function() {
      let name = null;
      for (let i = 0; i < this.users.length && name == null; i++) {
        if (this.users[i].id == this.events[this.eventIndex].createdBy) {
          name = this.users[i].name;
        }
      }
      return name;
    }
  },
  methods: {
    // Methods in this component
    closeWindow() {
      this.$store.dispatch("setSelectedEvent", -1);
    },
    deleteEvent() {
      // Remove original event by calling vuex store function
      this.$store.dispatch("removeEvent", {
        month: this.month,
        day: this.day,
        event: this.eventIndex
      });
      this.$store.dispatch("setSelectedEvent",-1); // Close Edit Event window
    },
    updateEvent() {
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

        // Remove original event by calling vuex store function
        this.$store.dispatch("removeEvent", {
          month: this.month,
          day: this.day,
          event: this.eventIndex
        });

        if (eventDate.getFullYear() == "2019") {
          // Calendar only has 2019, so ignore if not that year
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
        this.$store.dispatch("setSelectedEvent",-1); // Close Edit Event window
      }
    },
    inputCheck() {
      // If you find a more general error, ignore more specific ones

      // Error 4 - No event name
      if (this.name == "") {
        console.log("Error 4 found");
        this.errorType = 4;
      }

      // Error 5 - No date selected
      if (this.errorType < 0 && this.date == "") {
        console.log("Error 5 found");
        this.errorType = 5;
      }

      // Error 6 - Only one of start and end time
      if (
        this.errorType < 0 &&
        !this.allDay &&
        ((this.startTime != "" && this.endTime == "") ||
          (this.startTime == "" && this.endTime != ""))
      ) {
        console.log("Error 6 found");
        this.errorType = 6;
      }

      // Error 7 - Start time after end time
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
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
/* Include the padding and border in an element's total width and height */
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
.eventTitleHeader {
  padding-top: calc(5vh - 24px);
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
  padding-left: 5%;
  padding-right: 5%;
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
.eventCreatedBy {
  margin-top: 5vh;
}
.eventDeleteDiv {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 10vh;
  width: 20%;
}
.eventDeleteButton {
  margin-bottom: 3.5vh;
}
</style>
