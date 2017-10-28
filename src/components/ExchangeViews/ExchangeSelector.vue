<template>
  <div class="selector">
    <ul>
      <li
        v-for="ex in exchanges"
        :class="currentExchange === ex ? 'active' : ''"
        @click="handleExchangeChange(ex)"
      >
        {{ ex }}
      </li>
    </ul>
    <div @click="showExchangeModal">
      <Icon type="plus" />
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        exchanges: ['Bitfinexs', 'Bittres', 'Poloniex',
          'Bitthumb', 'Liqui'],
      };
    },
    computed: mapState({
      currentExchange: 'currentExchange',
    }),
    methods: {
      showExchangeModal() {
        console.log(1);
        this.$emit('handleShowExchangeModal');
      },
      ...mapMutations(['handleExchangeChange']),
    },
  };
</script>

<style lang="scss" scoped>
  .selector{
  @include flex(row, nowrap, space-between, center);
    border: 1px solid $borderColor;
    border-bottom: none;
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
  li{
    margin-right: 30px;
    display: inline-block;
    cursor: pointer;
  }
  .active{
    color: $activeColor;
  }
  i{
    cursor: pointer;
  }
  }
</style>
