<template>
  <div class="search">
      <Input v-model="search">
        <Button slot="append" icon="ios-search" @click="handleSearchExchange">
          {{ $t('index.modal.search') }}
        </Button>
      </Input>
      <div v-if="shouldShowData" class="search-result">
        <div class="results">
          <CheckboxGroup v-model="exchangesToAdd">
            <Checkbox
              v-for="ex in exchanges"
              :key="ex.id"
              :label="ex.name"
              :value="ex.name"
              :checked="checkboxStatus(ex.name)"
              :disabled="checkboxStatus(ex.name)"
            >
              {{ ex.name }}
            </Checkbox>
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
            @click.prevent.stop="handleAddExchange"
            class="add-coin"
            type="primary"
          >
            {{ $t('index.button.add') }}
          </Button>
        </div>
      </div>
      <div class="currently" v-show="!searchResultLength">
        <h3>
          {{ $t('index.modal.currently') }}
        </h3>
        <ul v-if="inTable">
          <!-- 列表中需要显示的交易所 -->
          <li v-for="ex in exchangesInTable">
            <span>{{ ex }}</span>
            <span @click="removeExchange(ex)">
              <Icon type="close-round"></Icon>
            </span>
          </li>
        </ul>
        <ul v-else>
          <!-- 列表中需要添加的交易所 -->
          <li v-for="ex in localExchanges">
            <span>{{ ex }}</span>
            <span @click="removeExchange(ex)">
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
        exchanges: [],
        exchangesToAdd: [],
      };
    },
    computed: {
      searchResultLength() {
        return this.exchanges.length > 0;
      },
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
            const exchanges = await api.get('/exchange/search', {
              params: {
                keyword: this.search,
              },
            });
            if (Array.isArray(exchanges) && exchanges.length > 0) {
              this.exchanges = exchanges;
              this.exchangesToAdd = this.inTable ?
                this.exchangesInTable : this.localExchanges;
            } else {
              this.$Message.info({
                content: '无数据',
              });
            }
          } catch (e) {
            this.$Message.error({
              content: e,
            });
          }
        }
      },
      checkboxStatus(ex) {
        if (this.inTable) {
          return this.exchangesInTable.includes(ex);
        }
        return this.localExchanges.includes(ex);
      },
//      checkDisableStatus(ex) {
//        if (this.inTable) {
//          return this.exchangesInTable.includes(ex);
//        }
//        return this.localExchanges.includes(ex);
//      },
      handleCancelAdd() {
        this.exchanges = [];
        this.search = null;
      },
      handleAddExchange() {
        if (this.inTable) {
          this.handleExchangesInTable({
            exchange: this.exchangesToAdd,
            type: 'replace',
          });
        } else {
          this.handleDefaultExchanges({
            exchange: this.exchangesToAdd,
            type: 'replace',
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
          this.$Message.error({
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
          this.$Message.error({
            content: '至少应有一个交易所！',
          });
        } else if (ex === this.currentExchange) {
          this.$Message.error({
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
  .search{
    @extend %modal-search;
  }
</style>
