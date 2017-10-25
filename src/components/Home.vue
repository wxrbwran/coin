<template>
  <div class="home">
    <div class="home-selectors">
      <ViewSelector />
      <CurrencySelector />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import ViewSelector from './ViewSelector';
  import CurrencySelector from './CurrencySelector';

  export default {
    data() {
      return {};
    },
    components: {
      ViewSelector,
      CurrencySelector,
    },
  };
</script>

<style lang="scss" scoped>
  .home-selectors{
    margin: 15px 0 10px;
    @include flex(row, nowrap, space-between, center);
  }
</style>
