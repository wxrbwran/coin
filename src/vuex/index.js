/**
 * Created by wuxiaoran on 2017/10/26.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { localLanguage,
  localCurrency, defaultCoins, defaultExchanges } from '@/utils/localInfos';

Vue.use(Vuex);
/* eslint-disable no-param-reassign */

const plugins = process.env.NODE_ENV === 'development' ?
  [createLogger()] : [];

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    language: localLanguage,
    currency: localCurrency,
    currentCoin: 'BTC',
    defaultCoins,
    currentExchange: 'Bitfinexs',
    defaultExchanges,
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
    handleDefaultCoins(state, coin, type) {
      if (type === 'add') {
        state.defaultCoins = state.defaultCoins.push(coin);
      } else {
        const tmpSet = new Set(state.defaultCoins);
        tmpSet.delete(coin);
        state.defaultCoins = [...tmpSet];
      }
      window.localStorage.setItem('defaultCoins', state.defaultCoins);
    },
    handleExchangeChange(state, ex) {
      state.currentExchange = ex;
    },
    handleDefaultExchanges(state, exs) {
      window.localStorage.setItem('defaultExchanges', exs);
      state.defaultExchanges = exs;
    },
  },
  plugins,
});

export default store;
