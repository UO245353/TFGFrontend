import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import AdminList from './views/AdminList.vue';
import Admin from './views/Admin.vue';
import ThemeList from './views/ThemeList.vue';
import Theme from './views/Theme.vue';

Vue.use(Router);

let router = new Router({
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
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/theme-list',
      name: 'theme-list',
      component: ThemeList
    },
    {
      path: '/theme',
      name: 'theme',
      component: Theme
    }
  ]
});

router.beforeEach((to, from, next) => {

  if(!!localStorage.token || to.name === 'login'){
    next();
  }
});

export default router;
