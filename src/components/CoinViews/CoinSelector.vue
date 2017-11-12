<template>
  <div class="selector">
    <ul>
      <li
        v-for="coin in coins"
        :class="currentCoin === coin ? 'active' : ''"
        @click="handleCoinChange(coin)"
      >
        {{ coin }}
      </li>
    </ul>
    <div @click="showCoinModal">
      <img :src="plusIcon" alt="add_coin" />
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
      coins: 'defaultCoins',
      currentCoin: 'currentCoin',
    }),
    methods: {
      showCoinModal() {
        this.$emit('handleShowCoinModal');
      },
      ...mapMutations(['handleCoinChange']),
    },
  };
</script>

<style lang="scss" scoped>
	.selector{
		@include flex(row, nowrap, space-between, center);
    @include lh(58px);
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
      vertical-align: middle;
      @include size(18px);
	  }
	}
</style>
