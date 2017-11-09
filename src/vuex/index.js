/**
 * Created by wuxiaoran on 2017/10/26.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { currentView, localLanguage, coinsInTable, exchangesInTable, currentCoin,
  currentExchange, localCurrency, defaultCoins, defaultExchanges } from '@/utils/localInfos';

Vue.use(Vuex);
/* eslint-disable no-param-reassign */

const plugins = process.env.NODE_ENV === 'development' ?
  [createLogger()] : [];

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currentView,
    currentCoin,
    currentExchange,
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
    handleViewChange(state, view) {
      window.localStorage.setItem('currentView', view);
      state.currentView = view;
    },
    handleLanguageChange(state, language) {
      window.localStorage.setItem('language', language);
      state.language = language;
    },
    handleCoinChange(state, coin) {
      window.localStorage.setItem('currentCoin', coin);
      state.currentCoin = coin;
    },
    handleExchangeChange(state, ex) {
      window.localStorage.setItem('currentExchange', ex);
      state.currentExchange = ex;
    },
    handleDefaultCoins(state, { coin, type }) {
      if (type === 'add') {
        state.defaultCoins = [...state.defaultCoins, ...coin];
      } else {
        const tmpSet = new Set(state.defaultCoins);
        tmpSet.delete(coin);
        state.defaultCoins = [...tmpSet];
      }
      window.localStorage.setItem('defaultCoins', state.defaultCoins);
    },
    handleDefaultExchanges(state, { exchange, type }) {
      if (type === 'add') {
        state.defaultExchanges = [...state.defaultExchanges, ...exchange];
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
        state.coinsInTable = [...state.coinsInTable, ...coin];
      } else if (type === 'remove') {
        const tmpSet = new Set(state.coinsInTable);
        tmpSet.delete(coin);
        state.coinsInTable = [...tmpSet];
      } else if (type === 'replace') {
        state.coinsInTable = coin;
      }
      window.localStorage.setItem('coinsInTable', state.coinsInTable);
    },
    handleExchangesInTable(state, { exchange, type }) {
      if (type === 'add') {
        state.exchangesInTable = [...state.exchangesInTable, ...exchange];
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
