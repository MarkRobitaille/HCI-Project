<template>
  <div>
    <!-- Can only have 1 parent element in a component -->
    <div class="header">
      <h1>Messenger</h1>
    </div>
    <div class="message_list">
      <div class="message_list_header">
        <p>
          <b>Conversations</b>
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
          <img :src="require('../assets/' + item.image)" />
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
.header {
  background: white;
  border-bottom: solid 1px #ededed;
  height: 10vh;
  color: black;
  padding-bottom: 2.5vh;
}

.convoHeader {
  font-weight: bold;
}

.message_list {
  background: #def5fc;
  width: 25%;
  height: 70vh;
  float: left;
}

.message_list_items {
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
}

.message_list_header {
  border-bottom: solid 1px #c3dde6;
  font-size: 20px;
}

.convo {
  border-bottom: solid 1px #c3dde6;
  padding: 10px;
}

.activeConvo {
  background-color: #bce7f7;
}

.convo img {
  width: 4vw;
  float: left;
  margin-left: 0.5vw;
  margin-top: 0.5vh;
}

/* Added to App.vue's global CSS */
/* .notification {
  background: red;
  position: absolute;
  border-radius: 50%;
  width: 1.25vw;
  height: 1.25vw;
} */

.messageNotificationOffset {
  margin-left: 0.5vw;
  margin-top: 0.5vh;
}

/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */
</style>
