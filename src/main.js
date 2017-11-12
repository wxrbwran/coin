// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import VueI18n from 'vue-i18n';
import 'iview/dist/styles/iview.css';
import { localLanguage } from '@/utils/localInfos';
import zhLocale from 'iview/dist/locale/zh-CN';
import enLocale from 'iview/dist/locale/en-US';
import Locales from '@/locale';
import Routers from './router';
import App from './App';
import store from './vuex';

require('./assets/scss/reset.scss');
// 兼容IE10, transfer-dom.js中 使用了 dataset 的问题
if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
  Object.defineProperty(HTMLElement.prototype, 'dataset', {
    get() {
      const attributes = this.attributes; // 获取节点的所有属性
      const name = [];
      const value = []; // 定义两个数组保存属性名和属性值
      const obj = {}; // 定义一个空对象
      for (let i = 0; i < attributes.length; i += 1) { // 遍历节点的所有属性
        if (attributes[i].nodeName.slice(0, 5) === 'data-') { // 如果属性名的前面5个字符符合"data-"
          // 取出属性名的"data-"的后面的字符串放入name数组中
          name.push(attributes[i].nodeName.slice(5));
          // 取出对应的属性值放入value数组中
          value.push(attributes[i].nodeValue);
        }
      }
      for (let j = 0; j < name.length; j += 1) { // 遍历name和value数组
        obj[name[j]] = value[j]; // 将属性名和属性值保存到obj中
      }
      return obj; // 返回对象
    },
  });
}

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(iView);

Vue.config.productionTip = false;

Vue.config.lang = localLanguage;

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
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
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
