<template>
  <div class="home-views">
    <ExchangeSelector @handleShowExchangeModal="showExchangeModal" />
    <CoinTable />
    <h3 class="setting-area" @click="showCoinModal">
      {{ $t('index.settingCoin') }}
    </h3>
    <Modal
      v-model="isShowCoin"
      :mask-closable="false"
      class-name="setting-wrap"
      :title="$t('index.settingCoin')"
    >
      <CoinSetting :in-table="true" />
    </Modal>
    <Modal
      v-model="isShowExchange"
      :mask-closable="false"
      class-name="setting-wrap"
      :title="$t('index.settingExchange')"
    >
      <ExchangeSetting />
    </Modal>
  </div>
</template>

<script>
  import ExchangeSelector from './ExchangeSelector';
  import CoinTable from './CoinTable';
  import CoinSetting from '../SettingModal/CoinSetting';
  import ExchangeSetting from '../SettingModal/ExchangeSetting';

  export default {
    data() {
      return {
        isShowCoin: false,
        isShowExchange: false,
      };
    },
    components: {
      ExchangeSelector,
      CoinTable,
      CoinSetting,
      ExchangeSetting,
    },
    methods: {
      showCoinModal() {
        this.isShowCoin = true;
      },
      showExchangeModal() {
        this.isShowExchange = true;
      },
    },
  };
</script>

<style lang="scss">
  .setting-area{
    @extend %setting_area;
  }
</style>
