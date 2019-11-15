<template>
  <div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="dayHeader">
      <div class="smallDayCol">
        <button class="dayButton">Save</button>
      </div>
      <div class="largeDayCol">
        <h2>Edit Event</h2>
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
      <div class="eventCreatedBy">Event created by {{createdBy}}.</div>
      <!-- <div class="outerEventDeleteDiv">
        <div class="eventDeleteOffsetDiv"></div> -->
        <div class="eventDeleteDiv">
          <button class="eventDeleteButton" @click="closeWindow()">Delete</button>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: "EditEvent",
  components: {
    // List of all components used in this component
  },
  props: {
    // List of data passed in from parent component
    event: {
        type: Object,
        required: true
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
      description: ""
    };
  },
  created() {
      this.name = this.event.name;
      this.date = "2019-" + this.month+1 + "-" + this.day+1;
      this.allDay = this.event.allDay;
      this.startTime = this.event.startTime;
      this.endTime = this.event.endTime;
      this.description = this.event.description;
  },
  computed: {
    // Computed variables
    ...mapGetters({
        users: "getUsers"
    }),
    createdBy: function() {
        let name = null;
        for (let i=0; i<this.users.length && name==null; i++) {
            if (this.users[i].id == this.event.createdBy) {
                name = this.users[i].name;
            }
        }
        return name;
    }
  },
  methods: {
    // Methods in this component
    closeWindow() {
        this.$store.dispatch("setSelectedEvent",-1)
    },
    deleteEvent() {

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
.eventCreatedBy {
  margin-top: 5vh;
}
/* .outerEventDeleteDiv {
  height: 10vh;
  width: 100%;
} */
/* .eventDeleteDiv {
  float: left;
  height: 10vh;
  width: 80%;
} */
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
