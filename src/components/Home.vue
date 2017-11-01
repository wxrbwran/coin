<template>
  <div class="home">
    <div class="home-selectors">
      <ViewSelector />
      <CurrencySelector />
    </div>
    <div v-if="isCoinView">
      <CoinViews />
    </div>
    <div v-else>
      <ExchangeViews />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import CoinViews from '@/components/CoinViews';
  import ExchangeViews from '@/components/ExchangeViews';
  import ViewSelector from './ViewSelector';
  import CurrencySelector from './CurrencySelector';

  export default {
    data() {
      return {};
    },
    computed: mapState({
      isCoinView: state => state.currentView === 'coins',
    }),
    components: {
      ViewSelector,
      CurrencySelector,
      CoinViews,
      ExchangeViews,
    },
  };
</script>

<style lang="scss" scoped>
  .home-selectors{
    margin: 15px 0 10px;
    @include flex(row, nowrap, space-between, center);
  }
</style>
