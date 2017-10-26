<template>
  <div>
    <ExchangeSelector />
    <ExchangeTable />
    <CoinSetting />
  </div>
</template>

<script>
  import ExchangeSelector from './ExchangeSelector';
  import ExchangeTable from './ExchangeTable';
  import CoinSetting from './CoinSetting';

  export default {
    data() {
      return {

      };
    },
    components: {
      ExchangeSelector,
      ExchangeTable,
      CoinSetting,
    },
  };
</script>

<style>

</style>
