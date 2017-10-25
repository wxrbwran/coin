import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import CoinViews from '@/components/CoinViews';
import ExchangeViews from '@/components/ExchangeViews';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          component: CoinViews,
        },
        {
          path: 'coins',
          component: CoinViews,
        },
        {
          path: 'exchanges',
          component: ExchangeViews,
        },
      ],
    },
  ],
});
