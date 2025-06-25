function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    code: err.code || 500,
    message: err.message || '服务器内部错误',
    errors: err.errors || undefined
  });
}

module.exports = { errorHandler }; 