<template>
  <div>
    <CoinSelector />
    <CoinTable />
  </div>
</template>

<script>
  import CoinSelector from './CoinSelector';
  import CoinTable from './CoinTable';

  export default {
    data() {
      return {

      };
    },
    components: {
      CoinSelector,
      CoinTable,
    },
  };
</script>

<style>

</style>