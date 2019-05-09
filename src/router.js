import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import AdminList from './views/AdminList.vue';

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
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to ,from);
  next();
});

export default router;
