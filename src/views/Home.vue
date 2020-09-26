<template>
  <div class="home">
    <div class="home__btn-box">
      <v-btn @click="logout()" color="dark" fab dark>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
    <HelloWorld msg="Welcome to Foooody App" />
    <Cart />
    <v-container>
      <v-row>
        <v-col v-for="food in foods" :key="food.id" cols="12" sm="6" md="4" lg="3">
          <Card
            :id="food.id"
            :name="food.name"
            :image="food.image"
            :price="food.price"
            :amount="food.amount"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Card from '@/components/card.vue';
import Cart from '@/components/cart.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Card,
    Cart,
  },
  computed: {
    foods() {
      return this.$store.getters.foods;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH_LOGOUT').then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .home{
    position: relative;
    &__btn-box{
      position: fixed;
      z-index: 99;
      right: 27px;
      top: 20px;
    }
  }
</style>
