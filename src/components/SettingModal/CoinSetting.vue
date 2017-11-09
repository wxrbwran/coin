<template>
  <div class="search">
    <div v-if="inTable">
      <h3>
        {{ $t('index.modal.notAdded') }}
      </h3>
      <ul class="add-lists">
        <li v-for="coin in otherCoinsSet">
          <span>{{ coin }}</span>
          <span @click="handleAddCoin(coin)">
            <Icon type="android-add-circle"></Icon>
          </span>
        </li>
      </ul>
    </div>
    <div v-else>
      <Input v-model="search">
      <Button slot="append" icon="ios-search" @click="handleSearchCoin">
        {{ $t('index.modal.search') }}
      </Button>
      </Input>
      <div v-if="shouldShowData" class="search-result">
        <div class="results">
          <CheckboxGroup v-model="coinsToAdd">
            <Checkbox v-for="coin in coins" :key="coin.id" :label="coin.symbol">{{ coin.symbol }}</Checkbox>
          </CheckboxGroup>
        </div>
        <div class="search-action">
          <Button
            @click.prevent.stop="handleCancelAdd"
            type="ghost"
          >
            {{ $t('index.button.cancel') }}
          </Button>
          <Button
            @click.prevent.stop="handleAddCoin"
            type="primary"
          >
            {{ $t('index.button.add') }}
          </Button>
        </div>
      </div>
    </div>
    <div class="currently">
      <h3>
        {{ $t('index.modal.currently') }}
      </h3>
      <ul v-if="inTable">
        <li v-for="coin in coinsInTable">
          <span>{{ coin }}</span>
          <span @click="removeCoin(coin)">
            <Icon type="close-round"></Icon>
          </span>
        </li>
      </ul>
      <ul v-else>
        <li v-for="coin in localCoins">
          <span>{{ coin }}</span>
          <span @click="removeCoin(coin)">
            <Icon type="close-round"></Icon>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import api from '@/utils/api';

  export default {
    props: {
      inTable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        search: '',
        coins: [],
        coinsToAdd: [],
        otherCoinsSet: [],
      };
    },
//    mounted() {
//      if (this.inTable) {
//        this.handleCoinsOfExchange();
//      }
//    },
    computed: {
      shouldShowData() {
        return this.coins.length > 0;
      },
      ...mapState({
        localCoins: 'defaultCoins',
        coinsInTable: 'coinsInTable',
        currentCoin: 'currentCoin',
        currentExchange: 'currentExchange',
      }),
    },
    watch: {
      currentExchange() {
        if (this.inTable) {
          this.handleCoinsOfExchange();
        }
      },
    },
    methods: {
      async handleSearchCoin() {
        if (!this.search) {
          this.$Message.error({
            content: '请输入关键字!',
          });
          return;
        }
        try {
          const data = await api.get('/currency/search', {
            params: {
              keyword: this.search,
            },
          });
          if (Array.isArray(data) && data.length > 0) {
            this.coins = data;
          } else {
            this.$Message.info({
              content: '无数据',
              duration: 2,
            });
          }
        } catch (e) {
          this.$Message.error({
            content: e,
            duration: 2,
          });
        }
      },
      handleCancelAdd() {
        this.coins = [];
        this.search = null;
      },
      async handleCoinsOfExchange() {
        try {
          const data = await api.get('/exchange/coins', {
            params: {
              exchange: this.currentExchange,
            },
          });
          const coins = Object.values(data);
          if (coins.length > 0) {
            const otherCoinsSet = new Set(coins);
            const currentCoinsSet = new Set(coins);
            /* eslint-disable no-restricted-syntax */
            for (const coin of this.coinsInTable) {
              otherCoinsSet.delete(coin);
            }
            for (const coin of otherCoinsSet) {
              currentCoinsSet.delete(coin);
            }
            /* eslint-disable no-restricted-syntax */
            this.handleCoinsInTable({
              coin: [...currentCoinsSet],
              type: 'replace',
            });
            const otherCoinsArray = [...otherCoinsSet];
            otherCoinsArray.sort((prev, next) => prev - next);
            this.otherCoinsSet = otherCoinsArray;
          } else {
            this.handleCoinsInTable({
              coin: window.localStorage.getItem('coinsInTable') || [],
              type: 'replace',
            });
            this.otherCoinsSet = [];
          }
        } catch (e) {
          this.$Message.error({
            content: e,
          });
        }
      },
      handleAddCoin(coin) {
        if (this.inTable) {
          this.handleCoinsInTable({
            coin: [coin],
            type: 'add',
          });
        } else {
          this.handleDefaultCoins({
            coin: this.coinsToAdd,
            type: 'add',
          });
          this.coins = [];
          this.search = '';
          this.coinsToAdd = [];
        }
      },
      removeCoin(coin) {
        if (this.inTable) {
          this.removeCoinInTable(coin);
        } else {
          this.removeLocalCoin(coin);
        }
      },
      removeCoinInTable(coin) {
        if (this.coinsInTable.length <= 1) {
          this.$Message.error({
            content: '至少应有一个币种！',
          });
        } else {
          this.handleCoinsInTable({
            coin,
            type: 'remove',
          });
        }
      },
      removeLocalCoin(coin) {
        if (this.localCoins.length <= 1) {
          this.$Message.error({
            content: '至少应有一个币种！',
          });
        } else if (coin === this.currentCoin) {
          this.$Message.error({
            content: '不能删除当前选定的货币！',
          });
        } else {
          this.handleDefaultCoins({
            coin,
            type: 'remove',
          });
        }
      },
      ...mapMutations(['handleDefaultCoins', 'handleCoinsInTable']),
    },
  };
</script>

<style lang="scss" scoped>
  .search{
  @extend %modal-search;
    .add-lists{
      li{
        display: inline-block;
        margin-right: 20px;
        font-weight: 400;
        background-color: #4a79fa;
        font-size: 12px;
        width: auto;
        @include lh(32px);
        padding: 0 10px;
        margin-bottom: 10px;
        border-radius: 3px;
        span{
          color: #fff;
          margin-right: 10px;
        }
        i{
          cursor: pointer;
        }
      }
    }
  }
</style>
