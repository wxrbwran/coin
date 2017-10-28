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
      <Icon type="plus" />
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
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
