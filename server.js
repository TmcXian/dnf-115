const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./server/auth');
const { authMiddleware } = require('./server/auth');
const logsRoutes = require('./server/logs');

const app = express();
// 1. 适配flask内部端口：改为4000（Nginx反向代理指向此端口）
const PORT = process.env.PORT || 4000;
// 2. 服务器IP绑定：保持监听所有网卡
const HOST = '0.0.0.0';

// ===================== 中间件优化（适配Ubuntu服务器） =====================
// 1. CORS配置：更新允许的前端端口为2000（Nginx对外端口）
app.use(cors({
  origin: [
    "http://115.190.234.119:2000", // Nginx对外端口
    "http://localhost:2000",     // 本地测试用（Nginx映射后）
    "http://127.0.0.1:2000"
  ],
  credentials: true, // 允许跨域携带Cookie
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. JSON解析优化：保持原有配置
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. 静态文件托管：保持原有配置
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  etag: true
}));

// ===================== 路由配置 =====================
app.use('/api', authRoutes);
app.use('/api/logs', logsRoutes);

// 前端页面路由：保持原有逻辑
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'page', 'index.html');
  const fs = require('fs');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send({
      code: 404,
      message: '前端页面文件不存在，请检查page/index.html路径',
      path: indexPath
    });
  }
});

// ===================== 错误处理中间件 =====================
app.use((err, req, res, next) => {
  console.error('服务器错误:', err.stack);
  res.status(err.status || 500).send({
    code: err.status || 500,
    message: process.env.NODE_ENV === 'production' 
      ? '服务器内部错误' 
      : err.message,
    timestamp: new Date().toISOString()
  });
});

// ===================== 启动服务器 =====================
app.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('服务器启动失败:', err.message);
    if (err.code === 'EADDRINUSE') {
      console.error(`端口 ${PORT} 已被占用，请更换端口或释放占用`);
    }
    process.exit(1);
  }
  console.log(`=================================`);
  console.log(`服务器成功启动！`);
  console.log(`内部访问地址: http://127.0.0.1:${PORT}（flask内部端口）`);
  console.log(`外网访问地址: http://115.190.234.119:2000（Nginx对外端口）`);
  console.log(`本地访问地址: http://localhost:2000`);
  console.log(`=================================`);
});

// 全局错误捕获：保持原有配置
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise错误:', promise, '原因:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('未捕获的进程错误:', err);
  process.exit(1);
});

module.exports = app;