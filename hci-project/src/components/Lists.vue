<template>
  <div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->

    <div class="list_list">
      <button class="addListButton" @click="addList()">
        Add List
        <font-awesome-icon icon="plus" class="rightIconOffset" />
      </button>
      <div class="list_list_items">
        <div
          v-for="(item, i ) in lists"
          :key="i"
          :class="{'list': true, 'activeList': i === selected}"
          @click="changeSelected(i)"
        >
          <div v-if="item.notification" class="notification"></div>
          <p class="listListHeader" v-if="item.name!=''">{{item.name}}</p>
          <p class="listListHeader" v-else>Untitled List</p>
        </div>
      </div>
      <div class="deleteListDiv">
        <button class="deleteListButton" @click="removeList()">
          Delete List
          <font-awesome-icon icon="trash" class="rightIconOffset" />
        </button>
      </div>
    </div>

    <div class="listContent">
      <div v-if="this.lists.length>0">
        <div class="listHeader">
          <div class="listStyleButtons">
            <div class="toggleWrapper" @click="changeListStyle()">
              <button
                :class="{'bulletButton': true, 'selectedListType': !lists[selected].checkboxes}"
              >
                <font-awesome-icon icon="circle" />
              </button>
              <button
                :class="{'checkboxButton': true, 'selectedListType': lists[selected].checkboxes}"
              >
                <font-awesome-icon icon="check-square" />
              </button>
            </div>
          </div>
          <div class="listNameDiv">
            <input
              type="text"
              class="listNameInput"
              v-model="lists[selected].name"
              placeholder="Enter list name here..."
            />
          </div>
          <div class="addItemDiv">
            <button class="addItemButton" @click="addItem()">
              Add Item
              <font-awesome-icon icon="plus" class="rightIconOffset" />
            </button>
          </div>
        </div>

        <div class="listItems">
          <ul class="listEntries">
            <li
              v-for="(item, index) in lists[selected].listItems"
              :key="index"
              :class="{'listItem': true, 'altListItemColor': index%2 == 0}"
            >
              <div class="bulletCheckboxDiv">
                <font-awesome-icon icon="circle" v-if="!lists[selected].checkboxes" />
                <input type="checkbox" v-else v-model="item.completed" />
              </div>
              <div class="listInputDiv">
                <input
                  class="typeText"
                  type="text"
                  v-model="item.itemName"
                  :class="{'listInput': true, 'listItemChecked': item.completed && lists[selected].checkboxes}"
                  placeholder="Enter list item here..."
                />
              </div>
              <div class="deleteButtonDiv">
                <button class="deleteItemButton" @click="removeItem(index)">
                  Delete Item
                  <font-awesome-icon icon="trash" class="rightIconOffset" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store

export default {
  name: "Lists",
  components: {
    // List of all components used in this component
  },
  props: {
    // List of data passed in from parent component
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
      selected: 0
    };
  },
  computed: {
    // Computed variables
    ...mapGetters({
      lists: "getLists"
    })
  },
  methods: {
    // Methods in this component
    changeSelected(i) {
      this.selected = i;
    },
    addItem() {
      this.lists[this.selected].listItems.push({
        itemName: "",
        completed: false
      });
    },
    removeItem(itemIndex) {
      this.lists[this.selected].listItems.splice(itemIndex, 1);
    },
    addList() {
      this.lists.push({
        name: "",
        checkboxes: false,
        listItems: []
      });
      this.selected = this.lists.length - 1;
    },
    removeList() {
      this.lists.splice(this.selected, 1);
      this.selected--;
    },
    changeListStyle() {
      this.lists[this.selected].checkboxes = !this.lists[this.selected].checkboxes;
    }
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

button {
  background: none;
  border: none;
  color: f12711;
  /* font-size: 1.5vw; */
  font-size: 1.2vw;
  /* width: auto; */
}

@import url("https://fonts.googleapis.com/css?family=Alata|Roboto&display=swap");
/* ***** List of Lists ***** */

.listNameInput::placeholder {
  color: white;
  font-family: "Alata";
}

.typeText::placeholder {
  color: grey;
  font-family: "Roboto";
}

textarea,
select,
input,
button {
  outline: none;
}

.list_list {
  background: rgb(0, 155, 182); /* fallback for old browsers */
  font-family: "Roboto";
  width: 25%;
  height: 100vh;
  float: left;
  color: white;
}

button{
  /* background: rgba(255, 255, 255); */
  border: none;
  color: black;
  /* color:rgb(0, 167, 69); */
  /* color: #f12711; */
  /* font-size: 1.5vw;*/
  border-radius: 5vw;
  outline:none;
  padding-left: 1vw;
  padding-right: 1vw; 

}

.addListButton {
  background: white;
  margin-top: 4vh;
  min-height: 20px;
  height: 5vh;
  color: white;
  font-size: 1.2vw;
  color: rgb(0, 106, 124);
}

.list_list_items {
  border-top: solid 1px #c3dde6;
  margin-top: 4vh;
  width: 100%;
  height: calc(74vh - 2px);
  overflow-y: auto;
}

.list {
  border-bottom: solid 1px #c3dde6;
  padding: 10px;
  
}

.activeList {
  background-color: rgb(0, 106, 124);
}

.listListHeader {
  font-weight: bold;
  font-size: 2vw;
  font-family: "Alata";
  color: white;
}

/* ***** List Editor ***** */

.listContent {
  background-color: white;
  margin-left: 25%;
  width: 75%;
  height: 100vh;
}

.listHeader {
  background-color: rgb(0, 155, 182);
  height: 12vh;
  color: white;
  padding-bottom: 1vh;
  overflow: visible;
}

/* Bullet/Checkbox */

.listStyleButtons {
  width: 15%;
  height: 12vh;
  float: left;
  text-align: center;
  color: white;
  
}

.toggleWrapper {
  margin-top: 4vh;
  height: 5vh;
  min-height: 10px;
  width: 40%;
  min-width: 70px;
  background-color: rgb(105, 215, 236);
  border-radius: 15px;
  font-size: 0.75vw;
}
.bulletButton {
  /* margin-top: 4vh; */
  min-height: 20px;
  min-width: 30px;
  height: 5vh;
  width: 50%;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  background:none;
  font-size: 0.75vw;
  color: white;
}

.checkboxButton {
  /* margin-top: 4vh; */
  min-height: 0px;
  min-width: 30px;
  height: 5vh;
  width: 50%;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  color: white;
}

.selectedListType {
  /* background-color: rgb(159, 236, 252); */
  background-color: rgb(0, 106, 124);
  border-radius: 15px;
  /* border-color: rgb(131, 131, 131); */
  /* transform: translateY(1px); */
}

/* List Name Input */

.listNameDiv {
  width: 70%;
  height: 12vh;
  float: left;
  text-align: center;
  color: white;
}

.listNameInput {
  z-index: 1;
  margin-top: calc(6vh - 18px);
  font-size: 28px;
  font-weight: bold;
  padding-top: 1%;
  padding-bottom: 1%;
  background: none;
  border: none;
  text-align: center;
  width: 100%;
  color: black;
  font-family: "Alata";
  color: white;
}

/* Add Item */

.addItemDiv {
  width: 15%;
  height: 12vh;
  float: left;
  text-align: center;
}

.addItemButton {
  margin-top: 4vh;
  min-height: 20px;
  height: 5vh;
  color: rgb(0, 106, 124);
  font-size: 1.2vw;
  background: white;
}

/* Delete List */

.deleteListDiv {
  border-top: solid 1px #c3dde6;
  /* background-color: rgb(114, 114, 114); */
   /* background-color: rgb(0, 106, 124); */
  bottom: 0;
  left: 0;
  height: 13vh;
  width: 100%;
  text-align: center;
}
.deleteListButton {
  margin-top: 4vh;
  min-height: 20px;
  height: 5vh;
  background-color: white;
  color:red;
  font-size: 1.2vw;
}

/* List Items */

.listItems {
  height: 87vh;
  overflow-y: auto;
}

.listEntries {
  text-align: left;
  padding: 0;
  width: 100%;
  padding-bottom: 10vh;
}

.listItem {
  padding-top: 1%;
  padding-bottom: 1%;
  width: 100%;
  margin: 0;
  min-height: 20px;
  height: 4vh;
}

.altListItemColor {
  background-color: rgb(233, 232, 232);
}

.bulletCheckboxDiv {
  width: 15%;
  float: left;
  text-align: center;
  padding-top: 1vh;
}

.listInputDiv {
  width: 70%;
  float: left;
  text-align: center;
}

.listInput {
  width: 100%;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-left: 2%;
  margin-right: 2%;
  background: none;
  border: none;
  font-size: 1.2vw;
}

.listItemChecked {
  text-decoration: line-through;
}

.deleteButtonDiv {
  width: 15%;
  float: left;
  text-align: center;
}

.deleteItemButton {
  /* right: 3vw; */
  /* position: absolute; */
  /* min-height: 10px; */
  height: 3.5vh;
  min-height: 20px;
  font-size: 1vw;
  background: none;
  color:red;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
</style>

