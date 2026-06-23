const mysql = require('mysql2/promise');

// 数据库连接配置（适配Ubuntu服务器 115.190.234.119）
// 注：数据库端口3306保持不变，前端访问端口调整为Nginx对外2000，应用内部端口4000
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'xw197653',
    database: process.env.DB_NAME || 'dnf_tool',
    // 解决MySQL 8.0+ caching_sha2_password认证问题（兼容旧客户端）
    // 连接池优化配置（生产环境必备，避免频繁创建连接）
    waitForConnections: true, // 连接池无可用连接时，等待而非报错
    connectionLimit: 10, // 最大连接数（根据服务器配置调整，建议5-20）
    queueLimit: 0, // 等待队列无限制（0表示不限制）
    // 关闭SSL（Ubuntu服务器若未配置SSL证书，必须禁用否则连接失败）
    ssl: false,
    // 连接超时配置（避免长时间阻塞）
    connectTimeout: 10000, // 10秒超时
    // 解决大数字精度问题（如主键ID超过Number范围）
    supportBigNumbers: true,
    bigNumberStrings: true // 大数字转为字符串返回，避免精度丢失
};

// 创建数据库连接池（复用连接，提升性能）
const pool = mysql.createPool(dbConfig);

// 测试数据库连接（启动时验证，方便排查问题）
async function testConnection() {
    try {
        // 获取一个连接（用完需释放）
        const connection = await pool.getConnection();
        console.log('✅ 数据库连接成功（Ubuntu服务器 115.190.234.119）');
        console.log('📌 应用内部端口：4000 | Nginx对外端口：2000');
        // 释放连接（放回连接池，避免内存泄漏）
        connection.release();
    } catch (error) {
        console.error('❌ 数据库连接失败:', error.message);
        // 常见错误提示（帮助快速排查问题）
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('提示：用户名/密码错误，或root用户未开启远程访问');
            console.error('解决：1. 检查密码是否正确 2. 执行 ALTER USER \'root\'@\'%\' IDENTIFIED WITH mysql_native_password BY \'新密码\';');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('提示：服务器IP/端口不通，或防火墙未开放3306端口');
            console.error('解决：1. 检查3306端口是否开放 2. 关闭防火墙或添加规则：ufw allow 3306');
        } else if (error.code === 'ENOTFOUND') {
            console.error('提示：服务器IP地址错误，或域名解析失败');
            console.error('解决：确认数据库服务器IP是否正确，ping测试连通性');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('提示：数据库dnf_tool不存在');
            console.error('解决：执行 mysql -u root -p -e "CREATE DATABASE dnf_tool;" 并导入备份文件');
        } else {
            console.error('其他错误码：', error.code);
        }
    }
}

// 执行连接测试（启动时自动验证）
testConnection();

// 导出连接池（供其他模块调用，如auth.js）
module.exports = pool;