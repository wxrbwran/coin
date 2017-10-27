/**
 * Created by wuxiaoran on 2017/10/26.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import localLanguage from '@/utils/localLanguage';

Vue.use(Vuex);
/* eslint-disable no-param-reassign */

const plugins = process.env.NODE_ENV === 'development' ?
  [createLogger()] : [];

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    language: localLanguage,
    currency: 'USD',
    currentCoin: 'BTC',
    currentExchange: 'Bitfinexs',
  },
  mutations: {
    handleCurrencyChange(state, currency) {
      state.currency = currency;
    },
    handleLanguageChange(state, language) {
      state.language = language;
    },
    handleCoinChange(state, coin) {
      state.currentCoin = coin;
    },
    handleExchangeChange(state, ex) {
      state.currentExchange = ex;
    },
  },
  plugins,
});

export default store;
