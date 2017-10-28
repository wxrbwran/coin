<template>
  <div class="search">
      <Input v-model="search">
      <Button slot="append" icon="ios-search" @click="handleSearchExchange">Search</Button>
      </Input>
      <div v-if="shouldShowData" class="search-result">
        <div class="results">
          <CheckboxGroup v-model="exchangesToAdd">
            <Checkbox label="BTC">比特币</Checkbox>
            <Checkbox label="LTC">辣条</Checkbox>
          </CheckboxGroup>
        </div>
        <Button
          @click.prevent.stop="handleAddExchange"
          class="add-coin"
          type="primary"
        >
          Add
        </Button>
      </div>
      <div class="currently">
        <h3>Currently</h3>
        <ul>
          <li v-for="ex in localExchanges">
            <span>{{ ex }}</span>
            <div>
              <Icon type="android-remove-circle"></Icon>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        search: '',
        exchanges: [],
        exchangesToAdd: [],
      };
    },
    computed: {
      shouldShowData() {
        return this.exchanges.length > 0;
      },
      ...mapState({
        localExchanges: 'defaultExchanges',
      }),
    },
    methods: {
      handleSearchExchange() {
        if (!this.search) {
          this.$Message.error({
            content: '请输入关键字!',
          });
        } else {
          this.exchanges = ['111', '222LTC', '333'];
        }
      },
      handleAddExchange() {
        this.exchanges = [];
        this.exchangesToAdd = [];
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
