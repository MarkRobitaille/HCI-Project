<template>
  <div>
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <!-- <div class="listBar">
      <a href="#/lists" class="barItem">Grocery List</a>
      <button class="addListButton">Add List</button>
    </div>-->

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
          <p class="convoHeader" v-if="item.name!=''">{{item.name}}</p>
          <p class="convoHeader" v-else>Untitled List</p>
        </div>
      </div>
    </div>

    <div class="listContent">
      <div v-if="this.lists.length>0">
        <div class="listHeader">
          <div class="listStyleButtons">
            <button
              :class="{'bulletButton': true, 'selectedListType': !lists[selected].checkboxes}"
              @click="changeToBullets()"
            >
              <font-awesome-icon icon="circle" />
            </button>
            <button
              :class="{'checkboxButton': true, 'selectedListType': lists[selected].checkboxes}"
              @click="changeToCheckboxes()"
            >
              <font-awesome-icon icon="check-square" />
            </button>
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

        <div class="deleteListDiv">
          <button class="deleteListButton" @click="removeList()">
            Delete List
            <font-awesome-icon icon="trash" class="rightIconOffset" />
          </button>
        </div>

        <div class="listItems">
          <ul id="GroceryList" class="listEntries">
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
    changeToBullets() {
      this.lists[this.selected].checkboxes = false;
    },
    changeToCheckboxes() {
      this.lists[this.selected].checkboxes = true;
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
.listHeader {
  /* background: white; */
  height: 12vh;
  color: black;
  padding-bottom: 1vh;
  overflow: visible;
}
.listNameDiv {
  width: 70%;
  height: 12vh;
  float: left;
  text-align: center;
}
.listNameInput {
  z-index: 1;
  margin-top: 2vh;
  font-size: 28px;
  font-weight: bold;
  padding-top: 1%;
  padding-bottom: 1%;
  background: none;
  border: none;
  text-align: center;
  width: 100%;
}

.listItems {
  height: 87vh;
  /* background: plum; */
  overflow-y: auto;
  /* overflow-x: hidden; */
}

.altListItemColor {
  background-color: rgba(255, 0, 0, 0.3);
}

.listStyleButtons {
  width: 15%;
  height: 12vh;
  float: left;
  text-align: center;
}

.bulletButton {
  /* float: left; */
  /* margin-left: 3vw; */
  margin-top: 4vh;
  min-height: 20px;
  min-width: 30px;
  height: 5vh;
  width: 20%;

  /* padding: */
  /* margin: 0 auto; */
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
}

.checkboxButton {
  /* float: left; */
  margin-top: 4vh;
  min-height: 0px;
  min-width: 30px;
  height: 5vh;
  width: 20%;
  /* margin: 0 auto; */
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
}

.selectedListType {
  background-color: #acacac;
  border-color: rgb(131, 131, 131);
  transform: translateY(1px);
}

.list {
  border-bottom: solid 1px #c3dde6;
  padding: 10px;
}

.activeList {
  background-color: #bce7f7;
}

.listItemChecked {
  text-decoration: line-through;
}

.listEntries {
  text-align: left;
  padding: 0;
  width: 100%;
  /* margin-top: 10vh; */
  padding-bottom: 10vh;
}

.listItem {
  padding-top: 1%;
  padding-bottom: 1%;
  width: 100%;
  /* padding-left: 4vw;
  padding-right: 2vw; */
  margin: 0;
  min-height: 20px;
  height: 4vh;
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
.deleteButtonDiv {
  width: 15%;
  float: left;
  text-align: center;
}

.listBar {
  padding-top: 5vh;
  background: blueviolet;
  width: 25%;
  height: 87.5vh;
  float: left;
  overflow-y: scroll;
  /* overflow: hidden; */
}
.barItem {
  width: 25vw;
  text-align: center;
}

.listContent {
  background-color: lightpink;
  margin-left: 25%;
  width: 75%;
  height: 100vh;
  /* overflow-y: scroll; */
}
.listInput {
  width: 100%;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-left: 2%;
  margin-right: 2%;
  background: none;
  border: none;
}
.deleteItemButton {
  /* right: 3vw; */
  /* position: absolute; */
  /* min-height: 10px; */
  height: 3.5vh;
  min-height: 20px;
}

.addItemDiv {
  /* position: fixed;
  top: 0;
  right: 0;
  height: 10vh;
  width: 20%; */
  width: 15%;
  height: 12vh;
  float: left;
  text-align: center;
}

.addItemButton {
  /* position: absolute; */
  /* top: 4vh;
  min-height: 20px;
  height: 5vh; */
  /* margin-top: 1vh;
  right: 3vw;
  min-height: 10px;
  height: 5vh; */
  margin-top: 4vh;
  min-height: 20px;
  height: 5vh;
  /* margin-right: 3vw;
  float: right; */
}
.addListButton {
  margin-top: 4vh;
  min-height: 20px;
  height: 5vh;
  /* margin-right: 3vw; */
  /* float: right; */
  /* position: fixed;
  bottom: 0;
  right: 0;
  height: 10vh;
  width: 15vw; */
}

.convoHeader {
  font-weight: bold;
}

.list_list {
  background: #def5fc;
  width: 25%;
  height: 100vh;
  float: left;
}

.list_list_items {
  border-top: solid 1px #c3dde6;
  margin-top: 4vh;
  width: 100%;
  height: calc(87vh - 1px);
  overflow-y: auto;
}

.notification {
  background: red;
  position: absolute;
  border-radius: 50%;
  width: 2.5vh;
  height: 2.5vh;
  margin-left: 1vw;
}

.deleteListDiv {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 10vh;
  width: calc(70% * 0.15);
  text-align: center;
}
.deleteListButton {
  margin-bottom: 4vh;
  min-height: 20px;
  height: 5vh;
  /* margin-right: 3vw; */
  /* float: right; */
  /* margin-bottom: 4vh;
  min-height: 20px;
  height: 5vh;
  margin-right: 3vw;
  bottom: 0;
  right: 0;
  position: fixed;
  float: right;
  min-height: 20px; */
}
</style>

