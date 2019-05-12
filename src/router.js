import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import AdminList from './views/AdminList.vue';
import ThemeList from './views/ThemeList.vue';

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
      path: '/theme-list',
      name: 'theme-list',
      component: ThemeList
    }
  ]
});

router.beforeEach((to, from, next) => {

  if(to.name === 'login'){

    delete localStorage.token;
  }

  if(!!localStorage.token || to.name === 'login'){
    next();
  }
});

export default router;
