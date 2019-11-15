<template>
  <div class="eventBlob">
    <div v-if="size==1" class="smallEvent">
      <div></div>
    </div>
    <div v-else-if="size==2" class="mediumEvent">
      <div>{{event.name}} {{timeRange}}</div>
    </div>
    <div v-else class="largeEvent">
      <div>{{event.name}} {{timeRange}}</div>
      <div>{{event.description}}</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: "EventBlob",
  components: {
    // List of all components used in this component
  },
  props: {
    // List of data passed in from parent component
    event: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
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
    };
  },
  computed: {
    // Computed variables
    timeRange: function() {
      let range;
      if (this.event.allDay) {
        range = "(all day)";
      } else {
        // let start = new Date(this.event.startTime);
        // let end = new Date(this.event.endTime);
        // range = "(" + start.toLocaleTimeString() + " - " + end.toLocaleTimeString() + ")";
        if (this.month != undefined && this.day != undefined) {
          let date = "2019-" + this.month + 1 + "-" + this.day + 1;
          let start = new Date(
            date + "T" + this.event.startTime
          ).toLocaleTimeString();
          let end = new Date(
            date + "T" + this.event.endTime
          ).toLocaleTimeString();
          range = "(" + start + " - " + end + ")";
        } else {
          range = "(" + this.event.startTime + " - " + this.event.endTime + ")";
        }
      }
      return range;
    }
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
.eventBlob {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.largeEvent {
  height: 100%;
  background-color: aquamarine;
  text-align: center;
  vertical-align: middle;
}
</style>
