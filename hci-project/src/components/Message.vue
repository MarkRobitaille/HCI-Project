<template>
  <div class="messageSpace">
    <!-- Can only have 1 parent element in a component -->
    <!-- All template inside of here -->
    <div class="date" v-if="newDay">{{formattedDate}}</div>
    <div class="bubble" v-if="sameUser">{{messageData.message}}</div>
    <div class="receiveBubble" v-else><div v-if="groupConvo" class="sentByHeader">{{users[messageData.senderId].name}}:</div>{{messageData.message}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store

export default {
  name: "Message",
  components: {
    // List of all components used in this component
  },
  props: {
    // List of data passed in from parent component
    messageData: {
      type: Object,
      required: true
    },
    messageNum: {
      type: Number,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    prevDate: {
      type: [String, Date],
      required: false
    },
    groupConvo: {
      type: Boolean,
      required: true
    }
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
      newDay: false,
      test1: false,
      test2: false,
      selected: false
    };
  },
  created() {
    this.newDay = this.checkIfNewDay();
  },
  watch: {
    prevDate: function() {
      this.newDay = this.checkIfNewDay();
    }
  },
  computed: {
    // Computed variables
    ...mapGetters({
      users: "getUsers"
    }),
    sameUser: function() {
      return this.currentUser.id == this.messageData.senderId;
    },
    formattedDate: function() {
      let curr = new Date(this.messageData.timeSent);
      return curr.toDateString() + " " + curr.toLocaleTimeString();
    }
  },
  methods: {
    // Methods in this component
    checkIfNewDay: function() {
      let newDay = false;
      if (this.prevDate != "") {
        let prev = new Date(this.prevDate);
        let curr = new Date(this.messageData.timeSent);
        if (prev.toDateString() !== curr.toDateString()) {
          this.test1 = true;
          newDay = true;
        }
      } else {
        this.test2 = true;
        newDay = true;
      }
      return newDay;
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

.date {
  font: italic;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 12px;
  color: gray;
  clear: both;
}

.bubble {
  box-sizing: border-box;
  float: right;
  width: auto;
  max-width: 80%;
  position: relative;
  clear: both;

  background: #bce7f7;

  border: solid 1px rgba(0, 0, 0, 0);
  border-radius: 20px 20px 0px 20px;

  margin-bottom: 20px;
  padding: 6px 20px;
  margin-right: 20px;
  color: #000;
  word-wrap: break-word;
  text-align: right;
}

.receiveBubble {
  box-sizing: border-box;
  float: left;
  width: auto;
  max-width: 80%;
  position: relative;
  clear: both;

  background: #d6d6d6;
  /* background: #e6ccff; */

  border: solid 1px rgba(0, 0, 0, 0);
  border-radius: 20px 20px 20px 0px;

  margin-bottom: 20px;
  margin-left: 20px;
  padding: 6px 20px;
  color: #000;
  word-wrap: break-word;
  text-align: left;
}
.sentByHeader {
  font-weight: bold;
  margin-bottom: 1vh;
}
</style>
