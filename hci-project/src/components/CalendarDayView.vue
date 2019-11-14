<template>
  <div class="sideWindow">

      
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: 'CalendarDayView',
  components: { // List of all components used in this component

  },
  props: { // List of data passed in from parent component
    day: {
      Type: Object,
      required: true
    }
  },
  data() { // List of local data in this component
    return {
      // Variables go in here
    }
  },
  computed: { // Computed variables 

  },
  methods: { // Methods in this component

  }
}
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
    width: 25%;
    height: 100vh;
    right: 0;
    top: 0;
    z-index: 5;
    background-color: lightcoral;
}
</style>
