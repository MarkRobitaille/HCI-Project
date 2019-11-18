<template>
  <div class="sideWindow">
    <div v-if="calendarState.selectedEvent<0">
      <div class="outerDayViewCloseDiv">
        <div class="dayViewOffsetDiv"></div>
        <div class="dayViewCloseDiv">
          <button class="dayViewCloseButton" @click="closeWindow()">Close</button>
        </div>
      </div>

      <div class="dayHeader">
        <div class="smallDayCol">
          <button class="dayButton" @click="setPrevDay()">Prev</button>
        </div>
        <div class="largeDayCol eventHeader">
          <h2 class="eventTitleHeader">{{monthName}} {{day.number}}, 2019</h2>
        </div>
        <div class="smallDayCol">
          <button class="dayButton" @click="setNextDay()">Next</button>
        </div>
      </div>
      <div class="eventsHeader">
        <div class="largeDayCol">
          <h3 class="eventsTitleHeader">Events:</h3>
        </div>
        <div class="mediumDayCol">
          <button class="windowAddEventButton" @click="addEvent()">Add Event</button>
        </div>
      </div>
      <div class="eventList">
        <div
          v-for="(item, index) in day.events"
          :key="index"
          @click="editEvent(index)"
          class="largeEventBlobDiv"
        >
          <EventBlob
            :event="item"
            :size="3"
            :month="calendarState.selectedMonth"
            :day="calendarState.selectedDay"
          ></EventBlob>
        </div>
      </div>
    </div>

    <div v-else>
      <EditEvent
        :events="day.events"
        :eventIndex="calendarState.selectedEvent"
        :month="calendarState.selectedMonth"
        :day="calendarState.selectedDay"
      ></EditEvent>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store
import EventBlob from "./EventBlob.vue";
import EditEvent from "./EditEvent.vue";

export default {
  name: "CalendarDayView",
  components: {
    // List of all components used in this component
    EventBlob,
    EditEvent
  },
  props: {
    // List of data passed in from parent component
    day: {
      Type: Object,
      required: true
    },
    monthName: {
      Type: String,
      required: true
    }
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
      calendarState: "getCalendarState"
    })
  },
  methods: {
    // Methods in this component
    closeWindow() {
      this.$store.dispatch("setSelectedDay", -1);
    },
    setPrevDay() {
      this.$store.dispatch("setPrevDay");
    },
    setNextDay() {
      this.$store.dispatch("setNextDay");
    },
    addEvent() {
      this.$store.dispatch("setAddEvent", true);
    },
    editEvent(index) {
      console.log("Test edit button " + index);
      this.$store.dispatch("setSelectedEvent", index);
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
  width: 35%;
  height: 100vh;
  right: 0;
  top: 0;
  z-index: 5;
  background-color:   rgb(0, 167, 69);
  color:white;
}

button{
  background: none;
  border: none;
  color:white;
  color: f12711;
  font-size: 1.5vw;

}

.outerDayViewCloseDiv {
  height: 10vh;
  width: 100%;
}
.dayViewOffsetDiv {
  float: left;
  height: 10vh;
  width: 80%;
}
.dayViewCloseDiv {
  float: left;
  height: 10vh;
  width: 20%;
}
.dayViewCloseButton {
  margin-top: 3.5vh;
}
.dayHeader {
  height: 15vh;
  width: 100%;
}
.eventsHeader {
  height: 10vh;
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
.dayButton {
  margin-top: 35%;
}
.windowAddEventButton {
  margin-top: 10%;
}
.eventList {
  width: 100%;
  height: 65vh;
  background: palegoldenrod;
  overflow-y: auto;
}
.largeEventBlobDiv {
  height: 15%;
  margin: 5%;
}
.eventTitleHeader {
  padding-top: calc(6vh - 24px);
}
.eventsTitleHeader {
  /* Just fiddled with it till it looked right, feel free to change */
  padding-top: calc(3vh - 24px);
}
</style>
