import Vue from 'vue';
import Vuex from 'vuex';
import CONFIG from './config.js';

Vue.use(Vuex);

console.log('hola 1', CONFIG);

export default new Vuex.Store({
  state: {
    isLogged: !!localStorage.token,
    BACKEND_URL_BASE: CONFIG.isLocal ? CONFIG.urls.BACKEND_URL_BASE_LOCAL : CONFIG.urls.BACKEND_URL_BASE
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
    },
    getBackendURLBase: state => {

      return state.BACKEND_URL_BASE;
    }
  }
});
