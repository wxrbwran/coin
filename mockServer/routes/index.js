var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

router.get('/coins/:coin', (req, res) => {
  console.log(req.params.coin);
  const coin = req.params.coin.toUpperCase();
  const template = {
    status: 'success',
    message: '@sentence',
    code: 200,
    data: {
      'coinInfos|5-25': [
        {
          'index|+1': 0,
          'currency': '@word',
          'priceBYDollar|4000-5000': 1,
          selectedCoin: coin,
          'price|20000-30000': 1,
          'volumeByTime|500-6000': 1,
          'volumeByPercent|-10-50.2': 1,
          'updated': '@time("HH:mm:ss")',
        },
      ],
    },
  };
  const data = Mock.mock(template);
  res.send(data);
});

router.get('/exchanges/:exchange', (req, res) => {
  console.log(req.params.exchange);
  const coin = req.params.exchange.toUpperCase();
  const template = {
    status: 'success',
    message: '@sentence',
    code: 200,
    data: {
      'exchangeInfos|5-25': [
        {
          'index|+1': 0,
          'source': '@word',
          'priceBYDollar|4000-5000': 1,
          'price|20000-30000': 1,
          'volumeByTime|500-6000': 1,
          'volumeByPercent|-10-50.2': 1,
          'updated': '@time("HH:mm:ss")',
        },
      ],
    },
  };
  const data = Mock.mock(template);
  res.send(data);
});

module.exports = router;