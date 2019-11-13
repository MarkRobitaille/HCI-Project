<template>
  <div> <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <h1>Lists</h1>
    <div class="listBar">
      <a href="#/lists" class="barItem">Grocery List</a>
    </div>

    <div class="listContent">
      <ul id="GroceryList" class="list">
        <li class="listItem">Pizza</li>
        <li class="listItem">Cheese</li>
        <li class="listItem">Milk</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: 'Lists',
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
/* Include the padding and border in an element's total width and height */
.list{
  text-align: left;
  padding-left: 5%;
  padding-top: 1%;
  margin: 0;
  list-style: none;
}
.listItem{
  padding: 1%;
}
.listBar {
  background-color: blueviolet;
  float: left;
  position: fixed;
  width: 25%;
  height: 100%;
  padding: 1%;
  margin-top: 0;
}
.barItem{
  width: 25%;
  text-align: center;
}

.listContent{
  background-color: lightpink;
  width: 75%;
  height: 100%;
  margin-left: 25%;
  position: fixed;
}
</style>
