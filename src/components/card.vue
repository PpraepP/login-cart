<template>
  <v-card>
    <div class="v-card__img-box">
      <img class="w-100" :src="image" alt />
    </div>
    <div class="v-card__content">
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text>
        <div class="v-card__text--price">{{ price + " bath." }}</div>
        <div class="v-card__text--amount">Quantity {{ amount }}</div>
      </v-card-text>
      <v-btn color="error" @click="addToCart()">Order now</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'card',
  props: ['id', 'name', 'image', 'price', 'amount'],
  methods: {
    addToCart() {
      const selectedFood = {
        id: this.id,
        amount: 1,
      };
      this.$store.dispatch('addFood', selectedFood);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  &__img-box {
    max-height: 350px;
    overflow: hidden;
    img {
      height: 350px;
      object-fit: cover;
    }
  }
  &__title {
    text-transform: capitalize;
  }
  &__content {
    padding-bottom: 20px;
    .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
      background-color: #ffbc42;
      color: #5e5e5f;
      font-weight: bold;
    }
  }
}
</style>
