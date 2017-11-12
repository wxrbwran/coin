const express = require('express');
const engine = require('ejs-mate');
const path = require('path');

const app = express();
// ======= view engine setup  模板 开始===========//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
// ======= view engine setup  模板 结束===========//
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers',
    ['Content-Type', 'Authorization']);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);

var indexRouter = require('../routes/index');

app.use('/api', indexRouter);

app.listen(3333);
