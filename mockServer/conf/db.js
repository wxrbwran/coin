const mongoose = require('mongoose'); // 引入mongoose

const db = mongoose.connection;
db.on('error', () => { // 监听是否有异常
  console.log('Connection error');
});
db.once('open', () => { // 监听一次打开
  // 在这里创建你的模式和模型
  console.log('connected!');
});

const TodoSchema = new mongoose.Schema({
  user_id: String, // 定义一个属性user_id，类型为String
  content: String, // 定义一个属性content，类型为String
  updated_at: Date, // 定义一个属性updated_at，类型为Date
});

mongoose.model('Todo', TodoSchema); // 将该Schema发布为Model

mongoose.connect('mongodb://localhost/test'); // 连接到mongoDB的todo数据库
// 该地址格式：mongodb://[username:password@]host:port/database[?options]
// 默认port为27017
module.exports = mongoose;
