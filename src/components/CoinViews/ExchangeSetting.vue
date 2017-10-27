<template>
  <div>
    <h3 class="setting-area" @click="showExchange">Setting Exchange</h3>
    <Modal
      v-model="isShowExchange"
      :mask-closable="false"
      class-name="setting-wrap"
      title="Set Exchange"
    >
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
  .setting-area{
    @extend %setting_area;
  }
</style>
