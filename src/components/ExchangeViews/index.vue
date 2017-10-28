<template>
  <div>
    <ExchangeSelector @handleShowExchangeModal="showExchangeModal" />
    <CoinTable />
    <h3 class="setting-area" @click="showCoinModal">Setting Coin</h3>
    <Modal
      v-model="isShowCoin"
      :mask-closable="false"
      class-name="setting-wrap"
      title="Set Coin"
    >
      <CoinSetting />
    </Modal>
    <Modal
      v-model="isShowExchange"
      :mask-closable="false"
      class-name="setting-wrap"
      title="Set Exchange"
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
        console.log(2);
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
