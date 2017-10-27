// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import VueI18n from 'vue-i18n';
import 'iview/dist/styles/iview.css';
import bus from '@/utils/bus';
import localLanguage from '@/utils/localLanguage';
import zhLocale from 'iview/dist/locale/zh-CN';
import enLocale from 'iview/dist/locale/en-US';
import Locales from './locale';
import Routers from './router';
import App from './App';
import store from './vuex';

require('./assets/scss/reset.scss');

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(iView);

Vue.config.productionTip = false;

Vue.config.lang = localLanguage;
bus.lang = localLanguage;

bus.$on('on-change-lang', (language, path) => {
  // Vue.config.lang = lang;
  // bus.lang = lang;
  window.localStorage.setItem('language', language);
  window.location.href = path;
});

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);

Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);

// 路由配置
const RouterConfig = {
  routes: Routers,
  mode: 'hash',
  linkActiveClass: 'active',
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  bus.loading = true;
  // Util.title(to.meta.title);
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  bus.loading = false;
  window.scrollTo(0, 0);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
// console.log(vm);
