<template>
  <div class="cart__wrapper">
    <v-app id="cart-shop">
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="isDisabled"
              class="mx-2"
              fab
              dark
              large
              v-bind="attrs"
              v-on="on"
              color="error"
            >
              {{cartCount}}
              <v-icon dark>mdi-cart</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">Your Order</v-card-title>
            <v-card-text class="border-bottom">
              <div v-for="(item, index) in cart" :key="item.id" class="v-card__text--list">
                <div class="v-card__text--box d-flex justify-content-around">
                  <p>{{ index+1 }}.{{ item.name }}</p>
                  <p>Quantity : {{ item.amount }}</p>
                  <p>฿{{ item.amount * item.price }}</p>
                </div>
                <div class="v-card__text--btn-box">
                  <v-btn
                    @click="decreaseAmount(item.id)"
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                  <v-btn
                    @click="increaseAmount(item.id)"
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer>Total Price : {{ totalPrice }}</v-spacer>
              <v-btn color="primary" text @click="acceptCart">I accept</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'cart',
  props: ['id'],
  data() {
    return {
      xx: false,
      dialog: false,
    };
  },
  computed: {
    isDisabled() {
      const storeAmount = this.$store.getters.storeCart.map(
        (item) => item.amount,
      );
      const total = storeAmount.reduce((x, y) => x + y, 0);
      return total > 0 ? this.xx === true : this.xx === false;
      // if (total > 0) {
      //   return this.xx === true;
      // }
      // return this.xx === false;
    },
    cartCount() {
      const storeAmount = this.$store.getters.storeCart.map((item) => item.amount);
      const total = storeAmount.reduce((x, y) => x + y, 0);
      return total;
    },

    totalPrice() {
      const storePrice = this.$store.getters.storeCart.map((item) => {
        const foodMatch = this.$store.getters.foods.find(
          (food) => item.id === food.id,
        );
        const { price } = foodMatch;
        const { amount } = item;
        const sum = price * amount;
        return sum;
      });
      const total = storePrice.reduce((x, y) => x + y, 0);
      return total;
    },

    cart() {
      const result = this.$store.getters.storeCart.map((item) => {
        const foodMatch = this.$store.getters.foods.find(
          (food) => item.id === food.id,
        );
        const { name, price } = foodMatch;
        const { id, amount } = item;
        const finalData = {
          id,
          name,
          price,
          amount,
        };
        return finalData;
      });
      return result;
    },
  },
  methods: {
    decreaseAmount(id) {
      const menuID = id;
      this.$store.dispatch('decrease', menuID);
    },
    increaseAmount(id) {
      const menuID = id;
      this.$store.dispatch('increase', menuID);
    },
    acceptCart() {
      if (this.$store.getters.storeCart.length > 0) {
        this.$router.push('/product');
      }
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  &__wrapper {
    position: absolute;
    .v-application--wrap {
      button {
        position: fixed;
        right: 15px;
        z-index: 99;
      }
    }
    .theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
      background-color: rgba($color: gray, $alpha: 0.5) !important;
    }
  }
}
.v-card {
  &__text {
    &--list {
      padding: 15px 0;
      &:not(:last-child) {
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
      }
    }
  }
}
</style>
