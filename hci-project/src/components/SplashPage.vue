<template>
  <div>
    <div class="mainScreen">
      <!-- Can only have 1 parent element in a component -->
      <!-- All template inside of here -->
      <div class="login">
        <div class="innerSplash">
          <h1 class="splashText">Log in</h1>
          <!-- username/email -->
          <div class="loginUsername">
            <label class="fieldLabel">
              <strong>Email:</strong>
            </label>
            <input class="textInputField" type="text" />
          </div>
          <!-- password -->
          <div class="loginPassword">
            <label class="fieldLabel">
              <strong>Password:</strong>
            </label>
            <input class="passwordInputField" type="password" />
          </div>
          <!-- forgot password link -->
          <a class="forgotPasswordText" href>Forgot Password?</a>
          <!-- login button -->
          <div>
            <button class="loginButton" type="submit">
              <strong>Log in</strong>
            </button>
          </div>
        </div>
      </div>

      <div class="register">
        <div class="innerSplash">
          <h1 class="splashText">Register</h1>
          <!-- email -->
          <div class="registerEmail">
            <label class="fieldLabel">
              <strong>Email:</strong>
            </label>
            <input class="textInputField" type="text" />
          </div>
          <!-- username -->
          <div class="registerUsername">
            <label class="fieldLabel">
              <strong>Username:</strong>
            </label>
            <input class="textInputField" type="text" />
          </div>
          <!-- password -->
          <div class="registerPassword">
            <label class="fieldLabel">
              <strong>Password:</strong>
            </label>
            <input class="passwordInputField" type="password" />
          </div>
          <!-- checkbox for family code -->
          <div>
            <input class="familyCodeCheckbox" type="checkbox" />
            <label class="checkboxText">
              <strong>I have a family code</strong>
            </label>
          </div>
          <!-- family code input field -->
          <div class="registerFamilyCode">
            <label class="fieldLabel">
              <strong>Family Code:</strong>
            </label>
            <input class="familyCodeInput" type="text" />
          </div>
          <!-- register button -->
          <div>
            <button class="registerButton" type="submit">
              <strong>Register</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // Used to get data from Vuex store

export default {
  name: "SplashPage",
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
    };
  },
  computed: {
    // Computed variables
  },
  methods: {
    // Methods in this component
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- We'll put global css in App.vue -->
<style scoped>
/* Use classes to create css */
/* If you want dynamic application of css, create a computed variable in computed section */
/* Then apply by binding it to html tag by using :class="computedClass" */

/* colour and settings for the background of the splash page */
.mainScreen {
  width: 98%;
  height: 98vh;
  background: linear-gradient(
      45deg,
      rgba(9, 36, 158, 0.5),
      rgba(73, 173, 206, 0.5),
      transparent
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(10, 80, 104, 0.5),
      rgba(230, 14, 14, 0.5)
    );
  margin: 0;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 1%;
  padding-right: 1%;
}

/* settings for text on the splash page */
.splashText {
  color: white;
  text-align: center;
  margin-top: 2%;
}

/* settings for all of the text input boxes */
.textInputField {
  width: 20vw;
  height: 4vh;
  padding-left: 1%;
  padding-right: 1%;
  box-sizing: border-box;
  border: 0;
  border-radius: 5vw;
}

.passwordInputField {
  width: 20vw;
  height: 4vh;
  padding-left: 1%;
  padding-right: 1%;
  box-sizing: border-box;
  border-radius: 5vw;
  border: 0;
}

/* styling for login portion of the splash screen */
.login {
  float: left;
  height: 80vh;
  width: 40vw;
  padding: 0;
  background-color: RGB(240, 248, 255, 0.4);
  border-radius: 5vw;
  margin-left: 6vw;
  margin-top: 10vh;
}

.innerSplash {
  display: block;
  text-align: center;
}

.loginUsername {
  color: white;
  margin-top: 13.5vh;
  margin-left: 1.5vw;
}

.loginPassword {
  color: white;
  margin-top: 5vh;
  margin-bottom: 1vh;
  border: 0;
}

.fieldLabel {
  padding-right: 0.5vw;
}

.forgotPasswordText {
  font-size: 14px;
  margin-left: 8%;
  padding: 1%;
  border: 0;
}

.loginButton {
  min-width: 30px;
  margin-top: 22.5vh;
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 4.5%;
  padding-right: 4.5%;
  background-color: rgba(73, 173, 206, 0.4);
  border: none;
  border-radius: 25%;
  color: white;
  font-size: 16px;
  text-align: center;
}

/* time for the register form */
.register {
  height: 80vh;
  width: 40vw;
  padding: 0;
  background-color: RGB(240, 248, 255, 0.4);
  border-radius: 5vw;
  margin-right: 6vw;
  margin-top: 10vh;
  float: right;
}

.registerUsername {
  color: white;
  margin-top: 5vh;
  border: 0;
}

.registerPassword {
  color: white;
  margin-top: 5vh;
  margin-bottom: 1vh;
  border: 0;
}

.registerEmail {
  color: white;
  margin-top: 4vh;
  margin-bottom: 1vh;
  margin-left: 2vw;
  border: 0;
}

.familyCodeCheckbox {
  margin-top: 3vh;
  margin-left: -5vw;
  border: 0;
}

.checkboxText {
  margin-left: 0vw;
  color: white;
  font-size: 14px;
}

.registerFamilyCode {
  color: white;
  margin-top: 3vh;
  margin-bottom: 1vh;
  margin-left: -13vw;
  border: 0;
}

.familyCodeInput {
  width: 8vw;
  height: 4vh;
  padding-left: 1%;
  padding-right: 1%;
  box-sizing: border-box;
  border-radius: 5vw;
  border: 0;
}

.registerButton {
  min-width: 30px;
  margin-top: 12.5vh;
  padding: 3%;
  background-color: rgba(73, 173, 206, 0.4);
  border: none;
  border-radius: 25%;
  color: white;
  font-size: 16px;
  text-align: center;
}
</style>
