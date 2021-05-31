import store from "../store/index.js"

const isLoggedIn = function (from, to, next) {
  if(!store.getters.username) {
    store.commit("LOGOUT");
    next({name:'login'})
  }
  else {
    next();
  }
};

export default {
  isLoggedIn,
};
