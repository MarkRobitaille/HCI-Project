<template>
  <div :class="calendar">
    <!-- Add fade transition here -->
    <div
      class="fadeOut"
      v-if="calendarState.selectedDay>=0 || calendarState.addEvent"
      @click="clearDay()"
    ></div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="header">
      <h1>Calendar</h1>
      <button class="addEventButton" @click="addEvent()">Add Event</button>
    </div>

    <table class="table">
      <!-- Month Name and prev, next buttons -->
      <tr>
        <th class="prevButtonHeader">
          <button class="prevNextMonthButton" @click="setPrevMonth()">Prev</button>
        </th>
        <th colspan="5" class="monthHeader">{{calendar[calendarState.selectedMonth].name}}</th>
        <th class="nextButtonHeader">
          <button class="prevNextMonthButton" @click="setPrevMonth()">Next</button>
        </th>
      </tr>
      <!-- Days of the week -->
      <tr class="weekdayHeader">
        <th>Sun</th>
        <th>Mon</th>
        <th>Tues</th>
        <th>Wed</th>
        <th>Thur</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>

      <tr v-for="i in 6" :key="i" class="week">
        <td
          v-for="j in 7"
          :key="i+ '' +j"
          :class="(i-1)*7+j>calendar[calendarState.selectedMonth].offset && 
            (i-1)*7+(j-1)<calendar[calendarState.selectedMonth].offset + calendar[calendarState.selectedMonth].days.length ? '' : 'inactiveDay'"
          @click="selectDay((i-1)*7+(j-1)-calendar[calendarState.selectedMonth].offset)"
        >
          <!-- selectedMonth == currDate.getMonth() && (i-1)*7+(j-1) == currDate.getDay()? 'today' : ''"" -->
          <CalendarDate
            v-if="(i-1)*7+j>calendar[calendarState.selectedMonth].offset && 
            (i-1)*7+(j-1)<calendar[calendarState.selectedMonth].offset + calendar[calendarState.selectedMonth].days.length"
            :day="calendar[calendarState.selectedMonth].days[(i-1)*7+(j-1)-calendar[calendarState.selectedMonth].offset]"
          ></CalendarDate>
        </td>
      </tr>
    </table>

    <CalendarDayView
      v-if="calendarState.selectedDay>=0"
      :day="calendar[calendarState.selectedMonth].days[calendarState.selectedDay]"
    ></CalendarDayView>

    <AddEvent
      v-if="calendarState.addEvent"
      :month="calendarState.selectedMonth"
      :day="calendarState.selectedDay"
    ></AddEvent>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store
import CalendarDate from "./CalendarDate";
import CalendarDayView from "./CalendarDayView";
import AddEvent from "./AddEvent";

export default {
  name: "Calendar",
  components: {
    // List of all components used in this component
    CalendarDate,
    CalendarDayView,
    AddEvent
  },
  created() {
    // console.log(this.calendar[this.selectedMonthIndex].offset + this.calendar[this.selectedMonthIndex].days.length);
    this.currDate = new Date();
    // this.$store.dispatch("setSelectedMonth", this.currDate.getMonth());
  },
  props: {
    // List of data passed in from parent component
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
      // selectedMonthIndex: 0,
      // selectedDayIndex: -1,
      currDate: null
    };
  },
  watch: {
    "calendarState.selectedMonth": function() {
      this.clearDay();
    }
    // selectedDayIndex: function () {
    //   this.selectedDayIndex = 0;
    // },
  },
  computed: {
    // Computed variables
    ...mapGetters({
      calendar: "getCalendar",
      calendarState: "getCalendarState"
    })
  },
  methods: {
    // Methods in this component
    selectDay(day) {
      if (
        day >= 0 &&
        day < this.calendar[this.calendarState.selectedMonth].days.length
      ) {
        // this.selectedDayIndex = day;
        this.$store.dispatch("setSelectedDay", day);
      }
    },
    clearDay() {
      console.log("Clearing day");
      // this.selectedDayIndex = -1;
      this.$store.dispatch("setSelectedDay", -1);
      this.$store.dispatch("setSelectedEvent", -1);
      this.$store.dispatch("setAddEvent", false);
    },
    addEvent() {
      this.$store.dispatch("setAddEvent", true);
    },
    setPrevMonth() {},
    setNextMonth() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
.calendar {
  z-index: 0;
}

.fadeOut {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

.header {
  height: 10vh;
  color: black;
}

.addEventButton {
  position: absolute;
  right: 5vh;
  top: 4vh;
  min-height: 20px;
  height: 5vh;
}

.table {
  height: 85vh;
  width: 99%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  margin-left: auto;
  margin-right: auto;
}

th,
td {
  border: 0.1vw solid black;
}

.prevNextMonthButton {
  vertical-align: middle;
  min-height: 20px;
  height: 5vh;
}

.monthHeader {
  font-size: 5vh;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
  height: 10vh;
  vertical-align: middle;
  border-left: 0;
  border-right: 0;
  background-color: #bce7f7;
}

.prevButtonHeader {
  border-right: 0;
  background-color: #bce7f7;
}

.nextButtonHeader {
  border-left: 0;
  background-color: #bce7f7;
}

.weekdayHeader {
  background-color: #def5fc;
  height: 5vh;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
}

.week {
  background-color: #def5fc;
  height: calc(70 / 6) vh;
}

.inactiveDay {
  background-color: lightgrey;
  color: lightgray;
}
</style>
