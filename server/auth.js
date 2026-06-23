const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const pool = require('./db');

// 注册接口
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 简单验证
        if (!username || !password) {
            return res.json({ success: false, message: '用户名和密码不能为空' });
        }
        
        // 检查用户名是否已存在
        const [users] = await pool.execute(
            'SELECT * FROM user WHERE username = ?',
            [username]
        );
        
        if (users.length > 0) {
            return res.json({ success: false, message: '用户名已存在' });
        }
        
        // 密码加密
        const hashedPassword = await bcryptjs.hash(password, 10);
        
        // 插入新用户
        await pool.execute(
            'INSERT INTO user (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        
        res.json({ success: true, message: '注册成功' });
    } catch (error) {
        console.error('注册错误:', error);
        res.json({ success: false, message: '注册失败，请稍后重试' });
    }
});

// 登录接口
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 查询用户
        const [users] = await pool.execute(
            'SELECT * FROM user WHERE username = ?',
            [username]
        );
        
        if (users.length === 0) {
            return res.json({ success: false, message: '用户名或密码错误' });
        }
        
        // 验证密码
        const user = users[0];
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        
        if (isPasswordValid) {
            // 这里可以添加Session或Token生成逻辑
            res.json({ 
                success: true, 
                message: '登录成功',
                user: { id: user.id, username: user.username }
            });
        } else {
            res.json({ success: false, message: '用户名或密码错误' });
        }
    } catch (error) {
        console.error('登录错误:', error);
        res.json({ success: false, message: '登录失败，请稍后重试' });
    }
});

module.exports = router;