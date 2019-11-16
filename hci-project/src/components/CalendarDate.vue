<template>
  <div class="date">
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="dateNumber">{{day.number}}</div>
    <div class="eventsWrapper"> 
    <div
      v-for="(item, index) in day.events"
      :key="index"
      :class="day.events.length>2? 'smallEventBlobDiv' : 'mediumEventBlobDiv'"
    >
      <EventBlob :event="item" :size="day.events.length>2? 1 : 2"></EventBlob>
    </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store
import EventBlob from "./EventBlob";

export default {
  name: "CalendarDate",
  components: {
    // List of all components used in this component
    EventBlob
  },
  props: {
    // List of data passed in from parent component
    day: {
      type: Object,
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
/* Include the padding and border in an element's total width and height */
.date {
  height: 100%;
  width: 100%;
  text-align: left;
  /* height: calc(70 / 6) vh; */
  overflow: hidden;
}
.dateNumber {
  margin-left: 5%;
  margin-top: 5%;
  margin-right: auto;
}

.eventsWrapper{
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
}

.smallEventBlobDiv {
  height: 10%;
  min-height: 18px;
  width: 15%;
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
  margin-bottom: 2%;
  float: left;
  min-width: 14px;
}

.mediumEventBlobDiv {
  height: 10%;
  margin-top: 2%;
  margin-bottom: 2%;
  overflow: hidden;
}
</style>
