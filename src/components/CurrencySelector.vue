<template>
  <Select
    :value="currency"
    style="width:100px"
    @on-change="handleCurrencyChange"
  >
    <Option
      v-for="item in currencies"
      :value="item.currency"
      :key="item.value"
    >
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        currencies: [{
          currency: 'USD',
          label: 'USD',
        }, {
          currency: 'CNY',
          label: 'CNY',
        }],
      };
    },
    computed: mapState(['currency']),
    methods: {
      ...mapMutations([
        'handleCurrencyChange',
      ]),
    },
  };
</script>

<style scoped>

</style>