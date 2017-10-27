<template>
  <div>
    <h3 class="setting-area" @click="showCoin">Setting Coin</h3>
    <Modal
      v-model="isShowCoin"
      :mask-closable="false"
      title="Set Coin"
    >
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowCoin: false,
      };
    },
    methods: {
      showCoin() {
        this.isShowCoin = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .setting-area{
    @extend %setting_area;
  }
</style>