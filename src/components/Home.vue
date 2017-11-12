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
  .home{
    margin: 0 auto;
    max-width: 1400px;
  }
  .home-selectors{
    text-align: left;
    margin: 40px 0 20px 0;
  }
</style>
