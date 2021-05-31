<template>
  <div v-if="!['login', 'signup'].includes($route.name)">
    <div class="header">
      <div>
        <b-dropdown size="sm" right id="dropdown-1" :text="username" class="mt-2 navigation-btn"  variant="outline-secondary">
          <b-dropdown-item v-b-modal.modal-logout>Logout</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <b-modal id="modal-logout" title="Logout">
      <p class="my-4">You want to logout?</p>
      <template v-slot:modal-footer>
        <b-button size="sm" variant="secondary" @click="$bvModal.hide('modal-logout')">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" @click="logout()">
          Logout
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import store from "../../store/index.js"

export default {
  data() {
    return {
      isVisible: false,
      username: null,
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      this.username = this.$store.getters.username ? this.$store.getters.username : "User";
    }
  },
  methods: {
    logout() {
      store.commit("LOGOUT");
      this.$router.push({
        name: "login"
      })
    }
  },
  created() {
    this.username = store.getters.username;
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: "Source Sans Pro", sans-serif;
  background-color: #d5dae5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.header {
  width: 100%;
  z-index: 3;
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #fff;
  border-bottom: 3px solid #ffffff;
  -webkit-box-shadow: 0 5px 5px -6px rgb(87, 87, 87);
  -moz-box-shadow: 0 5px 5px -6px rgb(87, 87, 87);
  box-shadow: 0 5px 5px -6px rgb(87, 87, 87);
}
.nav-link{
  padding: 0px;
  transition: 0.3s;
}
.nav-link:hover{
  padding-right: 20px;
  border-right: #35475e 4px solid;
}
.dropdown{
  float: right;
}
</style>
