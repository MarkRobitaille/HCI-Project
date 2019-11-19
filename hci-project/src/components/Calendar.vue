<template>
  <div class="BG">
    <!-- <div class="BG"> </div> -->
    <transition name="fade">
      <div
        class="fadeOut"
        v-if="calendarState.selectedDay>=0 || calendarState.addEvent"
        @click="clearDay()"
      ></div>
    </transition>

    <div class="header">
      <!-- <h1>2019</h1> -->
      <!-- To change size of icons add size="whatever", you can reference the sizes here: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons -->
      <button class="addEventButton" @click="addEvent()">
        Add Event
        <font-awesome-icon icon="plus" class="rightIconOffset" />
      </button>
    </div>
    <div class="calendar">
      <div class="table">
        <div class="topCalendarHeader">
          <div class="prevButtonHeader topLeftCalendar">
            <button class="prevNextMonthButton" @click="setPrevMonth()">
              <font-awesome-icon icon="angle-left" class="leftIconOffset" />Prev
            </button>
          </div>
          <div colspan="5" class="monthHeader">{{calendar[calendarState.selectedMonth].name}} 2019</div>
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
@import url("https://fonts.googleapis.com/css?family=Alata|Roboto&display=swap");
.BG {
  width: 100%;
  /* background: #FDC830; 
background: -webkit-linear-gradient(to right, #F37335, #FDC830); 
background: linear-gradient(to right, #F37335, #FDC830);  */
  background: rgb(0, 167, 69); /* fallback for old browsers */
  /* background: -webkit-linear-gradient(
  to left, 
  rgb(110, 255, 125), 
  rgb(0, 167, 69)
  );  
background: linear-gradient(
  to left, 
  rgb(131, 248, 143), 
  rgb(0, 172, 72)
  );  */

  /* background: #f08b17;  
  background: -webkit-linear-gradient(
    to left, 
    #ffbf77, 
    #f08b17
  );  
  background: linear-gradient(
    to left, 
    #ffbf77, 
    rgb(255, 101, 12)
  );  */
}
.calendar {
  z-index: 0;
  margin-left: 2%;
  width: 96%;
  background: none;
  height: 90vh;
  font-family: Alata;
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

button {
  background: none;
  border: none;
  color: white;
  /* color: f12711; */
  font-size: 1.5vw;
}

.header {
  height: 10vh;
  width: 100%;
  color: black;
}

.addEventButton {
  margin-top: 4vh;
  min-height: 20px;
  height: 5vh;
  position: absolute;
  right: 5vh;
  background: white;
  color:rgb(0, 167, 69);
  font-size: 1.5vw;
  border-radius: 5vw;
  outline:none;
  padding-left: 1vw;
  padding-right: 1vw;
  font-family:'Roboto';
  /* top: 4vh; */
  /* margin-top: 59%; */
  /* margin-right: 40%; */
  /* color:black; */
}

.table {
  /* height: 50%; */
  width: 100%;
  /* margin-top: 0vh; */
  /* margin-bottom: calc(2.5vh - 2px); */
  margin-left: auto;
  margin-right: auto;
  /* background: #FDC830; 
  background: -webkit-line  ar-gradient(to left, #F37335, #FDC830); 
  background: linear-gradient(to left, #F37335, #FDC830); */
  /* border: solid 2px black; */
  /* padding-top:2vh; */
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
  color: white;
}

.prevNextMonthButton {
  vertical-align: middle;
  margin-top: 2.5vh;
  min-height: 20px;
  height: 5vh;
}

.monthHeader {
  text-align: center;
  text-transform: uppercase;
  /* padding-top: 2.5vh; */
  color: white;
  padding-bottom: 2.5vh;
  margin-top: -3vh;
  font-size: 4vw;
  height: 5vh;
  /* vertical-align: middle; */
  /* background-color: #bce7f7; */
  width: calc(100% / 7 * 5);
  float: left;
}

.prevButtonHeader {
  /* background-color: #bce7f7; */
  height: 10vh;
  width: calc(100% / 7);
  float: left;
}

.nextButtonHeader {
  height: 10vh;
  border-left: 0;
  /* background-color: #bce7f7; */
  width: calc(100% / 7);
  float: left;
}

.weekdayHeader {
  /* border-top: solid 1px black; */
  border: solid 0.5px black;
  background-color: #303030;
  background-color: none;
  font-size: 1vw;
  width: 100%;
  height: calc(5vh - 2px);
  text-align: center;
  text-transform: uppercase;
  /* color:white; */
  padding: 0;
}

.weekdayDiv {
  float: left;
  color: white;
  margin-top: 0.2vh;
  height: calc(5vh - 2px);
  width: calc(100% / 7);
  /* background-color: teal; */
  /* background-color: white; */
  background-color: none;
  /* color:white; */
  font-weight: bold;
  font-family: "Roboto";
}

.weekdayInnerDiv {
  padding-top: calc(2.5vh - 10px);
}

.weekDiv {
  background-color: white;
  height: calc(73vh / 6);
  width: 100%;
}
.dayDiv {
  height: calc(73vh / 6);

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
  background-color: rgb(139, 247, 150);
  /* background: rgb(206, 165, 245);   */
}

.inactiveDay {
  background-color: rgb(233, 232, 232);
  /* color: rgb(248, 248, 248);; */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

h1 {
  color: white;
}
</style>
