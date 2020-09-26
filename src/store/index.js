import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    account: [
      {
        id: 'user01',
        username: 'ppadmin',
        password: 'pp1234',
      },
      {
        id: 'user02',
        username: 'aadmin',
        password: 'aa1234',
      },
    ],
    foods: [
      {
        id: '001',
        name: 'pancake',
        image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        price: 180,
        amount: 15,
      },
      {
        id: '002',
        name: 'salad',
        image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        price: 150,
        amount: 16,
      },
      {
        id: '003',
        name: 'cake',
        image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        price: 120,
        amount: 8,
      },
      {
        id: '004',
        name: 'pizza',
        image: 'https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        price: 280,
        amount: 25,
      },
      {
        id: '005',
        name: 'bread with egg',
        image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        price: 175,
        amount: 6,
      },
      {
        id: '006',
        name: 'spaghetti tometo',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        price: 185,
        amount: 12,
      },
      {
        id: '007',
        name: 'noodle',
        image: 'https://images.pexels.com/photos/286283/pexels-photo-286283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        price: 165,
        amount: 8,
      },
      {
        id: '008',
        name: 'salmon steak',
        image: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        price: 200,
        amount: 5,
      },
    ],
    statusUser: [],
    storeCart: [],
    // cart
  },
  mutations: {
    ADD_TO_CART(state, selectedFood) {
      const orderStore = state.storeCart.find((e) => e.id === selectedFood.id);
      const orderMenu = state.foods.find((item) => item.id === selectedFood.id);
      if (orderStore) {
        if (orderStore.amount < orderMenu.amount) {
          orderStore.amount += 1;
        }
      } else {
        state.storeCart.push(selectedFood);
      }
    },
    DECREASE_AMOUNT(state, menuID) {
      const orderStore = state.storeCart.find((e) => e.id === menuID);
      if (orderStore.amount > 0) {
        orderStore.amount -= 1;
        if (orderStore.amount <= 0) {
          const index = state.storeCart.findIndex((i) => i.id === menuID);
          state.storeCart.splice(index, 1);
        } else {
          state.storeCart.slice(orderStore.amount);
        }
      }
    },
    INCREASE_AMOUNT(state, menuID) {
      const orderStore = state.storeCart.find((e) => e.id === menuID);
      const orderMenu = state.foods.find((item) => item.id === menuID);
      if ((orderStore.amount >= 0) && (orderStore.amount < orderMenu.amount)) {
        orderStore.amount += 1;
        state.storeCart.slice(orderStore.amount);
      }
    },
    AUTH_REQUEST(state, inputValue) {
      state.statusUser.push(inputValue);
      localStorage.setItem('status', true);
    },
    AUTH_LOGOUT() {
      localStorage.removeItem('status');
    },
  },
  actions: {
    addFood(context, selectedFood) {
      context.commit('ADD_TO_CART', selectedFood);
    },
    decrease(context, menuID) {
      context.commit('DECREASE_AMOUNT', menuID);
    },
    increase(context, menuID) {
      context.commit('INCREASE_AMOUNT', menuID);
    },
    AUTH_REQUEST(context, inputValue) {
      context.commit('AUTH_REQUEST', inputValue);
    },
    AUTH_LOGOUT({ commit }) {
      commit('AUTH_LOGOUT');
    },
  },
  getters: {
    foods: (state) => state.foods,
    storeCart: (state) => state.storeCart,
    account: (state) => state.account,
    statusUser: (state) => state.statusUser,
  },
});

export default store;
