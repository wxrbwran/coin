<template>
  <div>
    <CoinSelector />
    <ExchangeTable />
    <ExchangeSetting />
  </div>
</template>

<script>
  import CoinSelector from './CoinSelector';
  import ExchangeTable from './ExchangeTable';
  import ExchangeSetting from './ExchangeSetting';

  export default {
    data() {
      return {

      };
    },
    components: {
      CoinSelector,
      ExchangeTable,
      ExchangeSetting,
    },
  };
</script>

<style>

</style>
