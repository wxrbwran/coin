import Home from '@/components/Home';
import Test from '@/components/Test';

// import CoinViews from '@/components/CoinViews';
// import ExchangeViews from '@/components/ExchangeViews';


const routers = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  // {
    // children: [
    //   {
    //     path: '',
    //     component: CoinViews,
    //   },
    //   {
    //     path: 'coins',
    //     component: CoinViews,
    //   },
    //   {
    //     path: 'exchanges',
    //     component: ExchangeViews,
    //   },
    // ],
  // },
];

export default routers;

// linkActiveClass: 'active',

