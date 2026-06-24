/**
 * DNF 游戏启动 API
 * POST /api/launch-dnf
 */
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

// DNF 常见启动路径（按优先级）
const DNF_COMMON_PATHS = [
    process.env.DNF_PATH,                          // 自定义路径优先
    'C:\\WeGameApps\\地下城与勇士\\DNF.exe',
    'C:\\WeGameApps\\dnf\\DNF.exe',
    'C:\\Program Files\\腾讯游戏\\地下城与勇士\\DNF.exe',
    'C:\\Program Files (x86)\\腾讯游戏\\地下城与勇士\\DNF.exe',
    'D:\\腾讯游戏\\地下城与勇士\\DNF.exe',
].filter(Boolean);

// WeGame 协议启动
const WEGAME_PROTOCOL = 'start wegame://';

router.post('/launch-dnf', (req, res) => {
    // 先尝试 WeGame 协议（最通用）
    const protocolCmd = process.platform === 'win32' ? `start wegame://` : null;

    if (protocolCmd) {
        exec(protocolCmd, (err) => {
            if (!err) {
                return res.json({ success: true, message: '已通过WeGame启动地下城与勇士' });
            }
            // WeGame 协议失败，尝试直接启动
            tryDirectLaunch(res);
        });
    } else {
        tryDirectLaunch(res);
    }
});

function tryDirectLaunch(res) {
    // 查找存在的路径
    const fs = require('fs');
    const validPath = DNF_COMMON_PATHS.find(p => {
        try { return fs.existsSync(p); } catch { return false; }
    });

    if (!validPath) {
        return res.json({
            success: false,
            message: '未找到DNF安装路径，请设置环境变量 DNF_PATH 指向游戏启动程序'
        });
    }

    const cmd = process.platform === 'win32'
        ? `start "" "${validPath}"`
        : `"${validPath}"`;

    exec(cmd, (err) => {
        if (err) {
            return res.json({ success: false, message: `启动失败: ${err.message}` });
        }
        res.json({ success: true, message: '地下城与勇士启动中...' });
    });
}

// 下载 DNF — 后端代理，跟随重定向直到拿到文件，流式传给浏览器
const DNS_DOWNLOAD_CDN = 'https://down.qq.com/dnf/dltools/DNF_SEASON4_OB_V34.3.10.20_Full_0_tgod_signed.exe';

function proxyDownload(url, res, redirectCount) {
    if (redirectCount > 5) {
        return res.status(500).json({ success: false, message: '下载重定向次数过多' });
    }

    const https = require('https');
    const urlObj = new URL(url);

    https.get({
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        headers: {
            'Referer': 'https://dnf.qq.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 30000
    }, (proxyRes) => {
        // 跟随重定向
        if (proxyRes.statusCode >= 300 && proxyRes.statusCode < 400 && proxyRes.headers.location) {
            return proxyDownload(proxyRes.headers.location, res, redirectCount + 1);
        }

        // 流式传输文件
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="DNF_Setup.exe"');
        if (proxyRes.headers['content-length']) {
            res.setHeader('Content-Length', proxyRes.headers['content-length']);
        }

        proxyRes.pipe(res);
    }).on('error', (err) => {
        console.error('下载代理失败:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: '下载服务暂时不可用' });
        }
    });
}

router.get('/download-dnf', (req, res) => {
    proxyDownload(DNS_DOWNLOAD_CDN, res, 0);
});

module.exports = router;
