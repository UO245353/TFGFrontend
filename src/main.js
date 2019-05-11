import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './mycss/customCSS.css';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.mixin({
  data: function() {
    return {
      hasToken: false
    };
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
