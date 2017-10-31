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
        data: [],
        loading: false,
      };
    },
    computed: mapState({
      currentExchangeState: 'currentExchange',
      coinsInTable: 'coinsInTable',
      columns(state) {
        return [
          {
            title: '#',
            key: 'index',
            width: 75,
          },
          {
            title: this.$t('index.tableColumn.currency'),
            key: 'currency',
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
            key: 'priceBYDollar',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerHTML: `${formatCurrency({
                    number: params.row.priceByDollar,
                    precision: 2,
                  })}`,
                },
              },
            ),
          },
          {
            title: this.$t('index.tableColumn.marketValue'),
            key: 'marketValue',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerHTML: `${formatCurrency({
                    number: params.row.marketValue,
                    precision: 2,
                  })}`,
                },
              },
            ),
          },
          {
            title: this.$t('index.tableColumn.increase'),
            key: 'increase',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerHTML: `${params.row.increase}%`,
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
      currentExchangeState() {
        this.fetchExchangeInfos();
      },
      coinsInTable() {
        this.fetchExchangeInfos();
      },
    },
    created() {
      this.fetchExchangeInfos();
    },
    methods: {
      async fetchExchangeInfos() {
        this.loading = true;
        const ex = this.currentExchangeState;
        try {
          const data = await api.get(`/coins/${ex}`, {
            params: {
              coins: this.coinsInTable.join(','),
            },
          });
          this.data = data.coinInfos;
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
