<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script>
  import api from '@/utils/api';
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
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
          },
          {
            title: state.currency,
            key: 'price',
          },
          {
            title: 'Volume(24h)',
            key: 'volumeByTime',
          },
          {
            title: 'Volume(%)',
            key: 'volumeByPercent',
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
        this.fetchExchangeInfos(val);
      },
    },
    created() {
      this.fetchExchangeInfos(this.currentExchangeState);
    },
    methods: {
      async fetchExchangeInfos(ex) {
        try {
          const data = await api.get(`/exchanges/${ex}`);
          this.data = data.exchangeInfos;
        } catch (e) {
          this.$Message.error({
            content: e,
            duration: 2,
          });
        }
      },
    },
  };
</script>
