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
      <img :src="plusIcon" alt="add_selector">
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import plusIcon from '../../assets/img/Rectangle@2x.png';

  export default {
    data() {
      return {
        plusIcon,
      };
    },
    computed: mapState({
      exchanges: 'defaultExchanges',
      currentExchange: 'currentExchange',
    }),
    methods: {
      showExchangeModal() {
        this.$emit('handleShowExchangeModal');
      },
      ...mapMutations(['handleExchangeChange']),
    },
  };
</script>

<style lang="scss" scoped>
  .selector{
    @include flex(row, nowrap, space-between, center);
    @include lh(58px);
    background-color: $bg-color;
    border: 1px solid $borderColor;
    border-bottom: none;
    padding: 0 10px;
    li{
      margin-right: 30px;
      display: inline-block;
      cursor: pointer;
      color: $main-color;
      font-size: 16px;
      font-weight: normal;
    }
    .active{
      font-weight: bold;
    }
    img{
      cursor: pointer;
      @include size(18px);
      vertical-align: middle;
    }
  }
</style>
