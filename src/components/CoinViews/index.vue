<template>
  <div class="home-views">
    <CoinSelector @handleShowCoinModal="showCoinModal" />
    <ExchangeTable />
    <h3 class="setting-area" @click="showExchangeModal">
      {{ $t('index.settingExchange') }}
    </h3>
    <Modal
      v-model="isShowCoin"
      :mask-closable="false"
      class-name="setting-wrap"
      :title="$t('index.settingCoin')"
    >
      <CoinSetting />
    </Modal>
    <Modal
      v-model="isShowExchange"
      :mask-closable="false"
      class-name="setting-wrap"
      :title="$t('index.settingExchange')"
    >
      <ExchangeSetting :in-table="true" />
    </Modal>
  </div>
</template>

<script>
  import CoinSelector from './CoinSelector';
  import ExchangeTable from './ExchangeTable';
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
      CoinSelector,
      ExchangeTable,
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
