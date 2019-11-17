<template>
  <div>
    <div class="gradientBG">
    <!-- Can only have 1 parent element in a component -->
    <!-- <div class="conversationNameHeader"> Everyone </div> -->
    <div class="message_list">
      <div class="message_list_header">
        <p>
          <b class="convoHeader">CONVERSATIONS</b>
        </p>
      </div>
      <div class="message_list_items">
        <div
          v-for="(item, i ) in messenger"
          :key="i"
          :class="{'convo': true, 'activeConvo': i === selected}"
          @click="changeSelected(i)"
        >
          <div v-if="item.notification" class="notification messageNotificationOffset"></div>
          <img class="convoImage" :src="require('../assets/' + item.image)" />
          <!-- {{item.image}} -->
          <p class="convoHeader">{{item.name}}</p>
          <p
            v-if="item.messages.length>0"
          >"{{shortenString(item.messages[item.messages.length-1].message)}}"</p>
        </div>
      </div>
    </div>
    <Conversation :selected="selected"></Conversation>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store
import Conversation from "./Conversation.vue";

export default {
  name: "Messenger",
  components: {
    // List of all components used in this component
    Conversation
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
      messenger: "getMessenger"
    })
  },
  methods: {
    // Methods in this component
    changeSelected(i) {
      this.selected = i;
      if (this.messenger[this.selected].notification) {
        this.messenger[this.selected].notification = false;
      }
    },
    shortenString(fullSize) {
      let shortened = fullSize;
      if (shortened.length > 25) {
        shortened = shortened.substr(0, 25); // Prune to length
        shortened = shortened.substr(0, shortened.lastIndexOf(" "));
        shortened += "...";
      }
      return shortened;
    }
  }
};

//* SEND MESSAGES *//
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Alata|Roboto&display=swap");

.conversationNameHeader {
  /* border-bottom: solid 1px #ededed; */
  margin-left: 25%;
  height: 9.5vh;
  color: white;
  /* padding-bottom: 2.5vh; */
  font-family: "Alata", sans-serif;
  padding-top:1vh;
  font-size: 5.5vh;
}

div{
  font-family: 'Roboto',
}

.gradientBG{
  background: #11998e;  
  background: -webkit-linear-gradient(
    to left, #38ef7d, #11998e
    ); 
  background: linear-gradient(
    to left, #38ef7d, #11998e
    ); 

    height: 100vh;
}

.convoHeader {
  font-family: "Alata", sans-serif;
  font-size: 1.75vw;
  height: 3vh;
  color: white;
}

.message_list {
  /* margin-top: -9.25vh; */
  width: 25%;
  height: 89vh;
  float: left;
}

.message_list_items {
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
}

.message_list_header {
  height:6.5vh;
  border-bottom: solid 1px #b9e4e0c2;
  font-size: 20px;
  padding-top:1vh;
  padding-bottom:4vh;
}

.convo {
  /* background-color: #29d4a1ab; */
  border-bottom: solid 1px #b9e4e0c2;
  padding: 10px;
  /* font-family: 'Roboto', sans-serif; */
  color: white;
}

.activeConvo {
  background-color: #47635d8e;
}

.convoImage {
  width: 4vw;
  float: left;
  margin-left: 1.5vw;
  margin-top: 3.5vh;
  border-radius: 50%;
}

/* Added to App.vue's global CSS */ 
 /* .notification {
  background: red;
  position: absolute;
  border-radius: 50%;
  width: 1.25vw;
  height: 1.25vw;
}  */

.messageNotificationOffset {
  margin-left: 1vw;
  margin-top: 2.5vh;
}

/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
</style>
