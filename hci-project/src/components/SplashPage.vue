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
            <input class="textInputField" type="text" v-model="loginEmail" />
          </div>
          <!-- password -->
          <div class="loginPassword">
            <label class="fieldLabel">
              <strong>Password:</strong>
            </label>
            <input class="passwordInputField" type="password" v-model="loginPassword" />
          </div>
          <!-- forgot password link -->
          <a class="forgotPasswordText" href>Forgot Password?</a>
          <!-- login button -->
          <ErrorMessage v-if="errorType>0" :type="errorType" class="loginError"></ErrorMessage>
          <div>
            <transition name="fade">
              <button v-if="loginDisabled" class="loginButton disabledButton" disabled key="1">
                <strong>Log in</strong>
              </button>
              <button v-else class="loginButton enabledButton" key="2" @click="login()">
                <strong>Log in</strong>
              </button>
            </transition>
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
            <input class="textInputField" type="text" v-model="registerEmail" />
          </div>
          <!-- username -->
          <div class="registerUsername">
            <label class="fieldLabel">
              <strong>Name:</strong>
            </label>
            <input class="textInputField" type="text" v-model="registerName" />
          </div>
          <!-- password -->
          <div class="registerPassword">
            <label class="fieldLabel">
              <strong>Password:</strong>
            </label>
            <input class="passwordInputField" type="password" v-model="registerPassword" />
          </div>
          <!-- checkbox for family code -->
          <div>
            <input class="familyCodeCheckbox" type="checkbox" v-model="isFamilyCode" />
            <label class="checkboxText">
              <strong>I have a family code</strong>
            </label>
            <font-awesome-icon
              icon="question-circle"
              class="whiteIcon"
              title="A family code is a 7 character code that adds your account into your family's group. If you are the first person to sign up, you can find your family code in the Settings page"
            />
          </div>
          <!-- family code input field -->
          <div class="registerFamilyCode" v-if="isFamilyCode">
            <label class="fieldLabel">
              <strong>Family Code:</strong>
            </label>
            <input class="familyCodeInput" type="text" v-model="registerFamilyCode" />
          </div>
          <!-- register button -->
          <div>
            <transition name="fade">
              <button
                v-if="registerDisabled"
                class="disabledButton registerButton"
                disabled
                key="3"
              >
                <strong>Register</strong>
              </button>
              <button v-else class="registerButton enabledButton" key="4">
                <strong>Register</strong>
              </button>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Used to get data from Vuex store
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "SplashPage",
  components: {
    // List of all components used in this component
    ErrorMessage
  },
  data() {
    // List of local data in this component
    return {
      // Variables go in here
      loginEmail: "baseballbobby@gmail.com",
      loginPassword: "baseball123",
      registerEmail: "",
      registerName: "",
      registerPassword: "",
      isFamilyCode: false,
      registerFamilyCode: "",
      userIndex: -1,
      errorType: -1
    };
  },
  computed: {
    // Computed variables
    ...mapGetters({
      users: "getUsers"
    }),
    loginDisabled: function () {
      return this.loginEmail == "" || this.loginPassword == "";
    },
    registerDisabled: function () {
      return (
        this.registerEmail == "" ||
        this.registerName == "" ||
        this.registerPassword == "" ||
        (this.isFamilyCode && this.registerFamilyCode == "")
      );
    }
  },
  methods: {
    // Methods in this component
    login() {
      this.errorType = -1;
      this.userIndex = -1;
      this.inputCheck();

      if (this.errorType < 0 && this.userIndex >= 0) {
        this.$store.dispatch("setCurrentUser", this.users[this.userIndex]);
      }
    },
    inputCheck() {
      // Error 1 - Email isn't formatted right (lacks an @ symbol)
      if (this.loginEmail.indexOf("@") < 0) {
        this.errorType = 1;
      }

      // Error 2 - User not found
      if (this.errorType < 0) {
        let found = -1;
        for (let i = 0; i < this.users.length && found < 0; i++) {
          if (this.users[i].email == this.loginEmail) {
            found = i;
          }
        }

        if (found < 0) {
          // Not found
          this.errorType = 2;
        } else {
          // Save the index of the user we want to add
          this.userIndex = found;
        }
      }

      // Error 3 - Incorrect password
      if (this.errorType < 0 && this.userIndex > 0) {
        if (this.users[this.userIndex].password != this.loginPassword) {
          this.errorType = 3;
        }
      }
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

/* colour and settings for the background of the splash page */
.mainScreen {
  width: 98%;
  height: 98vh;
  background: rgb(62, 95, 202);
  background: -webkit-linear-gradient(
    45deg,
    rgb(182, 233, 248),
    rgb(62, 95, 202)
  ); /* Chrome and old Safari */
  background: linear-gradient(
    -45deg,
    rgb(47, 148, 179),
    rgb(8, 87, 177)
  ); /* Edge/IE, Firefox, modern Safari */
  margin: 0;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 1%;
  padding-right: 1%;
  font-family: "Roboto";
}

/* settings for text on the splash page */
.splashText {
  color: white;
  text-align: center;
  margin-top: 2%;
  font-family: "Alata";
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
  width: 10vw;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 2vw;
  padding-right: 2vw;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  text-align: center;
  position: fixed;
  bottom: 15%;
  left: 0;
  margin-left: 22vw;
}

.loginError {
  width: 20vw;
  margin-left: 10vw;
  margin-top: 2%;
  border-radius: 20px;
  padding: 0.5%;
}

.enabledButton {
  background-color: rgb(62, 95, 202);
}

.disabledButton {
  background-color: rgb(47, 148, 179, 0.5);
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
  margin-left: 2vw;
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
  color: white;
}

.checkboxText {
  margin-left: 0vw;
  margin-right: 0.5vw;
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
  width: 10vw;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 2vw;
  padding-right: 2vw;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  text-align: center;
  position: fixed;
  bottom: 15%;
  right: 0;
  margin-right: 22vw;
}
/* Keep here to overwrite animation speed of normal fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
