<template>
  <div class="search">
      <Input v-model="search">
        <Button slot="append" icon="ios-search" @click="handleSearchExchange">Search</Button>
      </Input>
      <div v-if="shouldShowData" class="search-result">
        <div class="results">
          <CheckboxGroup v-model="exchangesToAdd">
            <Checkbox v-for="ex in exchanges" :key="ex.id" :label="ex.name">{{ ex.name }}</Checkbox>
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
        <ul v-if="inTable">
          <li v-for="ex in exchangesInTable">
            <span>{{ ex }}</span>
            <span @click="removeExchange(ex)">
              <Icon type="android-remove-circle"></Icon>
            </span>
          </li>
        </ul>
        <ul v-else>
          <li v-for="ex in localExchanges">
            <span>{{ ex }}</span>
            <span @click="removeExchange(ex)">
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
        exchangesInTable: 'exchangesInTable',
        currentExchange: 'currentExchange',
      }),
    },
    methods: {
      async handleSearchExchange() {
        if (!this.search) {
          this.$Message.error({
            content: '请输入关键字!',
          });
        } else {
          try {
            const { exchanges } = await api.get('/exchanges', {
              params: {
                key: this.search,
              },
            });
            this.exchanges = exchanges;
          } catch (e) {
            this.$Modal({
              content: e,
            });
          }
        }
      },
      handleAddExchange() {
        if (this.inTable) {
          this.handleExchangesInTable({
            exchange: this.exchangesToAdd,
            type: 'add',
          });
        } else {
          this.handleDefaultExchanges({
            exchange: this.exchangesToAdd,
            type: 'add',
          });
        }
        this.exchanges = [];
        this.exchangesToAdd = [];
        this.search = '';
      },
      removeExchange(ex) {
        if (this.inTable) {
          this.removeExchangeInTable(ex);
        } else {
          this.removeLocalExchanges(ex);
        }
      },
      removeExchangeInTable(ex) {
        if (this.exchangesInTable.length <= 1) {
          this.$Modal.error({
            content: '至少应有一个交易所！',
          });
        } else {
          this.handleExchangesInTable({
            exchange: ex,
            type: 'remove',
          });
        }
      },
      removeLocalExchanges(ex) {
        if (this.localExchanges.length <= 1) {
          this.$Modal.error({
            content: '至少应有一个交易所！',
          });
        } else if (ex === this.currentExchange) {
          this.$Modal.error({
            content: '不能删除当前选定的交易所！',
          });
        } else {
          this.handleDefaultExchanges({
            exchange: ex,
            type: 'remove',
          });
        }
      },
      ...mapMutations(['handleDefaultExchanges', 'handleExchangesInTable']),
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