import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import CoinViews from '@/components/CoinViews';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '',
          component: CoinViews,
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'coins',
          component: CoinViews,
        },
      ],
    },
  ],
});
