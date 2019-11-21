<template>
  <div>
    <div class="gradientBG">
      <!-- Can only have 1 parent element in a component -->
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
            <div class="notificationDiv">
              <div v-if="item.notification" class="notification messageNotificationOffset"></div>
            </div>
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
  margin-left: 25%;
  height: 9.5vh;
  color: white;
  font-family: "Alata", sans-serif;
  padding-top: 1vh;
  font-size: 5.5vh;
}

div {
  font-family: "Roboto";
}

.gradientBG {
  background: #693dbb;
  height: 100vh;
}

.convoHeader {
  font-family: "Alata", sans-serif;
  font-size: 1.75vw;
  height: 3vh;
  color: white;
}

.message_list {
  width: 25%;
  height: 100vh;
  float: left;
}

.message_list_items {
  width: 100%;
  height: calc(88.5vh - 1px);
  overflow-y: auto;
}

.message_list_header {
  height: 6.5vh;
  border-bottom: solid 1px #b9e4e0c2;
  font-size: 20px;
  padding-top: 1vh;
  padding-bottom: 4vh;
}

.convo {
  border-bottom: solid 1px #bbb9fc;
  padding: 10px;
  color: white;
}

.activeConvo {
  background-color: #4b26a1;
}

.convoImage {
  width: 4vw;
  float: left;
  margin-left: 1.5vw;
  margin-top: 3.5vh;
  border-radius: 50%;
}

.notificationDiv {
  position: relative;
}

.messageNotificationOffset {
  left: 1.5vw;
  margin-top: 2.5vh;
  display: static;
}
</style>
