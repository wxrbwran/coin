<template>
  <div>
    <Table :loading="loading" :columns="columns" :data="data"></Table>
    <Switch v-model="loading"></Switch>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '@/utils/api';
//  import formatCurrency from '@/utils/formatCurrency';

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
      columns() {
        return [
          {
            title: '#',
            key: 'rank',
            width: 75,
          },
          {
            title: this.$t('index.tableColumn.source'),
            key: 'name',
            render: (h, params) => h('span',
              {
                domProps: {
                  className: 'view-column',
                  innerText: `${params.row.name}`,
                },
              },
            ),
          },
          {
            title: this.$t('index.tableColumn.pair'),
            key: 'pair',
            render: (h, params) => h('span',
              {
                domProps: {
                  className: 'view-column',
                  innerText: `${params.row.pair}`,
                },
              },
            ),
          },
          {
            title: this.$t('index.tableColumn.price'),
            key: 'price_usd_str',
          },
          {
            title: this.$t('index.tableColumn.volume_24h'),
            key: 'volume_24h',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerText: `${params.row.volume_24h}`,
                },
              },
            ),
          },
          {
            title: this.$t('index.tableColumn.volume_rate'),
            key: 'volume_rate',
            render: (h, params) => h('span',
              {
                domProps: {
                  innerText: `${params.row.volume_rate}%`,
                },
              },
            ),
          },
          {
            title: this.$t('index.tableColumn.updated'),
            key: 'update_time',
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
          const data = await api.get('/market/listByCurrency', {
            params: {
              exchanges: this.exchangesInTable.join(','),
              symbol: coin,
            },
          });
          if (Array.isArray(data)) {
            data.sort((prev, next) => (prev.rank - next.rank));
            this.data = data;
          } else {
            this.data = [];
            this.$Message.info({
              content: '暂无此类型货币',
              duration: 2,
            });
          }
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
