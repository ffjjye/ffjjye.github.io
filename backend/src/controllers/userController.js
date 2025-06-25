const User = require('../models/User');
const path = require('path');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: '用户不存在' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { username, email, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, bio },
      { new: true, runValidators: true, select: '-password' }
    );
    if (!user) return res.status(404).json({ message: '用户不存在' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: '未上传文件' });
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: '/uploads/' + path.basename(req.file.path) },
      { new: true, select: '-password' }
    );
    res.json({ avatar: user.avatar });
  } catch (err) { next(err); }
}; 