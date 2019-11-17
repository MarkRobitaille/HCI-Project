<template>
  <div :class="calendar">
    <transition name="fade">
      <div
        class="fadeOut"
        v-if="calendarState.selectedDay>=0 || calendarState.addEvent"
        @click="clearDay()"
      ></div>
    </transition>

    <div class="header">
      <h1>2019</h1>
      <!-- To change size of icons add size="whatever", you can reference the sizes here: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons -->
      <button class="addEventButton" @click="addEvent()">
        Add Event
        <font-awesome-icon icon="plus" class="rightIconOffset" />
      </button>
    </div>
    <div class="table">
      <div class="topCalendarHeader">
        <div class="prevButtonHeader topLeftCalendar">
          <button class="prevNextMonthButton" @click="setPrevMonth()">
            <font-awesome-icon icon="angle-left" class="leftIconOffset" />Prev
          </button>
        </div>
        <div colspan="5" class="monthHeader">{{calendar[calendarState.selectedMonth].name}}</div>
        <div class="nextButtonHeader topRightCalendar">
          <button class="prevNextMonthButton" @click="setNextMonth()">
            Next
            <font-awesome-icon icon="angle-right" class="rightIconOffset" />
          </button>
        </div>
      </div>
      <div class="weekdayHeader">
        <div class="weekdayDiv">
          <div class="weekdayInnerDiv">Sunday</div>
        </div>
        <div class="weekdayDiv">
          <div class="weekdayInnerDiv">Monday</div>
        </div>
        <div class="weekdayDiv">
          <div class="weekdayInnerDiv">Tuesday</div>
        </div>
        <div class="weekdayDiv">
          <div class="weekdayInnerDiv">Wednesday</div>
        </div>
        <div class="weekdayDiv">
          <div class="weekdayInnerDiv">Thursday</div>
        </div>
        <div class="weekdayDiv">
          <div class="weekdayInnerDiv">Friday</div>
        </div>
        <div class="weekdayDiv">
          <div class="weekdayInnerDiv">Saturday</div>
        </div>
      </div>
      <div v-for="i in 6" :key="i" :class="i==6? 'weekDiv bottomCalendar' : 'weekDiv'">
        <div
          v-for="j in 7"
          :key="i+ '' +j"
          :class="{'dayDiv': true, 'inactiveDay': (i-1)*7+j<=calendar[calendarState.selectedMonth].offset || 
            (i-1)*7+(j-1)>=calendar[calendarState.selectedMonth].offset + calendar[calendarState.selectedMonth].days.length, 
            'today': calendarState.selectedMonth == today.month && (i-1)*7+j-1-calendar[calendarState.selectedMonth].offset == today.day,
            'bottomLeftCalendar': i==6 && j==1, 'bottomRightCalendar': i==6 && j==7}"
          @click="selectDay((i-1)*7+(j-1)-calendar[calendarState.selectedMonth].offset);"
        >
          <CalendarDate
            v-if="(i-1)*7+j>calendar[calendarState.selectedMonth].offset && 
            (i-1)*7+(j-1)<calendar[calendarState.selectedMonth].offset + calendar[calendarState.selectedMonth].days.length"
            :day="calendar[calendarState.selectedMonth].days[(i-1)*7+(j-1)-calendar[calendarState.selectedMonth].offset]"
            class="dateInfo"
          ></CalendarDate>
        </div>
      </div>
    </div>

    <CalendarDayView
      v-if="calendarState.selectedDay>=0"
      :day="calendar[calendarState.selectedMonth].days[calendarState.selectedDay]"
      :monthName="calendar[calendarState.selectedMonth].name"
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
    this.currDate = new Date();
    this.$store.dispatch("setSelectedMonth", this.today.month);
  },
  computed: {
    // Computed variables
    ...mapGetters({
      calendar: "getCalendar",
      today: "getToday",
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
    setPrevMonth() {
      this.$store.dispatch("setPrevMonth");
    },
    setNextMonth() {
      this.$store.dispatch("setNextMonth");
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
  opacity: 0.5;
  z-index: 2;
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
  margin-top: 2.5vh;
  margin-bottom: calc(2.5vh - 2px);
  margin-left: auto;
  margin-right: auto;
  background-color: bisque;
  border: solid 1px black;
  border-radius: 20px;
}

th,
td {
  border: 0.1vw solid black;
}

td {
  overflow: hidden;
}

.topCalendarHeader {
  height: 10vh;
  width: 100%;
}

.prevNextMonthButton {
  vertical-align: middle;
  margin-top: 2.5vh;
  min-height: 20px;
  height: 5vh;
}

.monthHeader {
  font-size: 5vh;
  text-align: center;
  text-transform: uppercase;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;

  height: 5vh;
  vertical-align: middle;
  background-color: #bce7f7;
  width: calc(100% / 7 * 5);
  float: left;
}

.prevButtonHeader {
  background-color: #bce7f7;
  height: 10vh;
  width: calc(100% / 7);
  float: left;
}

.nextButtonHeader {
  height: 10vh;
  border-left: 0;
  background-color: #bce7f7;
  width: calc(100% / 7);
  float: left;
}

.weekdayHeader {
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  background-color: lightgreen;
  width: 100%;
  height: calc(5vh - 2px);
  text-align: center;
  text-transform: uppercase;
  padding: 0;
}

.weekdayDiv {
  float: left;
  height: calc(5vh - 2px);
  width: calc(100% / 7);
  background-color: teal;
}

.weekdayInnerDiv {
  padding-top: calc(2.5vh - 10px);
}

.weekDiv {
  background-color: #def5fc;
  height: calc(70vh / 6);
  width: 100%;
}
.dayDiv {
  height: calc(70vh / 6);
  width: calc(100% / 7);
  float: left;
  overflow: hidden;
  z-index: 0;
}

.topLeftCalendar {
  border-top-left-radius: 20px;
}

.topRightCalendar {
  border-top-right-radius: 20px;
}

.bottomLeftCalendar {
  border-bottom-left-radius: 20px;
}

.bottomRightCalendar {
  border-bottom-right-radius: 20px;
}

.bottomCalendar {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.today {
  background-color: turquoise;
}

.inactiveDay {
  background-color: lightgrey;
  color: lightgray;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
</style>
