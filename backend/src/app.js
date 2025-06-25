require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// 数据库连接
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// 中间件
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/books', require('./routes/book'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/groups', require('./routes/group'));
app.use('/api/forums', require('./routes/forum'));
app.use('/api/collections', require('./routes/collection'));
app.use('/api/reading-history', require('./routes/readingHistory'));
app.use('/api/messages', require('./routes/message'));
app.use('/api/upload', require('./routes/upload'));

// Swagger 文档
require('./swagger')(app);

// 错误处理中间件
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 