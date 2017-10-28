<template>
  <div>
    <h3 class="setting-area" @click="showCoin">Setting Coin</h3>
    <Modal
      v-model="isShowCoin"
      :mask-closable="false"
      class-name="setting-wrap"
      title="Set Coin"
    >
      <div class="search">
        <Input v-model="search">
        <Button slot="append" icon="ios-search" @click="handleSearchCoin">Search</Button>
        </Input>
        <div v-if="shouldShowData" class="search-result">
          <div class="results">
            <CheckboxGroup v-model="coinsToAdd">
              <Checkbox label="BTC">比特币</Checkbox>
              <Checkbox label="LTC">辣条</Checkbox>
              <Checkbox label="BTC1">比特币</Checkbox>
              <Checkbox label="LTC1">辣条</Checkbox>
              <Checkbox label="BTC11">比特币</Checkbox>
              <Checkbox label="LTC11">辣条</Checkbox>
              <Checkbox label="BTC111">比特币</Checkbox>
              <Checkbox label="LTC111">辣条</Checkbox>
              <Checkbox label="BTC2">比特币</Checkbox>
              <Checkbox label="LTC2">辣条</Checkbox>
              <Checkbox label="BTC22">比特币</Checkbox>
              <Checkbox label="LTC22">辣条</Checkbox>
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
            <li>
              <span>BTC</span>
              <Icon type="android-remove-circle"></Icon>
            </li>
            <li>
              <span>EOS</span>
              <Icon type="android-remove-circle"></Icon>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        isShowCoin: false,
        coins: [],
        coinsToAdd: [],
      };
    },
    computed: {
      shouldShowData() {
        return this.coins.length > 0;
      },
    },
    methods: {
      showCoin() {
        this.isShowCoin = true;
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
    },
  };
</script>

<style lang="scss" scoped>
  .setting-area{
    @extend %setting_area;
  }
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
