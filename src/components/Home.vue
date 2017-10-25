<template>
  <div class="home">
    <div class="home-selectors">
      <ViewSelector />
      <CurrencySelector />
    </div>
    <CoinSelector />
    <CoinTable />
  </div>
</template>

<script>
  import ViewSelector from './ViewSelector';
  import CurrencySelector from './CurrencySelector';
  import CoinSelector from './CoinSelector';
  import CoinTable from './CoinTable';

  export default {
    data() {
      return {};
    },
    components: {
      ViewSelector,
      CurrencySelector,
      CoinSelector,
      CoinTable,
    },
  };
</script>

<style lang="scss" scoped>
  .home-selectors{
    margin: 15px 0 10px;
    @include flex(row, nowrap, space-between, center);
  }
</style>
