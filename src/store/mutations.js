const mutations  = {
  SET_USERNAME(state, user_name) {
    state.user_name = user_name;
  },
  LOGOUT(state) {
    state.user_name = null;
  }
}
export default mutations 
