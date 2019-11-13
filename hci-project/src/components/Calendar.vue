<template>
  <div> <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <h1>Calendar</h1>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: 'Calendar',
  components: { // List of all components used in this component

  },
  props: { // List of data passed in from parent component

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

</style>
