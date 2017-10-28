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
      currentExchangeState: 'currentExchange',
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
            title: state.currency,
            key: 'price',
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
      currentExchangeState(val) {
        this.fetchExchangeInfos(val);
      },
    },
    created() {
      this.fetchExchangeInfos(this.currentExchangeState);
    },
    methods: {
      async fetchExchangeInfos(ex) {
        this.loading = true;
        try {
          const data = await api.get(`/exchanges/${ex}`);
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
