<template>
  <div class="search">
      <Input v-model="search">
        <Button slot="append" icon="ios-search" @click="handleSearchCoin">Search</Button>
      </Input>
      <div v-if="shouldShowData" class="search-result">
        <div class="results">
          <CheckboxGroup v-model="coinsToAdd">
            <Checkbox v-for="coin in localCoins" :label="coin">{{ coin }}</Checkbox>
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
        <ul>
          <li v-for="coin in localCoins">
            <span>{{ coin }}</span>
            <span @click="removeLocalCoin(coin)">
              <Icon type="android-remove-circle"></Icon>
            </span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
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
      }),
    },
    methods: {
      removeLocalCoin(coin) {
        this.handleDefaultCoins(coin, 'remove');
      },
      handleSearchCoin() {
        if (!this.search) {
          this.$Message.error({
            content: '请输入关键字!',
          });
        } else {
          this.coins = ['BTC', 'LTC'];
        }
      },
      handleAddCoin() {
        this.coins = [];
        this.coinsToAdd = [];
        this.search = '';
      },
      ...mapMutations(['handleDefaultCoins']),
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
