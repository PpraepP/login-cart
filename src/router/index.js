import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const status = localStorage.getItem('status');
const xx = store.getters.storeCart;
const ifNotAuthenticated = (to, from, next) => {
  console.log('status :', status);
  if (!status) { next('/login'); }
  next();
};

const ifStoreEmpty = (to, from, next) => {
  if (!status) next('/login');
  if (xx.length === 0) next('/');
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
      beforeEnter: ifStoreEmpty,
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
