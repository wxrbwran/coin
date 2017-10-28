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
      currentCoinState: 'currentCoin',
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
//                on: {
//                  click: () => {
//                    console.log(params.row.volumeByPercent);
//                  },
//                },
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
      currentCoinState(val) {
        this.fetchCoinInfos(val);
      },
    },
    created() {
      this.fetchCoinInfos(this.currentCoinState);
    },
    methods: {
      async fetchCoinInfos(coin) {
        this.loading = true;
        try {
          const data = await api.get(`/coins/${coin}`);
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