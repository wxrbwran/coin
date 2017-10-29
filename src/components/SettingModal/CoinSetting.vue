<template>
  <div class="search">
      <Input v-model="search">
        <Button slot="append" icon="ios-search" @click="handleSearchCoin">Search</Button>
      </Input>
      <div v-if="shouldShowData" class="search-result">
        <div class="results">
          <CheckboxGroup v-model="coinsToAdd">
            <Checkbox v-for="coin in coins" :key="coin.id" :label="coin.name">{{ coin.name }}</Checkbox>
          </CheckboxGroup>
        </div>
        <Button
          @click.prevent.stop="handleAddCoin"
          class="add-coin"
          type="primary"
        >
          Add
        </Button>
      </div>
      <div class="currently">
        <h3>Currently</h3>
        <ul v-if="inTable">
          <li v-for="coin in coinsInTable">
            <span>{{ coin }}</span>
            <span @click="removeCoin(coin)">
              <Icon type="android-remove-circle"></Icon>
            </span>
          </li>
        </ul>
        <ul v-else>
          <li v-for="coin in localCoins">
            <span>{{ coin }}</span>
            <span @click="removeCoin(coin)">
              <Icon type="android-remove-circle"></Icon>
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
      };
    },
    computed: {
      shouldShowData() {
        return this.coins.length > 0;
      },
      ...mapState({
        localCoins: 'defaultCoins',
        coinsInTable: 'coinsInTable',
        currentCoin: 'currentCoin',
      }),
    },
    methods: {
      async handleSearchCoin() {
        if (!this.search) {
          this.$Message.error({
            content: '请输入关键字!',
          });
        } else {
          try {
            const { coins } = await api.get('/coins', {
              params: {
                key: this.search,
              },
            });
            this.coins = coins;
          } catch (e) {
            this.$Modal({
              content: e,
            });
          }
        }
      },
      handleAddCoin() {
        if (this.inTable) {
          this.handleCoinsInTable({
            coin: this.coinsToAdd,
            type: 'add',
          });
        } else {
          this.handleDefaultCoins({
            coin: this.coinsToAdd,
            type: 'add',
          });
        }
        this.coins = [];
        this.search = '';
        this.coinsToAdd = [];
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
          this.$Modal.error({
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
          this.$Modal.error({
            content: '至少应有一个币种！',
          });
        } else if (coin === this.currentCoin) {
          this.$Modal.error({
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
    position: relative;
    &-result{
      position: absolute;
      width: 100%;
      background-color: #fff;
      top: 33px;
      left: 0;
      z-index:9;
    }
    .results{
      padding: 10px 0;
      max-height: 300px;
      overflow: auto;
    }
    .currently{
      margin-top: 20px;
      font-size: 14px;
      color: $main-color;
      h3{
        font-weight: bold;
      }
      ul{
        @include flex(row, wrap, flex-start, center);
        padding: 10px 0;
      }
      li{
        margin-right: 30px;
        font-weight: 400;
        span{
          color: $help-color;
        }
        i{
          cursor: pointer;
          color: red;
        }
      }
    }
    .add-coin{
      display: block;
      margin: 20px auto 0;
    }
  }
</style>
