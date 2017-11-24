<template>
  <div>
    <Table :loading="loading" :columns="columns" :data="data"></Table>
    <Switch v-model="loading"></Switch>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import api from '@/utils/api';
  import REFRESH_TIME from '@/utils/config';

  let shouldLoad = true;
  let timer = null;
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
      columns() {
        return [
          {
            title: '#',
            key: 'rank',
            width: 75,
          },
          {
            title: this.$t('index.tableColumn.currency'),
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
                  innerHTML: `${params.row.volume_24h}`,
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
                  innerHTML: `${params.row.volume_rate}%`,
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
      currentExchangeState() {
        this.debounceFetch();
      },
      coinsInTable() {
        this.debounceFetch();
      },
    },
    mounted() {
      this.debounceFetch();
      timer = setInterval(this.debounceFetch, REFRESH_TIME * 60 * 1000);
    },
    beforeDestroy() {
      shouldLoad = null;
      clearInterval(timer);
      timer = null;
    },
    methods: {
      debounceFetch() {
        if (shouldLoad) {
          shouldLoad = false;
          this.fetchExchangeInfos();
        }
      },
      async fetchExchangeInfos() {
        this.loading = true;
        const ex = this.currentExchangeState;
        try {
          const data = await api.get('/market/listByExchange', {
            params: {
              currencies: this.coinsInTable.join(','),
              exchange: ex,
            },
          });
          if (Array.isArray(data)) {
            data.sort((prev, next) => (prev.rank - next.rank));
            this.data = data;
          } else {
            this.data = [];
            this.$Message.info({
              content: '暂无此交易所信息',
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
        } finally {
          shouldLoad = true;
        }
      },
    },
  };
</script>

<style lang="scss">
  .view-column{
    color: $link-color;
  }
</style>
