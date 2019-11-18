<template>
  <div class="eventBlob" :style="'background-color: ' + (users[event.createdBy-1].color)">
    <div v-if="size==1">
      <div>
        <font-awesome-icon :icon="users[event.createdBy-1].icon" class="smallEventIcon"/>
      </div>
    </div>
    <div v-else-if="size==2" class="mediumEvent">
      <div><font-awesome-icon :icon="users[event.createdBy-1].icon" class="mediumEventIcon mediumEventLeftAlign"/>{{event.name}}</div>
    </div>
    <div v-else class="largeEvent">
      <div class="largeEventWrapperDiv">
        <font-awesome-icon :icon="users[event.createdBy-1].icon" class="largeEventIcon"/>
        <div>{{event.name}} {{timeRange}}</div>
        <div>{{event.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' // Used to get data from Vuex store

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
    ...mapGetters({
      users: "getUsers",
    }),
    timeRange: function() {
      let range;
      if (this.event.allDay) {
        range = "(all day)";
      } else {
        // let start = new Date(this.event.startTime);
        // let end = new Date(this.event.endTime);
        // range = "(" + start.toLocaleTimeString() + " - " + end.toLocaleTimeString() + ")";
        if (this.month != undefined && this.day != undefined) {
          let monthStr = "" + (this.month + 1);
          if (monthStr.length == 1) {
            monthStr = "0" + monthStr;
          }
          let dayStr = "" + (this.day + 1);
          if (monthStr.length == 1) {
            dayStr = "0" + dayStr;
          }
          let date = "2019-" + monthStr + "-" + dayStr;
          let start = new Date(
            date + " " + this.event.startTime + ":00 GMT-0600"
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            minute: "numeric"
          });
          let end = new Date(
            date + " " + this.event.endTime + ":00 GMT-0600"
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            minute: "numeric"
          });
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
  min-height: 18px;
  text-align: center; 
  border-radius: 10px;
  min-width: 18px;
  color: black;
}


.smallEventIcon {
  padding: 1px;
  /* padding-bottom: 1px; */
}
.mediumEventIcon {
  margin-top: 3px;
}
.largeEventIcon {
  padding-top: 4px;
  padding-bottom: 3px;
}

.mediumEvent {
   width: 90%;
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mediumEventLeftAlign {
  float: left;
  margin-left: 7.5%;
  margin-right: 2%;

}
.largeEvent {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-top:5%;
  padding-bottom: 5%; */
}
.largeEventLeftAlign {
  /* display: inline-block; */
  /* left: 0;
  position: relative;
  top: 0; */
}
</style>
