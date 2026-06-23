/**
 * 操作日志查询 API
 * GET /api/logs?page=1&limit=20&action=login
 * 需要 Bearer Token 认证
 */
const express = require('express');
const router = express.Router();
const pool = require('./db');
const { authMiddleware } = require('./auth');

// 查询日志（需登录）
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
        const offset = (page - 1) * limit;
        const action = req.query.action || '';

        // 构建查询
        let countSql = 'SELECT COUNT(*) AS total FROM operation_logs';
        let dataSql = 'SELECT * FROM operation_logs';
        const params = [];

        if (action) {
            countSql += ' WHERE action = ?';
            dataSql += ' WHERE action = ?';
            params.push(action);
        }

        dataSql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

        // 查询总数（query 兼容性更好）
        const [countRows] = await pool.query(countSql, params);
        const total = countRows[0].total;

        // 查询数据
        const [rows] = await pool.query(dataSql, [...params, limit, offset]);

        res.json({
            success: true,
            data: {
                list: rows,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('日志查询错误:', error);
        res.status(500).json({ success: false, message: '查询失败' });
    }
});

module.exports = router;
