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
      <input @click="sendMessage()" class="send" type="button" value="Send" />
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
  computed: {
    // Computed variables
    ...mapGetters({
      messenger: "getMessenger",
      currentUser: "getCurrentUser"
    })
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
  width: 75%;
  height: calc(100vh - 10vh - 14vh);
  overflow-y: scroll;
}

.input {
  display: flex;
  position: absolute;
  height: 11.25vh;
  min-width: 75%;
  /* margin-left: 25%; */
  background: #bce7f7;
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

.send {

  box-sizing: border-box;
  height: 5vh;
  width: 5vh;
  background: white;
  
  border:solid 1px grey;
  border-radius: 10vh;
  margin: 3vh;
  text-align: center; 

}

.send:focus {
  outline: none;
}

.send:hover{
  background:#f5fffe;
}

</style>
