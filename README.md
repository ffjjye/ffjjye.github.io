# 墨韵 (Moyun) - 阅读社区平台

墨韵是一个专为校园师生打造的阅读交流社区平台。它旨在提供一个纯粹、便捷的环境，让用户可以发现好书、撰写书评、创建和加入兴趣圈子，并与其他阅读爱好者进行深入交流。

## ✨ 主要功能

- **用户认证**: 提供完整的注册、登录、退出功能，并使用 JWT (JSON Web Token) 进行会话管理。
- **书籍管理**: 用户可以浏览、搜索、添加和收藏书籍。
- **书评系统**: 用户可以为书籍撰写、查看和评论书评。
- **圈子功能**: 用户可以创建或加入基于兴趣的读书圈子，并在圈子内进行讨论和活动。
- **动态分享**: 用户可以查看到好友和社区的热门动态。
- **消息系统**: 支持用户间进行一对一的私信交流。
- **个人主页**: 每位用户拥有自己的个人主页，可展示个人信息、收藏和发布的动态。

## 🛠️ 技术栈 (Technology Stack)

### 前端 (Frontend)

- **框架**: [Vue.js](https://vuejs.org/) (2.x)
- **UI 库**: [Vuetify](https://vuetifyjs.com/) & [Element UI](https://element.eleme.io/)
- **状态管理**: [Vuex](https://vuex.vuejs.org/)
- **路由**: [Vue Router](https://router.vuejs.org/)
- **HTTP 请求**: [Axios](https://axios-http.com/)

### 后端 (Backend)

- **运行环境**: [Node.js](https://nodejs.org/)
- **核心框架**: [Express.js](https://expressjs.com/)
- **数据库**: [MongoDB](https://www.mongodb.com/)
- **ORM/ODM**: [Mongoose](https://mongoosejs.com/)
- **API 文档**: [Swagger](https://swagger.io/)
- **用户认证**: [JSON Web Token](https://jwt.io/) (jsonwebtoken)
- **密码加密**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

## 📁 项目结构

```
.
├── backend/        # 后端 Node.js (Express) 项目
│   ├── src/
│   │   ├── controllers/  # 控制器 (业务逻辑)
│   │   ├── middlewares/  # 中间件 (如 auth)
│   │   ├── models/       # 数据模型 (Mongoose Schemas)
│   │   ├── routes/       # 路由定义
│   │   ├── seed/         # 数据填充脚本
│   │   └── app.js        # 应用入口
│   └── package.json
└── src/            # 前端 Vue.js 项目
    ├── components/
    ├── views/
    ├── router/
    ├── store/
    └── main.js
```

## 🚀 快速开始

### 环境准备

在开始之前，请确保您的开发环境中已安装以下软件：
- [Node.js](https://nodejs.org/) (v16.x 或更高版本)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) 数据库，并确保其正在运行。

### 安装与运行

#### 1. 克隆项目

```bash
git clone <your-repository-url>
cd <project-directory>
```

#### 2. 后端设置

1.  **进入后端目录并安装依赖**
    ```bash
    cd backend
    npm install
    ```

2.  **配置环境变量**
    在 `backend` 目录下创建一个名为 `.env` 的文件，并填入以下内容。请根据您的本地环境修改配置。
    ```env
    # 服务器运行端口
    PORT=3000

    # MongoDB 连接字符串
    MONGODB_URI=mongodb://127.0.0.1:27017/moyun-db

    # JWT 密钥 (请使用一个更复杂的随机字符串)
    JWT_SECRET=a-very-secret-key-for-jwt
    ```

3.  **(可选) 填充初始数据**
    为了方便测试，可以运行数据填充脚本，向数据库中写入一些初始的用户、书籍和圈子数据。
    ```bash
    npm run seed
    ```

4.  **启动后端开发服务器**
    ```bash
    npm run dev
    ```
    服务器将在 `http://localhost:3000` 上运行。

#### 3. 前端设置

1.  **回到项目根目录并安装依赖**
    ```bash
    cd ..
    npm install
    ```
    *注意：如果根目录已经有 `node_modules`，可以跳过此步。*

2.  **启动前端开发服务器**
    ```bash
    npm run serve
    ```
    前端应用将在 `http://localhost:8080` 上运行，并会自动打开浏览器。

现在，您应该可以正常访问和使用整个应用了！

## 📜 常用命令

### 后端 (`/backend`)

- `npm run dev`: 启动开发服务器 (使用 nodemon 自动重启)。
- `npm run start`: 在生产模式下启动服务器。
- `npm run seed`: 向数据库填充初始数据。

### 前端 (`/`)

- `npm run serve`: 启动前端开发服务器。
- `npm run build`: 构建用于生产环境的前端应用。
- `npm run lint`: 检查和修复代码风格问题。


