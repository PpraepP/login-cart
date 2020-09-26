<template>
    <div class="container">
        <h2>Product summary</h2>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                    <th
                    v-for="header in headers"
                    :key="header.name"
                    class="text-center align-middle">{{header.text}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in productInCart" :key="item.name">
                    <td class="align-middle">{{ item.name }}</td>
                    <td class="align-middle">{{ item.price }}</td>
                    <td class="align-middle">{{ item.amount }}</td>
                    <td class="align-middle">{{ item.totalPrice }}</td>
                </tr>
                <tr class="tr-footer">
                    <td colspan="4" class="align-middle">Total {{ totalPrice }}</td>
                </tr>
            </tbody>
            </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'product',
  data() {
    return {
      headers: [
        {
          text: 'Menu',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        { text: 'Quanity', align: 'center', value: 'amount' },
        { text: 'Price', align: 'center', value: 'price' },
        { text: 'Total Price', align: 'center', value: 'totalPrice' },
      ],
    };
  },
  computed: {
    productInCart() {
      const product = this.$store.getters.storeCart.map(
        (item) => {
          const foodMatch = this.$store.getters.foods.find(
            (food) => item.id === food.id,
          );
          const { amount } = item;
          const { name, price } = foodMatch;
          const totalPrice = amount * price;
          const inStore = {
            name,
            price,
            amount,
            totalPrice,
          };
          return inStore;
        },
      );
      console.log('product', product);
      return product;
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
  },
};
</script>

<style lang="scss" scoped>
    table {
        .v-data-table__wrapper{
            box-shadow: 0px 0px 6px 0px #d8d3cd;
        }
    }
</style>
