<template>
  <div> <!-- Can only have 1 parent element in a component -->

    <div class="header">

      <h1>Messenger</h1>

    </div>
    <!-- All template inside of here -->

    <div class="message_list"> 

      <div class="message_list_header">
        <p><b>CONVERSATIONS</b></p>
      </div>

      <div class="message_list_items">
        <div class="convo" id="activeConvo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Family</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png"><p>Mom</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Dad</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Alex</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Alina</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Mamaie</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Tataie</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Britt</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Mark</p>
        </div>

        <div class="convo">
          <img src="../assets/DefaultProfilePic.png">
          <p>Ceilidh</p>
        </div>

      </div>

    </div> 

    <div class="messageArea">

      <div class="date">
        Today 9:38am
      </div>

      <div class="bubble">
        Hey can we get pizza for dinner?
      </div>

      <div class="receiveBubble">
        yeah sure I'll pick it up
      </div>

      <div class="receiveBubble">
        i'll get a pepperoni pizza and a cheese pizza. should i get some dips?
      </div>

      <div class="bubble">
        yeah get garlic dip!!!!! :)
      </div>

      <div class="receiveBubble">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Laoreet suspendisse interdum consectetur libero id faucibus. Etiam sit amet nisl purus in mollis nunc. Odio ut enim blandit volutpat. Mattis pellentesque id nibh tortor id aliquet lectus proin. In mollis nunc sed id semper. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Posuere urna nec tincidunt praesent semper. Semper auctor neque vitae tempus quam. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Ultrices dui sapien eget mi proin sed libero enim. Convallis posuere morbi leo urna molestie at elementum eu.
        Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Est placerat in egestas erat imperdiet sed euismod. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Duis at tellus at urna condimentum mattis pellentesque id nibh. Sed adipiscing diam donec adipiscing tristique. Auctor neque vitae tempus quam pellentesque. Enim blandit volutpat maecenas volutpat blandit aliquam. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Quis vel eros donec ac. Eget est lorem ipsum dolor.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Laoreet suspendisse interdum consectetur libero id faucibus. Etiam sit amet nisl purus in mollis nunc. Odio ut enim blandit volutpat. Mattis pellentesque id nibh tortor id aliquet lectus proin. In mollis nunc sed id semper. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Posuere urna nec tincidunt praesent semper. Semper auctor neque vitae tempus quam. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Ultrices dui sapien eget mi proin sed libero enim. Convallis posuere morbi leo urna molestie at elementum eu.
        Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Est placerat in egestas erat imperdiet sed euismod. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Duis at tellus at urna condimentum mattis pellentesque id nibh. Sed adipiscing diam donec adipiscing tristique. Auctor neque vitae tempus quam pellentesque. Enim blandit volutpat maecenas volutpat blandit aliquam. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Quis vel eros donec ac. Eget est lorem ipsum dolor.
      
      </div>
    
    </div> 

      <div class="input">
        
          <input class= "typingBox" type="text" name="type here" placeholder="Message"> 
          <input class= "send" type="button" value="SEND" >

      </div> 

  </div> 

</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: 'Messenger',
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
} //export default

//* SEND MESSAGES *//

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>

  .header {

    background: white;
    border-bottom: solid 1px #ededed;
    height: 10vh;
    color:black;

  }

  .message_list {

    background: #def5fc;
    width: 25%;
    height: 90vh;
    float: left;

  }

  .message_list_items{
      width:100%;
      height:80vh;
      overflow-y: scroll;
  }

  .message_list_header{
    border-bottom: solid 1px #c3dde6;
    font-size: 20px;
  }

  .convo{

    border-bottom: solid  1px #c3dde6;
    padding: 10px;

  }

  #activeConvo{
    background-color: #bce7f7;
  }

  .convo img{
    width: 20%;
    float:left;
    margin-left: 10%;
  }

  .messageArea {

    background-color:white;
    width:75%;
    height: 80vh;
    overflow-y: scroll;

  }

  .date{

    font: italic;
    margin-top:20px;
    margin-bottom: 20px;
    font-size: 12px;
    color:gray;

  }

  .bubble{

    box-sizing: border-box;
    float: right;
    width: auto;
    max-width: 80%;
    position: relative;
    clear: both;
  
    background: #bce7f7;
  
    border: solid 1px rgba(0,0,0,0);
    border-radius: 20px 20px 0px 20px;
  
    margin-bottom: 20px;
    padding: 6px 20px;
    margin-right: 20px;
    color: #000;
    word-wrap: break-word;
    text-align: right;

  }

  .receiveBubble{

    box-sizing: border-box;
    float: left;
    width: auto;
    max-width: 80%;
    position: relative;
    clear: both;
  
    background: #d6d6d6;
  
    border: solid 1px rgba(0,0,0,0);
    border-radius: 20px 20px 20px 0px;
  
    margin-bottom: 20px;
    margin-left: 20px;
    padding: 6px 20px;
    color: #000;
    word-wrap: break-word;
    text-align: left;

  }

  .input{

    display: flex;
    position: absolute;
    min-height: 10vh; 
    min-width: 75%;
    margin-left: 25%;
    background: #bce7f7;
    bottom: 0;

  }

  .typingBox{

    box-sizing: border-box;
    float: left;
    min-width: 80%;
    min-height: 5vh;
    position: relative;
    font-size: 16px;
    
    background: white;
  
    border: solid 1px rgba(0,0,0,0);
    border-radius: 20px;
  
    padding: 6px 20px;
    margin: 22px;
    color: #000;
    word-wrap: break-word;

  } 

  input[type=text]:focus {

    background-color: white;
    outline:none;

  }

  .send{

    box-sizing: border-box;
    background: white;
    height: 5.5vh;
    font-size: 16px;
    display: inline-flex;
    margin-top:3.5vh;
    border-radius:10px;
    float:right;

  }

  .send:focus{
    outline:none;
  }

/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */

</style>
