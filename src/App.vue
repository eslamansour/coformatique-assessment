<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view ref="messageRef" class="pageContent"></router-view>
    <div v-if="!['login', 'signup', 'NotFound'].includes($route.name)" class="footer" >
      <b-form-textarea
        class="newMessage"
        id="textarea-default"
        @keypress='ClientOnTyping($event);'
        v-model="newMessage"
        placeholder="Type a message then press `Enter`."
      ></b-form-textarea>
      </div>
  </div>
</template>

<script>
import navBar from "./components/navBar/Navbar.vue";

export default {
  data() {
    return {
      newMessage: ""
    };
  },
  components:{
    navBar
  },
  methods: {
    ClientOnTyping(e) {
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        if(this.newMessage)
          this.$refs.messageRef.addMessage(this.newMessage)
        this.newMessage = ""
      }
    },
  }
};
</script>

<style scoped lang="scss">
  @font-face {
    font-family: "cairo-bold";
    src: url("../src/assets/fonts/Cairo-Bold.ttf");
  }
  @font-face {
    font-family: "cairo-regular";
    src: url("../src/assets/fonts/Cairo-Regular.ttf");
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "cairo-regular" !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .pageContent{
    padding: 10px 20px;
    margin-top: 76px;
    margin: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow:#c2c2c2 1px 0px 6px 0px;
  }
  .footer{
    background-color: #ebebeb;
    width: 100%;
    position: fixed;
    bottom: 0px;
  }
  .newMessage{
    height: auto;
    width: 95%;
    margin: auto;
    margin-bottom: 30px;
  }
</style>
