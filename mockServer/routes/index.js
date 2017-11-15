var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

router.get('/coins', (req, res) => {
  const { key } = req.query;
  const template = {
    status: 'success',
    message: '@sentence',
    code: 200,
    data: {
      'coins|2-5': [
        {
          'id|+1': 0,
          name: '@word',
        },
      ],
    },
  };
  const data = Mock.mock(template);
  res.send(data);
});
router.get('/exchanges', (req, res) => {
  const { key } = req.query;
  const template = {
    status: 'success',
    message: '@sentence',
    code: 200,
    data: {
      'exchanges|2-5': [
        {
          'id|+1': 0,
          name: '@word',
        },
      ],
    },
  };
  const data = Mock.mock(template);
  res.send(data);
});
router.get('/coins/:exchange', (req, res) => {
  const exchange = req.params.exchange.toUpperCase();
  const { coins } = req.query;
  const template = {
    status: 'success',
    message: '@sentence',
    code: 200,
    data: {
      'coinInfos|5-10': [
        {
          'index|+1': 0,
          currency: `@pick(${coins})`,
          'priceByDollar|4000-5000': 1,
          selectedCoin: exchange,
          'price|20000-30000': 1,
          'marketValue|500-6000': 1,
          'increase|-10-50.2': 1,
          updated: '@time("HH:mm:ss")',
        },
      ],
    },
  };
  const data = Mock.mock(template);
  res.send(data);
});

router.get('/exchanges/:coin', (req, res) => {
  const coin = req.params.coin.toUpperCase();
  const { exchanges } = req.query;
  const template = {
    status: 'success',
    message: '@sentence',
    code: 200,
    data: {
      'exchangeInfos|2-5': [
        {
          'index|+1': 0,
          source: `@pick(${exchanges})`,
          'priceByDollar|4000-5000': 1,
          'price|20000-30000': 1,
          'volume_24h|500-6000': 1,
          'volume_rate|-10-50.2': 1,
          updated: '@time("HH:mm:ss")',
        },
      ],
    },
  };
  const data = Mock.mock(template);
  res.send(data);
});

module.exports = router;
