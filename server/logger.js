/**
 * 操作日志记录模块
 * 异步写入，不阻塞主业务流程
 */
const pool = require('./db');

/**
 * 记录用户操作
 * @param {object} opts
 * @param {number|null} opts.userId - 用户ID（未登录时为null）
 * @param {string} opts.username - 用户名
 * @param {string} opts.action - 操作类型：login, login_failed, login_blocked, register, logout, view_page 等
 * @param {string} [opts.detail] - 操作详情
 * @param {string} [opts.ip] - 客户端IP
 */
function logAction({ userId, username, action, detail = '', ip = '' }) {
    // 异步写入，不阻塞请求
    pool.execute(
        'INSERT INTO operation_logs (user_id, username, action, detail, ip) VALUES (?, ?, ?, ?, ?)',
        [userId || null, username || 'anonymous', action, detail, ip]
    ).catch(err => {
        // 日志写入失败不应影响主流程，仅打印错误
        console.error('[日志写入失败]', err.message);
    });
}

module.exports = { logAction };
