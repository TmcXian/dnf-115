// 公共脚本 + 登录注册模态框控制
"use strict";

// ===================== 全局配置 =====================
const COMMON_CONFIG = {
    MAX_COMPARE_SETS: 4, // 对比套装最大数量
    SOUND_ENABLED: false, // 默认关闭音效
    MODAL_ANIMATION_DURATION: 300 // 弹窗动画时长(ms)
};

// ===================== 导航跳转功能（增强版） =====================
function navigateTo(page) {
    if (!page) return;
    
    // 验证页面路径合法性
    const validPages = ['index.html', 'query.html', 'profession.html', 'detail.html', 'compare.html'];
    const pageName = page.split('/').pop();
    
    if (validPages.includes(pageName)) {
        // 添加页面跳转动画
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            window.location.href = page;
        }, COMMON_CONFIG.MODAL_ANIMATION_DURATION);
    } else {
        console.warn(`无效的页面路径: ${page}`);
        window.location.href = 'index.html'; // 兜底跳转到首页
    }
}

// ===================== 通用弹窗控制（增强版） =====================
function showModal(title, content, options = {}) {
    // 关闭已有弹窗
    closeModal();
    
    // 合并配置
    const config = {
        width: '90%',
        maxWidth: '500px',
        showClose: true,
        ...options
    };
    
    // 创建弹窗容器
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.opacity = '0';
    modal.style.transition = `opacity ${COMMON_CONFIG.MODAL_ANIMATION_DURATION}ms ease`;
    modal.innerHTML = `
        <div class="modal-content" style="width: ${config.width}; max-width: ${config.maxWidth};">
            <div class="modal-header">
                <h3>${escapeHtml(title)}</h3>
                ${config.showClose ? `<span class="close-btn" onclick="closeModal()">&times;</span>` : ''}
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // 添加模态框样式（仅首次添加）
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(2px);
            }
            .modal-content {
                background: var(--dnf-dark);
                border: 2px solid var(--dnf-gold);
                border-radius: 8px;
                max-height: 80vh;
                overflow-y: auto;
                transform: translateY(-20px);
                transition: transform ${COMMON_CONFIG.MODAL_ANIMATION_DURATION}ms ease;
            }
            .modal-overlay.active .modal-content {
                transform: translateY(0);
            }
            .modal-header {
                background: var(--dnf-border);
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--dnf-gold);
            }
            .modal-header h3 {
                color: var(--dnf-gold);
                margin: 0;
                font-size: 18px;
            }
            .close-btn {
                color: var(--dnf-silver);
                font-size: 24px;
                cursor: pointer;
                transition: color 0.3s ease;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .close-btn:hover {
                color: var(--dnf-gold);
                background: rgba(255, 215, 0, 0.1);
                border-radius: 50%;
            }
            .modal-body {
                padding: 20px;
                color: var(--dnf-silver);
                line-height: 1.8;
            }
            /* 滚动条美化 */
            .modal-content::-webkit-scrollbar {
                width: 6px;
            }
            .modal-content::-webkit-scrollbar-track {
                background: var(--dnf-border);
            }
            .modal-content::-webkit-scrollbar-thumb {
                background: var(--dnf-gold);
                border-radius: 3px;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // 触发动画
    setTimeout(() => {
        modal.classList.add('active');
        modal.style.opacity = '1';
    }, 10);
    
    // 点击遮罩层关闭弹窗
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// 关闭通用弹窗
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
        }, COMMON_CONFIG.MODAL_ANIMATION_DURATION);
    }
}

// ===================== 登录注册模态框控制 =====================
// 显示登录模态框
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('active');
        modal.style.opacity = '1';
    }, 10);
}

// 关闭登录/注册模态框
function closeAuthModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.add('hidden');
    }, COMMON_CONFIG.MODAL_ANIMATION_DURATION); // 使用全局配置的动画时长，保持一致性
}

// 初始化登录/注册表单
function initAuthForms() {
    // 绑定登录按钮点击事件
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
    }
    
    // 切换到注册表单
    const switchToRegister = document.getElementById('switchToRegister');
    if (switchToRegister) {
        switchToRegister.addEventListener('click', () => {
            document.getElementById('loginForm')?.classList.add('hidden');
            document.getElementById('registerForm')?.classList.remove('hidden');
            document.getElementById('authModalTitle').textContent = '用户注册';
        });
    }
    
    // 切换到登录表单
    const switchToLogin = document.getElementById('switchToLogin');
    if (switchToLogin) {
        switchToLogin.addEventListener('click', () => {
            document.getElementById('registerForm')?.classList.add('hidden');
            document.getElementById('loginForm')?.classList.remove('hidden');
            document.getElementById('authModalTitle').textContent = '用户登录';
        });
    }

    // 登录表单提交
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername')?.value;
            const password = document.getElementById('loginPassword')?.value;
            
            // 简单的表单验证
            if (!username || !password) {
                showModal('提示', '请输入完整的用户名和密码');
                return;
            }
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                if (data.success) {
                    showModal('登录成功', `欢迎回来，${escapeHtml(username)}`); // 使用escapeHtml防XSS
                    closeAuthModal();
                    // 这里可以添加登录状态保存逻辑
                } else {
                    showModal('登录失败', escapeHtml(data.message || '登录失败，请检查账号密码'));
                }
            } catch (error) {
                console.error('登录请求失败:', error);
                showModal('错误', '登录请求失败，请稍后重试');
            }
        });
    }

    // 注册表单提交
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername')?.value;
            const password = document.getElementById('regPassword')?.value;
            
            // 简单的表单验证
            if (!username || !password) {
                showModal('提示', '请输入完整的用户名和密码');
                return;
            }
            
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                if (data.success) {
                    showModal('注册成功', '账号创建成功，请登录');
                    document.getElementById('switchToLogin')?.click();
                } else {
                    showModal('注册失败', escapeHtml(data.message || '注册失败，请稍后重试'));
                }
            } catch (error) {
                console.error('注册请求失败:', error);
                showModal('错误', '注册请求失败，请稍后重试');
            }
        });
    }
}

// ===================== 术语解释（增强版） =====================
const termExplanations = {
    '三速': '攻击速度、移动速度、释放速度的统称，直接影响角色操作手感和输出效率',
    '技工': '技能伤害增加量的简称，是DNF中核心的伤害提升属性',
    'CD': 'Cool Down，技能冷却时间的缩写，CD越短技能释放频率越高',
    '太初品级': 'DNF 115版本中装备的最高品级，解锁套装专属特殊效果和属性加成',
    '增幅': '通过增幅器消耗矛盾的结晶体提升装备属性的系统，+10以上会有质的提升',
    '无色套': '依赖无色小晶块释放技能触发特效的套装流派',
    '手感套': '优先提升操作流畅度和技能衔接体验的套装',
    '毕业装': '当前版本最优的套装选择，综合属性最强'
};

function explainTerm(term) {
    const cleanTerm = term.trim();
    const explanation = termExplanations[cleanTerm] || `暂无「${cleanTerm}」的相关解释`;
    showModal(`术语解释：${cleanTerm}`, `<p>${escapeHtml(explanation)}</p>`);
}

// ===================== 播放音效（增强版） =====================
function playSound(soundType) {
    if (!COMMON_CONFIG.SOUND_ENABLED) return;
    
    const soundMap = {
        'success': '../static/audio/success.mp3',
        'error': '../static/audio/error.mp3',
        'click': '../static/audio/click.mp3'
    };
    
    const soundSrc = soundMap[soundType] || soundMap['click'];
    
    try {
        const audio = new Audio(soundSrc);
        audio.volume = 0.3;
        audio.play().catch(e => console.log('音效播放失败:', e));
    } catch (e) {
        console.error('创建音效对象失败:', e);
    }
}

// ===================== 通用工具函数 =====================
/**
 * HTML转义（防XSS）
 * @param {string} str - 要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * 格式化套装名称
 * @param {string} setKey - 套装key
 * @returns {string} 格式化后的套装名称
 */
function formatSetName(setKey) {
    const setMap = {
        'gold': '理想之黄金乡套装 (恍惚套)',
        'dragon': '龙战八荒套装 (无色套)',
        'hunt': '群猎美学套装 (高速回血减伤套)',
        'shadow': '潜影暗袭套装 (影子机制手感套)',
        'chaos': '混沌净化套装 (强力CD切换套)'
    };
    return setMap[setKey] || setKey;
}

/**
 * 获取套装基础数据
 * @param {string} setKey - 套装key
 * @returns {object} 套装数据
 */
function getSetData(setKey) {
    const setData = {
        'gold': {
            name: '理想之黄金乡套装',
            alias: '恍惚套',
            difficulty: '极高',
            category: '毕业装',
            speed: '★★★★★',
            damage: '★★★★★',
            cd: '★★★',
            survival: '★★★',
            description: '高增幅毕业套装，全面提升三速、伤害减免和技能范围'
        },
        'dragon': {
            name: '龙战八荒套装',
            alias: '无色套',
            difficulty: '高',
            category: '特色装',
            speed: '★★★★',
            damage: '★★★★★',
            cd: '★★★',
            survival: '★★★',
            description: '太初品级无色套，双形态切换，提供速度加成和特效伤害'
        },
        'hunt': {
            name: '群猎美学套装',
            alias: '高速回血减伤套',
            difficulty: '中',
            category: '实用装',
            speed: '★★★★★',
            damage: '★★★',
            cd: '★★★★',
            survival: '★★★★★',
            description: '30%三速加成，回血回蓝，单刷增伤24.1%'
        },
        'shadow': {
            name: '潜影暗袭套装',
            alias: '影子机制手感套',
            difficulty: '中',
            category: '手感装',
            speed: '★★★★★',
            damage: '★★★★',
            cd: '★★★★',
            survival: '★★★★',
            description: '影子机制优化手感，可中断技能并瞬移，最高15%三速'
        },
        'chaos': {
            name: '混沌净化套装',
            alias: '强力CD切换套',
            difficulty: '高',
            category: '功能装',
            speed: '★★★',
            damage: '★★★★',
            cd: '★★★★★',
            survival: '★★★★',
            description: '双模式CD套，净化30%冷却，堕落55%冷却加霸体'
        }
    };
    return setData[setKey] || null;
}

// ===================== 页面初始化 =====================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化术语解释功能
    document.querySelectorAll('[data-term]').forEach(element => {
        element.style.cursor = 'help';
        element.style.color = 'var(--dnf-gold)';
        element.style.textDecoration = 'underline dotted';
        
        // 添加hover提示
        element.setAttribute('title', `点击查看「${element.getAttribute('data-term')}」的解释`);
        
        element.addEventListener('click', function() {
            const term = this.getAttribute('data-term');
            explainTerm(term);
            playSound('click');
        });
    });

    // 初始化登录注册表单
    initAuthForms();
});

// ===================== 暴露全局变量（供其他脚本使用） =====================
window.COMMON_CONFIG = COMMON_CONFIG;
window.navigateTo = navigateTo;
window.showModal = showModal;
window.closeModal = closeModal;
window.explainTerm = explainTerm;
window.playSound = playSound;
window.escapeHtml = escapeHtml;
window.formatSetName = formatSetName;
window.getSetData = getSetData;
window.showLoginModal = showLoginModal;
window.closeAuthModal = closeAuthModal;
window.initAuthForms = initAuthForms;