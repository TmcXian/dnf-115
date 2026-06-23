# DNF 115版本 - 装备套装工具

重力之泉版本装备套装查询与对比系统，支持装备强度排行、套装详情查看、多套装对比等功能。

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | Node.js + Express |
| 数据库 | MySQL 8.0 |
| 前端 | 原生 HTML/CSS/JS（DNF 风格 UI） |
| 认证 | JWT + bcryptjs |

## 快速开始

### 1. 环境要求

- Node.js 18+
- MySQL 8.0+

### 2. 安装依赖

```bash
npm install
```

### 3. 初始化数据库

```bash
node server/init-db.js
```

> 默认连接 `localhost:3306`，用户 `root`，密码通过环境变量 `DB_PASSWORD` 配置（默认 `xw197653`）。

### 4. 启动服务

```bash
node server.js
```

访问 http://127.0.0.1:4000

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `DB_HOST` | localhost | 数据库地址 |
| `DB_PORT` | 3306 | 数据库端口 |
| `DB_USER` | root | 数据库用户 |
| `DB_PASSWORD` | - | 数据库密码 |
| `DB_NAME` | dnf_tool | 数据库名 |
| `JWT_SECRET` | - | JWT 签名密钥 |
| `PORT` | 4000 | 应用端口 |

## 项目结构

```
├── index.html              # 主页（套装展示 + 登录注册）
├── server.js               # Express 服务入口
├── page/
│   ├── rank.html           # 强度排行页
│   ├── query.html          # 套装查询页
│   ├── compare.html        # 套装对比页
│   ├── detail.html         # 套装详情页
│   └── logs.html           # 操作日志页（需登录）
├── server/
│   ├── auth.js             # 认证接口 + 中间件
│   ├── db.js               # 数据库连接池
│   ├── logger.js           # 日志记录模块
│   ├── logs.js             # 日志查询 API
│   └── init-db.js          # 数据库初始化脚本
├── static/
│   ├── css/                # 样式文件
│   ├── js/                 # 前端脚本
│   ├── img/                # 图片资源
│   └── audio/              # 音效文件
└── plugin/
    └── simulator.js        # 模拟器插件
```

## API 接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/register` | 用户注册 | 否 |
| POST | `/api/login` | 用户登录 | 否 |
| GET | `/api/logs?page=&limit=&action=` | 查询操作日志 | 是 |

### 认证方式

登录/注册成功后返回 JWT Token，后续请求在 Header 中携带：

```
Authorization: Bearer <token>
```

## 数据库表

### user - 用户表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| username | VARCHAR(50) | 用户名（唯一） |
| password | VARCHAR(255) | bcryptjs 加密密文 |
| created_at | TIMESTAMP | 创建时间 |

### operation_logs - 操作日志表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| user_id | INT | 用户ID |
| username | VARCHAR(50) | 用户名 |
| action | VARCHAR(50) | 操作类型 |
| detail | TEXT | 操作详情 |
| ip | VARCHAR(45) | 客户端IP |
| created_at | TIMESTAMP | 操作时间 |
