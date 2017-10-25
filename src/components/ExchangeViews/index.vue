<template>
  <div>
    <ExchangeSelector />
    <ExchangeTable />
  </div>
</template>

<script>
  import ExchangeSelector from './ExchangeSelector';
  import ExchangeTable from './ExchangeTable';

  export default {
    data() {
      return {

      };
    },
    components: {
      ExchangeSelector,
      ExchangeTable,
    },
  };
</script>

<style>

</style>
