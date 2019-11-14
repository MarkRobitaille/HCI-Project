<template>
  <div> <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="header">
      <h1>Lists</h1>
    </div>

    <!-- <div class="listBar">
      <a href="#/lists" class="barItem">Grocery List</a>
      <button class="addListButton">Add List</button>
    </div> -->

     <div class="message_list">
      <div class="message_list_items">
        <!-- <div
          v-for="(item, i ) in messenger"
          :key="i"
          :class="{'convo': true, 'activeConvo': i === selected}"
          @click="changeSelected(i)"
        >
          <div v-if="item.notification" class="notification"></div>
          <img :src="require('../assets/' + item.image)" />
          <p class="convoHeader">{{item.name}}</p>
          <p v-if="item.messages.length>0">"{{shortenString(item.messages[item.messages.length-1].message)}}"</p>
        </div> -->
        <button class="addListButton">Add List</button>
        <p class="convoHeader">Grocery List</p>
      </div>
    </div>

    <div class="listContent">
      <h2>Grocery List </h2>
      <button class="addItemButton">Add Item</button>
      
      <ul id="GroceryList" class="list">
        <li class="listItem"><input id="pizzaItem" type="text" value="Pizza" class="listInput">
          <button class="deleteItemButton">Remove</button></li>
        <li class="listItem"><input type="text" value="Cheese" class="listInput">
          <button class="deleteItemButton">Remove</button></li>
        <li class="listItem"><input type="text" value="Milk" class="listInput">
          <button class="deleteItemButton">Remove</button></li>
      </ul>

      <button class="deleteListButton">Delete List</button>
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
.header {
  background: white;
  border-bottom: solid 1px #ededed;
  height: 10vh;
  color: black;
  padding-bottom: 2.5vh;
}

.list{
  text-align: left;
  padding: 0;
  width: 100%;
  margin-left: 5vw;
  margin-top: 10vh;
  list-style: none;
}
.listItem{
  padding-top: 1%;
  padding-bottom: 1%;
  width: 80%;
  margin: 0;
}
.listBar {
  padding-top: 5vh;
  background: blueviolet;
  width: 25%;
  height: 87.5vh;
  float: left;
  overflow-y: scroll;
}
.barItem{
  width: 25vw;
  text-align: center;
}

.listContent{
  background-color: lightpink;
  width: 75%;
  height: 87.5vh;
  overflow-y: scroll;
}
.listInput{
  width: 45vw;
  background: none;
  border: none;
}
.deleteItemButton{
  right: 3vw;
  position: absolute;
  min-height: 10px;
  height: 3vh;
}

.addItemButton{
  margin-top: 1vh;
  right: 3vw;
  position: absolute;
  min-height: 10px;
  height: 5vh;
}
.addListButton{
  margin-top: 1vh;
  min-height: 10px;
  height: 5vh;
}

.convoHeader {
  font-weight: bold;
}

.message_list {
  background: #def5fc;
  width: 25%;
  height: 87.5vh;
  float: left;
}

.message_list_items {
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
}

.notification {
   background:red;
   position:absolute;
   border-radius:50%;
   width: 2.5vh;
   height: 2.5vh;
   margin-left: 1vw;
}
.deleteListButton{
  bottom: 5vh;
  right: 3vw;
  position: absolute;
  min-height: 10px;
  height: 5vh;
}
</style>

