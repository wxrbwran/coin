/**
 * Created by wuxiaoran on 2017/10/26.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { localLanguage, coinsInTable, exchangesInTable,
  localCurrency, defaultCoins, defaultExchanges } from '@/utils/localInfos';

Vue.use(Vuex);
/* eslint-disable no-param-reassign */

const plugins = process.env.NODE_ENV === 'development' ?
  [createLogger()] : [];

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currentCoin: 'BTC',
    currentExchange: 'Bitfinexs',
    language: localLanguage,
    currency: localCurrency,
    defaultCoins,
    defaultExchanges,
    coinsInTable,
    exchangesInTable,
  },
  mutations: {
    handleCurrencyChange(state, currency) {
      window.localStorage.setItem('currency', currency);
      state.currency = currency;
    },
    handleLanguageChange(state, language) {
      window.localStorage.setItem('language', language);
      state.language = language;
    },
    handleCoinChange(state, coin) {
      state.currentCoin = coin;
    },
    handleExchangeChange(state, ex) {
      state.currentExchange = ex;
    },
    handleDefaultCoins(state, { coin, type }) {
      if (type === 'add') {
        state.defaultCoins.push(coin);
      } else {
        const tmpSet = new Set(state.defaultCoins);
        tmpSet.delete(coin);
        state.defaultCoins = [...tmpSet];
      }
      window.localStorage.setItem('defaultCoins', state.defaultCoins);
    },
    handleDefaultExchanges(state, { exchange, type }) {
      if (type === 'add') {
        state.defaultCoins.push(exchange);
        window.localStorage.setItem('defaultExchanges', state.defaultExchanges);
      } else if (type === 'remove') {
        const tmpSet = new Set(state.defaultExchanges);
        tmpSet.delete(exchange);
        state.defaultExchanges = [...tmpSet];
        window.localStorage.setItem('defaultExchanges', state.defaultExchanges);
      }
    },
    handleCoinsInTable(state, { coin, type }) {
      if (type === 'add') {
        state.coinsInTable.push(coin);
      } else {
        const tmpSet = new Set(state.coinsInTable);
        tmpSet.delete(coin);
        state.coinsInTable = [...tmpSet];
      }
      window.localStorage.setItem('coinsInTable', state.coinsInTable);
    },
    handleExchangesInTable(state, { exchange, type }) {
      if (type === 'add') {
        state.exchangesInTable.push(exchange);
      } else if (type === 'remove') {
        const tmpSet = new Set(state.exchangesInTable);
        tmpSet.delete(exchange);
        state.exchangesInTable = [...tmpSet];
      }
      window.localStorage.setItem('exchangesInTable', state.exchangesInTable);
    },
  },
  plugins,
});

export default store;
