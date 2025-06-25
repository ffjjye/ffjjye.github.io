require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Book = require('../models/Book');
const Group = require('../models/Group');
const Review = require('../models/Review');

async function seed() {
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany();
  await Book.deleteMany();
  await Group.deleteMany();
  await Review.deleteMany();

  const password = await bcrypt.hash('123456', 10);
  const admin = await User.create({ username: 'admin', email: 'admin@example.com', password, isAdmin: true });
  const user = await User.create({ username: 'testuser', email: 'test@example.com', password });

  const book1 = await Book.create({
    title: '红楼梦',
    author: '[清] 曹雪芹 著 / 高鹗',
    cover: '/uploads/hongloumeng.jpg',
    description: '《红楼梦》是一部百科全书式的长篇小说。',
    rating: 9.7,
    reviewCount: 1,
    publishDate: '1996-12',
    publisher: '人民文学出版社',
    pages: 1606,
    price: '59.70元',
    isbn: '9787020002207',
    category: '中国古典文学',
    tags: ['古典文学', '四大名著', '爱情']
  });
  const book2 = await Book.create({
    title: '悉达多',
    author: '[德] 赫尔曼·黑塞',
    cover: '/uploads/xiduo.jpg',
    description: '《悉达多》并非是佛陀的故事，它讲述了一个人的一生。',
    rating: 9.2,
    reviewCount: 1,
    publishDate: '2017-1',
    publisher: '天津人民出版社',
    pages: 144,
    price: '32.00元',
    isbn: '9787201112695',
    category: '外国文学',
    tags: ['哲学', '人生', '成长']
  });

  const group = await Group.create({
    name: '读书会',
    description: '分享读书心得，交流阅读体验',
    members: [user._id],
    bookCount: 2,
    books: [book1._id, book2._id],
    avatar: '/uploads/group1.jpg'
  });

  await Review.create({
    book: book1._id,
    user: user._id,
    content: '《红楼梦》不愧为中国古典文学的巅峰之作。',
    rating: 5
  });

  console.log('Seeder 数据插入完成');
  process.exit();
}

seed(); 