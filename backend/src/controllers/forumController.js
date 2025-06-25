const ForumPost = require('../models/ForumPost');
const ForumComment = require('../models/ForumComment');

exports.getPostsByGroup = async (req, res, next) => {
  try {
    const posts = await ForumPost.find({ group: req.params.groupId }).populate('author', 'username avatar');
    res.json(posts);
  } catch (err) { next(err); }
};

exports.createPost = async (req, res, next) => {
  try {
    const { group, title, content } = req.body;
    const post = await ForumPost.create({ group, author: req.user.id, title, content });
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await ForumPost.findById(req.params.id).populate('author', 'username avatar');
    if (!post) return res.status(404).json({ message: '帖子不存在' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await ForumPost.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ message: '帖子不存在或无权限' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await ForumPost.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    if (!post) return res.status(404).json({ message: '帖子不存在或无权限' });
    res.json({ message: '删除成功' });
  } catch (err) { next(err); }
};

exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await ForumComment.create({ post: req.params.id, author: req.user.id, content });
    await ForumPost.findByIdAndUpdate(req.params.id, { $inc: { commentCount: 1 } });
    res.status(201).json(comment);
  } catch (err) { next(err); }
};

exports.getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await ForumComment.find({ post: req.params.id }).populate('author', 'username avatar');
    res.json(comments);
  } catch (err) { next(err); }
}; 