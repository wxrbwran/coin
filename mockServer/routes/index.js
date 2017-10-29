var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

router.get('/coins/:exchange', (req, res) => {
  const exchange = req.params.exchange.toUpperCase();
  const { coins } = req.query;
  const template = {
    status: 'success',
    message: '@sentence',
    code: 200,
    data: {
      'coinInfos|2-5': [
        {
          'index|+1': 0,
          currency: `@pick(${coins})`,
          'priceByDollar|4000-5000': 1,
          selectedCoin: exchange,
          'price|20000-30000': 1,
          'volumeByTime|500-6000': 1,
          'volumeByPercent|-10-50.2': 1,
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
          'volumeByTime|500-6000': 1,
          'volumeByPercent|-10-50.2': 1,
          updated: '@time("HH:mm:ss")',
        },
      ],
    },
  };
  const data = Mock.mock(template);
  res.send(data);
});

module.exports = router;
