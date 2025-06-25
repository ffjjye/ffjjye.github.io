const Message = require('../models/Message');

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ to: req.user.id }).populate('from', 'username avatar');
    res.json(messages);
  } catch (err) { next(err); }
};

exports.getSystemMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ to: req.user.id, type: 'system' });
    res.json(messages);
  } catch (err) { next(err); }
};

exports.getFriendMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [
        { from: req.user.id, to: req.params.id, type: 'friend' },
        { from: req.params.id, to: req.user.id, type: 'friend' }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) { next(err); }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { to, content, type } = req.body;
    const message = await Message.create({ from: req.user.id, to, content, type: type || 'friend' });
    res.status(201).json(message);
  } catch (err) { next(err); }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findOneAndUpdate(
      { _id: req.params.id, to: req.user.id },
      { isRead: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: '消息不存在' });
    res.json({ message: '已标记为已读' });
  } catch (err) { next(err); }
}; 