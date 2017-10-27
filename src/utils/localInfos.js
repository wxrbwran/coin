/**
 * Created by wuxiaoran on 2017/10/27.
 */

const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
export const localLanguage = window.localStorage.getItem('language') || localLang || 'zh-CN';

export const localCurrency = window.localStorage.getItem('currency') || 'USD';
