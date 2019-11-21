<template>
  <div class="messageArea">
    <Message
      v-for="(item, i) in messenger[selected].messages"
      :key="i"
      :messageData="item"
      :messageNum="i"
      :currentUser="currentUser"
      :prevDate="messenger[selected].messages[i-1]? messenger[selected].messages[i-1].timeSent : ''"
      :groupConvo="selected==0"
      :title="'Sent by ' + users[item.senderId-1].name + ' at ' + item.timeSent"
    ></Message>

    <div class="input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        class="typingBox"
        type="text"
        name="Type Here"
        placeholder="Type Message Here"
      />
      <!-- <input @click="sendMessage()" class="send" type="button" value="Send" /><font-awesome-icon icon="paper-plane" class = "homeIcon" size="2x" color="white"/> -->
      <button v-if="sendButtonDisabled" disabled class ="sendIcon sendIconDisabled" value="Send"><font-awesome-icon icon="paper-plane" size="2x"/></button>
      <button v-else @click="sendMessage()" class ="sendIcon" value="Send"><font-awesome-icon icon="paper-plane" size="2x"/></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store
import Message from "./Message.vue";

export default {
  name: "Conversation",
  components: {
    // List of all components used in this component
    Message
  },
  props: {
    // List of data passed in from parent component
    selected: {
      type: Number,
      required: true
    }
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
      newMessage: ""
    };
  },
  created() {
    this.scrollToBottom();
  },
  watch: {
    selected: function () {
      this.scrollToBottom();
    }
  },
  computed: {
    // Computed variables
    ...mapGetters({
      users: "getUsers",
      messenger: "getMessenger",
      currentUser: "getCurrentUser"
    }),
    sendButtonDisabled: function() {
      return this.newMessage == "";
    }
  },
  methods: {
    // Methods in this component
    sendMessage() {
      if (this.newMessage != "") {
        let currTime = new Date();
        let message = {
          message: this.newMessage,
          senderId: this.currentUser.id,
          timeSent: currTime
        };
        this.messenger[this.selected].messages.push(message);

        this.newMessage = "";

        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$el.scrollTop = this.$el.lastElementChild.offsetTop;
      });
    }
  }
};

//* SEND MESSAGES *//
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
.messageArea {
  background-color: white;
  margin-left:25%;
  /* width: 75%; */
  height: calc(100vh - 11.25vh);
  overflow-y: scroll;
}

.input {
  display: flex;
  position: absolute;
  height: 11.25vh;
  /* margin-left:2vw;; */
  min-width: 75%;
  /* margin-left: 25%; */
  /* background: #bce7f7; */
  bottom: 0;
}

.typingBox {

  box-sizing: border-box;
  min-width: 80%;
  height: 5vh;
  font-size: 16px;

  background: white;

  border: solid 1px rgba(0, 0, 0, 0);
  border-radius: 20px;

  padding: 2vh 2vh; 
  margin: 3vh;
  word-wrap: break-word;

}

.typingBox:hover{
  background:#f5fffe
}

input[type="text"]:focus {
  background-color: white;
  outline: none;
}

.sendIcon {

  color:white;
  background:none;
  border:none;
  /* background: #11998e;
  border:solid 1px #11998e; */
  height:5vh;
  width: 5vw;
  margin-top: 3vh;
  border-radius: 50%;
  font-size: 1vw;
  text-align: center;

}

.sendIconDisabled {
  color:#bbb9fc;
}

.send:focus {
  outline: none;
}

.send:hover{
  background:#f5fffe;
}

</style>
