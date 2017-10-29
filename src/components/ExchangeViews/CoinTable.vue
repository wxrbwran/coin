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
            title: 'Currency',
            key: 'currency',
          },
          {
            title: 'Pair',
            key: 'pair',
            render() {
              return `USD/${state.currency}`;
            },
          },
          {
            title: 'Price',
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
