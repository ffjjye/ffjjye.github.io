const Group = require('../models/Group');

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) { next(err); }
};

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({ name, description, members: [req.user.id] });
    res.status(201).json(group);
  } catch (err) { next(err); }
};

exports.getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id).populate('members', 'username avatar');
    if (!group) return res.status(404).json({ message: '小组不存在' });
    res.json(group);
  } catch (err) { next(err); }
};

exports.updateGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!group) return res.status(404).json({ message: '小组不存在' });
    res.json(group);
  } catch (err) { next(err); }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: '小组不存在' });
    res.json({ message: '删除成功' });
  } catch (err) { next(err); }
};

exports.joinGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: req.user.id } },
      { new: true }
    );
    if (!group) return res.status(404).json({ message: '小组不存在' });
    res.json({ message: '加入成功', group });
  } catch (err) { next(err); }
};

exports.leaveGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.user.id } },
      { new: true }
    );
    if (!group) return res.status(404).json({ message: '小组不存在' });
    res.json({ message: '已退出', group });
  } catch (err) { next(err); }
}; 