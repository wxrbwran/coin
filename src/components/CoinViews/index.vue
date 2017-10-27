<template>
  <div>
    <CoinSelector />
    <CoinTable />
    <ExchangeSetting />
  </div>
</template>

<script>
  import CoinSelector from './CoinSelector';
  import CoinTable from './CoinTable';
  import ExchangeSetting from './ExchangeSetting';

  export default {
    data() {
      return {

      };
    },
    components: {
      CoinSelector,
      CoinTable,
      ExchangeSetting,
    },
  };
</script>

<style>

</style>
