<template>
  <div class="errorMessage">
    <!-- 
        Error types:
        1 - Email isn't formatted right (lacks an @ symbol)
        2 - User not found
        3 - Incorrect password
        4 - No event name
        5 - No date selected
        6 - Only one of start and end time
        7 - Start time after end time
    -->
    <div v-if="type==1">Error: Entered email doesn't look right. Try again.</div>
    <div v-if="type==2">Error: User with specified email not found.</div>
    <div v-if="type==3">Error: Password is incorrect. Try again.</div>
    <div v-if="type==4">Error: Please include an event name.</div>
    <div v-if="type==5">Error: Please include a date for the event.</div>
    <div v-if="type==6">Error: Please specify both a start and end time.</div>
    <div v-if="type==7">Error: Looks like your end time is before the start time.</div>
  </div>
</template>

<script>

export default {
  name: 'ErrorMessage',
  props: { // List of data passed in from parent component
    type: {
      type: Number,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
.errorMessage {
  background-color: crimson;
  color: white;
  text-align: center;
}
</style>
