<template>
	<div class="selector">
		<ul>
			<li v-for="ex in exchanges">
				{{ ex }}
			</li>
		</ul>
		<Icon type="plus" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				exchanges: ['Bitfinexs', 'Bittres', 'Poloniex',
					'Bitthumb', 'Liqui'],
			};
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
	i{
		cursor: pointer;
	}
	}
</style>