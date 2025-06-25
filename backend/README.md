# Moyun 社区后端 API

基于 Node.js + Express + MongoDB，支持 RESTful API，JWT 认证，文件上传，Swagger 文档。

## 快速开始

```bash
npm install
cp .env.example .env
npm run dev
```

## 主要目录结构

```
backend/
├── src/
│   ├── controllers/      # 控制器
│   ├── models/           # Mongoose 数据模型
│   ├── routes/           # 路由
│   ├── middlewares/      # 中间件
│   ├── utils/            # 工具函数
│   ├── seed/             # 数据填充脚本
│   ├── app.js            # Express 应用入口
│   └── swagger.js        # Swagger 配置
├── uploads/              # 文件上传目录
├── .env.example          # 环境变量示例
├── package.json
└── README.md
```

## Swagger 文档

启动后访问 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 主要特性
- 用户/管理员认证与权限
- 图书、书评、小组、帖子、消息、收藏等 RESTful API
- 文件上传（头像/封面/小组图片）
- 错误处理与日志
- 示例数据 Seeder
- Swagger 自动文档 