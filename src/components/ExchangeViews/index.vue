<template>
  <div>
    <ExchangeSelector />
    <CoinTable />
    <CoinSetting />
  </div>
</template>

<script>
  import ExchangeSelector from './ExchangeSelector';
  import CoinTable from './CoinTable';
  import CoinSetting from './CoinSetting';

  export default {
    data() {
      return {

      };
    },
    components: {
      ExchangeSelector,
      CoinTable,
      CoinSetting,
    },
  };
</script>

<style>

</style>
