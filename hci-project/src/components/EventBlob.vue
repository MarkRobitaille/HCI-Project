<template>
  <div>
    <div v-if="size==1">
      
    </div>
    <div v-else-if="size==2">
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: 'EventBlob',
  components: { // List of all components used in this component

  },
  props: { // List of data passed in from parent component
    event: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
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
</style>
