/**
 * Created by wuxiaoran on 2017/10/27.
 */

const navLang = navigator.language;
const localStorage = window.localStorage;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
export const localLanguage = localStorage.getItem('language') || localLang || 'zh-CN';
export const localCurrency = localStorage.getItem('currency') || 'USD';

export const currentView = localStorage.getItem('currentView') || 'coins';
export const currentExchange = localStorage.getItem('currentExchange') || 'Bitfinex';
export const currentCoin = localStorage.getItem('currentCoin') || 'BTC';

export const defaultCoins = localStorage.getItem('defaultCoins') ?
  localStorage.getItem('defaultCoins').split(',') :
  ['BTC', 'LTC', 'ETH', 'Ripple', 'EOS', 'QTUM'];
export const defaultExchanges = localStorage.getItem('defaultExchanges') ?
  localStorage.getItem('defaultExchanges').split(',') :
  ['Bitfinex', 'Bittrex', 'Poloniex', 'Bithumb', 'Liqui'];

export const coinsInTable = localStorage.getItem('coinsInTable') ?
  localStorage.getItem('coinsInTable').split(',') :
  ['BTC', 'LTC', 'ETH', 'BCC', 'ETC', 'EOS'];
export const exchangesInTable = localStorage.getItem('exchangesInTable') ?
  localStorage.getItem('exchangesInTable').split(',') :
['Bitfinex', 'Bithumb', 'bitFlyer', 'GDAX', 'Bitstamp', 'HitBTC', 'BTCC',
  'LakeBTC', 'Kraken', 'Gemini', 'Poloniex', 'Bittrex', 'Coinone', 'Korbit',
  'Kraken', 'BCC Exchange'];

