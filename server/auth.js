const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const { logAction } = require('./logger');

// JWT 密钥（生产环境应通过环境变量注入）
const JWT_SECRET = process.env.JWT_SECRET || 'dnf_tool_jwt_secret_key_2024';
const JWT_EXPIRES_IN = '7d'; // Token 有效期 7 天

// ===================== 简易登录失败计数（防暴力破解） =====================
const loginFailMap = new Map(); // key: ip+username, value: { count, firstFailTime }

const MAX_LOGIN_FAILS = 5;       // 最大失败次数
const FAIL_WINDOW_MS = 60 * 1000; // 计数窗口 1 分钟

function checkLoginRateLimit(ip, username) {
    const key = `${ip}:${username}`;
    const record = loginFailMap.get(key);
    const now = Date.now();

    if (!record) return true; // 没有记录，允许

    if (now - record.firstFailTime > FAIL_WINDOW_MS) {
        // 超过窗口期，清除记录
        loginFailMap.delete(key);
        return true;
    }

    if (record.count >= MAX_LOGIN_FAILS) {
        return false; // 超过限制
    }

    return true;
}

function recordLoginFail(ip, username) {
    const key = `${ip}:${username}`;
    const now = Date.now();
    const record = loginFailMap.get(key);

    if (!record || now - record.firstFailTime > FAIL_WINDOW_MS) {
        loginFailMap.set(key, { count: 1, firstFailTime: now });
    } else {
        record.count++;
    }
}

function clearLoginFail(ip, username) {
    loginFailMap.delete(`${ip}:${username}`);
}

// 定期清理过期记录（每5分钟）
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of loginFailMap) {
        if (now - record.firstFailTime > FAIL_WINDOW_MS) {
            loginFailMap.delete(key);
        }
    }
}, 5 * 60 * 1000);

// ===================== 输入校验工具 =====================
function validateUsername(username) {
    if (!username || typeof username !== 'string') {
        return '用户名不能为空';
    }
    const trimmed = username.trim();
    if (trimmed.length < 3 || trimmed.length > 20) {
        return '用户名长度需为3-20位';
    }
    if (!/^[\w一-龥]+$/.test(trimmed)) {
        return '用户名只能包含字母、数字、下划线和中文';
    }
    return null; // 通过
}

function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        return '密码不能为空';
    }
    if (password.length < 6) {
        return '密码长度需≥6位';
    }
    if (password.length > 128) {
        return '密码长度不能超过128位';
    }
    return null; // 通过
}

// ===================== 注册接口 =====================
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 输入校验
        const userError = validateUsername(username);
        if (userError) {
            return res.json({ success: false, message: userError });
        }

        const pwdError = validatePassword(password);
        if (pwdError) {
            return res.json({ success: false, message: pwdError });
        }

        const cleanUsername = username.trim();
        const cleanPassword = password; // 密码不 trim，保留空格

        // 检查用户名是否已存在
        const [users] = await pool.execute(
            'SELECT id FROM user WHERE username = ?',
            [cleanUsername]
        );

        if (users.length > 0) {
            return res.json({ success: false, message: '用户名已存在' });
        }

        // 密码加密
        const hashedPassword = await bcryptjs.hash(cleanPassword, 10);

        // 插入新用户
        const [result] = await pool.execute(
            'INSERT INTO user (username, password) VALUES (?, ?)',
            [cleanUsername, hashedPassword]
        );

        // 生成 JWT（注册即登录）
        const token = jwt.sign(
            { id: result.insertId, username: cleanUsername },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({
            success: true,
            message: '注册成功',
            token,
            user: { id: result.insertId, username: cleanUsername }
        });

        // 记录操作日志
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        logAction({
            userId: result.insertId,
            username: cleanUsername,
            action: 'register',
            detail: `新用户注册`,
            ip: clientIp
        });
    } catch (error) {
        console.error('注册错误:', error);
        res.json({ success: false, message: '注册失败，请稍后重试' });
    }
});

// ===================== 登录接口 =====================
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 基本校验
        if (!username || !password) {
            return res.json({ success: false, message: '用户名和密码不能为空' });
        }

        const cleanUsername = username.trim();
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';

        // 检查登录频率限制
        if (!checkLoginRateLimit(clientIp, cleanUsername)) {
            logAction({
                username: cleanUsername,
                action: 'login_blocked',
                detail: '登录频率超限被拦截',
                ip: clientIp
            });
            return res.json({
                success: false,
                message: '登录失败次数过多，请1分钟后再试'
            });
        }

        // 查询用户
        const [users] = await pool.execute(
            'SELECT * FROM user WHERE username = ?',
            [cleanUsername]
        );

        if (users.length === 0) {
            recordLoginFail(clientIp, cleanUsername);
            logAction({
                username: cleanUsername,
                action: 'login_failed',
                detail: '用户名不存在',
                ip: clientIp
            });
            return res.json({ success: false, message: '用户名或密码错误' });
        }

        // 验证密码
        const user = users[0];
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            recordLoginFail(clientIp, cleanUsername);
            logAction({
                userId: user.id,
                username: cleanUsername,
                action: 'login_failed',
                detail: '密码错误',
                ip: clientIp
            });
            return res.json({ success: false, message: '用户名或密码错误' });
        }

        // 登录成功，清除失败计数
        clearLoginFail(clientIp, cleanUsername);

        // 生成 JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({
            success: true,
            message: '登录成功',
            token,
            user: { id: user.id, username: user.username }
        });

        // 记录操作日志
        logAction({
            userId: user.id,
            username: user.username,
            action: 'login',
            detail: '登录成功',
            ip: clientIp
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.json({ success: false, message: '登录失败，请稍后重试' });
    }
});

// ===================== 认证中间件 =====================
function authMiddleware(req, res, next) {
    // 从 Authorization header 获取 token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: '未登录，请先登录' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id, username, iat, exp }
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: '登录已过期，请重新登录' });
        }
        return res.status(401).json({ success: false, message: '无效的登录凭证' });
    }
}

// 导出路由和中间件
router.authMiddleware = authMiddleware;
module.exports = router;
