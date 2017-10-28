/**
 * Created by wuxiaoran on 2017/10/27.
 */

const navLang = navigator.language;
const localStorage = window.localStorage;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
export const localLanguage = localStorage.getItem('language') || localLang || 'zh-CN';

export const localCurrency = localStorage.getItem('currency') || 'USD';

export const defaultCoins = localStorage.getItem('defaultCoins') ?
  localStorage.getItem('defaultCoins').split(',') :
  ['BTC', 'LTC', 'ETH', 'BCC', 'ETC', 'EOS'];
export const defaultExchanges = localStorage.getItem('defaultExchanges') ?
  localStorage.getItem('defaultExchanges').split(',') :
  ['Bitfinexs', 'Bittres', 'Poloniex', 'Bitthumb', 'Liqui'];
