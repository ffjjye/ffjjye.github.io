const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: '缺少必要字段' });
    const exist = await User.findOne({ $or: [{ username }, { email }] });
    if (exist) return res.status(409).json({ message: '用户名或邮箱已存在' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ message: '注册成功', user: { id: user._id, username, email } });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: '用户不存在' });
    if (user.blocked) return res.status(403).json({ message: '账号已被封禁' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: '密码错误' });
    const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin, avatar: user.avatar } });
  } catch (err) { next(err); }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    // 这里只做演示，实际应发送邮件验证码
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: '用户不存在' });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: '密码重置成功' });
  } catch (err) { next(err); }
}; 