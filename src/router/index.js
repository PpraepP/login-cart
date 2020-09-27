import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const storeValue = store.getters.storeCart;
const ifNotAuthenticated = (to, from, next) => {
  const status = localStorage.getItem('status');
  console.log('status', status);
  if (!status) { next('/login'); }
  next();
};

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/Product-summary.vue'),
      beforeEnter(to, from, next) {
        const status = localStorage.getItem('status');
        if (status) {
          if (storeValue.length === 0) next('/');
          else next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '*',
      redirect: '/',
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
  ],
});
