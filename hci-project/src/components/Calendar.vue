<template>
  <div :class="calendar">

    <div class="fadeOut" v-if="selectedDayIndex>=0" @click="clearDay()"></div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="header">
      <h1>Calendar</h1>
      <button class="addEventButton">Add Event</button>
    </div>

    <table class="table">
      <!-- Month Name and prev, next buttons -->
      <tr>
        <th class="prevButtonHeader">
          <button class="prevNextMonthButton">Prev</button>
        </th>
        <th colspan="5" class="monthHeader">November</th>
        <th class="nextButtonHeader">
          <button class="prevNextMonthButton">Next</button>
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
          :class="(i-1)*7+j>calendar[selectedMonthIndex].offset && 
            (i-1)*7+(j-1)<calendar[selectedMonthIndex].offset + calendar[selectedMonthIndex].days.length ? '' : 'inactiveDay'"
          @click="selectDay((i-1)*7+(j-1)-calendar[selectedMonthIndex].offset)"
        >
          <CalendarDate
            v-if="(i-1)*7+j>calendar[selectedMonthIndex].offset && 
            (i-1)*7+(j-1)<calendar[selectedMonthIndex].offset + calendar[selectedMonthIndex].days.length"
            :day="calendar[selectedMonthIndex].days[(i-1)*7+(j-1)-calendar[selectedMonthIndex].offset]"
          ></CalendarDate>
        </td>
      </tr>
    </table>

    <CalendarDayView
      v-if="selectedDayIndex>=0"
      :day="calendar[selectedMonthIndex].days[selectedDayIndex]"
    ></CalendarDayView>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' // Used to get data from Vuex store
import CalendarDate from './CalendarDate';
import CalendarDayView from './CalendarDayView';

export default {
  name: "Calendar",
  components: {
    // List of all components used in this component
    CalendarDate,
    CalendarDayView
  },
  created() {
    console.log(this.calendar[this.selectedMonthIndex].offset + this.calendar[this.selectedMonthIndex].days.length);
  },
  props: {
    // List of data passed in from parent component

  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
      selectedMonthIndex: 0,
      selectedDayIndex: -1
    };
  },
  watch: {
    selectedMonthIndex: function () {
      this.selectedDayIndex = -1;
    },
    // selectedDayIndex: function () {
    //   this.selectedDayIndex = 0;
    // },
  },
  computed: {
    // Computed variables
    ...mapGetters({
      calendar: 'getCalendar',
    })
  },
  methods: {
    // Methods in this component
    selectDay(day) {

      if (day >= 0 && day < this.calendar[this.selectedMonthIndex].days.length) {
        this.selectedDayIndex = day;
        this.$store.dispatch("setSelectedDate",
          {
            monthIndex: this.selectedMonthIndex,
            dayIndex: this.selectedDayIndex
          });
      }
    },
    clearDay() {
      console.log("Clearing day");
      this.selectedDayIndex = -1;
      this.selectedDayIndex
    }
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
  opacity: 0.8;
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
