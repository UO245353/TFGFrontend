import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import AdminList from './views/AdminList.vue';
import ThemeList from './views/ThemeList.vue';
import store from './store.js';

Vue.use(Router);

let router = new Router({
  transitionOnLoad: true,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin-list',
      name: 'admin-list',
      component: AdminList
    },
    {
      path: '/theme-list',
      name: 'theme-list',
      component: ThemeList
    },
    {
      path: '/theme/:themeId/contents',
      name: 'theme-contents',
      component: ThemeList
    },
    {
      path: '/theme/:themeId/questions',
      name: 'theme-questions',
      component: ThemeList
    },
  ]
});

router.beforeEach((to, from, next) => {

  if(to.name === 'login'){
    store.commit('logOut');
  }

  if(!!store.getters.getIsLogged || to.name === 'login'){
    next();
  }
});

export default router;
