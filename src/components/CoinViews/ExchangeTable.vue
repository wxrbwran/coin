<template>
  <div>
    <Table :loading="loading" :columns="columns" :data="data"></Table>
    <Switch v-model="loading"></Switch>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '@/utils/api';
  import formatCurrency from '@/utils/formatCurrency';

  export default {
    data() {
      return {
        loading: false,
        data: [],
      };
    },
    computed: mapState({
      currentCoinState: 'currentCoin',
      exchangesInTable: 'exchangesInTable',
      columns(state) {
        return [
          {
            title: '#',
            key: 'index',
            width: 75,
          },
          {
            title: 'Source',
            key: 'source',
          },
          {
            title: 'Pair',
            key: 'pair',
            render() {
              return `${state.currentCoin}/${state.currency}`;
            },
          },
          {
            title: 'Price',
            key: 'price',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerHTML: `${formatCurrency({
                    number: params.row.price,
                    precision: 2,
                    symbol: '&yen;',
                  })} / ${formatCurrency({
                    number: params.row.priceByDollar,
                    precision: 2,
                  })}`,
                },
              },
            ),
          },
          {
            title: 'Volume(24h)',
            key: 'volumeByTime',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerHTML: `${formatCurrency({
                    number: params.row.volumeByTime,
                    precision: 2,
                  })}`,
                },
              },
            ),
          },
          {
            title: 'Volume(%)',
            key: 'volumeByPercent',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerHTML: `${params.row.volumeByPercent}%`,
                },
              },
            ),
          },
          {
            title: 'Updated',
            key: 'updated',
          },
        ];
      },
    }),
    watch: {
      currentCoinState() {
        this.fetchCoinInfos();
      },
      exchangesInTable() {
        this.fetchCoinInfos();
      },
    },
    created() {
      this.fetchCoinInfos();
    },
    methods: {
      async fetchCoinInfos() {
        this.loading = true;
        const coin = this.currentCoinState;
        try {
          const data = await api.get(`/exchanges/${coin}`, {
            params: {
              exchanges: this.exchangesInTable.join(','),
            },
          });
          this.data = data.exchangeInfos;
          this.loading = false;
        } catch (e) {
          this.$Message.error({
            content: e,
            duration: 2,
          });
          this.loading = false;
        }
      },
    },

  };
</script>
