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
    <Icon type="plus" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        coins: ['BTC', 'LTC', 'ETC', 'BCH', 'EOS', 'SNT'],
      };
    },
    computed: mapState({
      currentCoin: 'currentCoin',
    }),
    methods: {
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