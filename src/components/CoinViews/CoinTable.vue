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
        this.fetchCoinInfos(val);
      },
    },
    created() {
      this.fetchCoinInfos(this.currentCoinState);
    },
    methods: {
      async fetchCoinInfos(coin) {
        try {
          const data = await api.get(`/coins/${coin}`);
          this.data = data.coinInfos;
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
