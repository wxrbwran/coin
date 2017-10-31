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
            title: this.$t('index.tableColumn.source'),
            key: 'source',
          },
          {
            title: this.$t('index.tableColumn.pair'),
            key: 'pair',
            render() {
              return `${state.currentCoin}/${state.currency}`;
            },
          },
          {
            title: this.$t('index.tableColumn.price'),
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
            title: this.$t('index.tableColumn.volumeByTime'),
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
            title: this.$t('index.tableColumn.volumeByPercent'),
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
            title: this.$t('index.tableColumn.updated'),
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
