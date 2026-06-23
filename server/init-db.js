/**
 * 数据库初始化脚本
 * 首次部署时运行一次：node server/init-db.js
 * 创建 dnf_tool 数据库和 user 表
 */
const mysql = require('mysql2/promise');

const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'xw197653';
const DB_NAME = 'dnf_tool';

async function initDatabase() {
    // 先连接 MySQL（不指定数据库）
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: DB_USER,
        password: DB_PASSWORD,
        ssl: false
    });

    try {
        // 创建数据库（DDL 必须用 query，不能用 execute）
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
        );
        console.log(`✅ 数据库 '${DB_NAME}' 已就绪`);

        // 切换到目标数据库
        await connection.query(`USE \`${DB_NAME}\``);

        // 创建用户表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_username (username)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
            COMMENT='用户表'
        `);
        console.log('✅ 用户表 `user` 已就绪');

        // 创建操作日志表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS operation_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                username VARCHAR(50) NOT NULL,
                action VARCHAR(50) NOT NULL,
                detail TEXT,
                ip VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_user_id (user_id),
                INDEX idx_action (action),
                INDEX idx_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
            COMMENT='用户操作日志表'
        `);
        console.log('✅ 操作日志表 `operation_logs` 已就绪');

        // 验证表结构
        console.log('\n📋 表结构:');
        for (const table of ['user', 'operation_logs']) {
            const [columns] = await connection.query(`DESCRIBE ${table}`);
            console.log(`\n  [${table}]`);
            columns.forEach(col => {
                console.log(`     ${col.Field.padEnd(15)} ${col.Type.padEnd(20)} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'.padEnd(8)} ${col.Key || ''}`);
            });
        }

        console.log('\n🎉 数据库初始化完成！');
        process.exit(0);
    } catch (error) {
        console.error('❌ 数据库初始化失败:', error.message);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

initDatabase();
