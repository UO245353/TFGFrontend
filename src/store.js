import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: !!localStorage.token
  },
  mutations: {
    logOut(state){

      delete localStorage.token;

      state.isLogged = false;
    },
    logIn(state){
      state.isLogged = true;
    }
  },
  getters: {
    getIsLogged: state => {

      return state.isLogged;
    }
  }
});
