<template>
  <div>
    <h3 class="set-exchange" @click="showExchange">Setting Exchange</h3>
    <Modal
      v-model="isShowExchange"
      :mask-closable="false"
      class-name="setting-wrap"
      title="Set Exchange"
    >
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowExchange: false,
      };
    },
    methods: {
      showExchange() {
        this.isShowExchange = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .set-exchange{
    @extend %setting_area;
  }
</style>