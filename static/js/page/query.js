// 查询页面逻辑 - 搜索联想、分类筛选
"use strict";

const DNF_STYLE_VARS = {
    silver: "#c0c0c0",
    gold: "#ffd700",
    border: "#8b7355",
    dark: "#1a1a1a"
};

// 补全套装数据
const setDatabase = {
    "gold": {
        name: "理想之黄金乡套装",
        alias: "俗称\"恍惚套\"",
        difficulty: "极高",
        category: "core",
        summary: "高增幅毕业套装，全面提升三速、伤害减免和技能范围",
        keywords: ["黄金乡", "恍惚", "高增幅", "三速", "毕业", "顶级打造"]
    },
    "dragon": {
        name: "龙战八荒套装",
        alias: "俗称\"无色套\"",
        difficulty: "高",
        category: "core",
        summary: "太初品级无色套，双形态切换，提供速度加成和特效伤害",
        keywords: ["龙战", "无色", "太初", "双形态", "特效", "顶级打造"]
    },
    "energy_3": {
        name: "究极能量套装（3觉）",
        alias: "三觉极限套",
        difficulty: "极高",
        category: "core",
        summary: "最大化三觉技能伤害，提供巨额技能攻击力加成",
        keywords: ["究极能量", "三觉", "极限", "技能攻击", "顶级打造"]
    },
    "valkyrie": {
        name: "诸神黄昏之女武神",
        alias: "持续输出套",
        difficulty: "高",
        category: "core",
        summary: "持续输出能力极强，技能循环流畅，附加50%持续伤害",
        keywords: ["女武神", "诸神黄昏", "持续输出", "技能循环", "高端打造"]
    },
    "energy_2": {
        name: "究极能量套装（2觉）",
        alias: "二觉续航套",
        difficulty: "高",
        category: "balanced",
        summary: "优化二觉技能表现，提升续航能力，二觉伤害+45%",
        keywords: ["究极能量", "二觉", "续航", "技能冷却", "高端打造"]
    },
    "nature": {
        name: "造化自然套装",
        alias: "均衡发展套",
        difficulty: "中",
        category: "balanced",
        summary: "各项属性均衡提升，无明显短板，伤害+35%，防御+20%",
        keywords: ["造化自然", "均衡", "防御", "过渡", "中等打造"]
    },
    "spirit_orb": {
        name: "青丘灵珠套装（满珠）",
        alias: "灵珠buff套",
        difficulty: "中",
        category: "balanced",
        summary: "通过灵珠叠加获得增益，满层提供30%全属性加成",
        keywords: ["青丘灵珠", "buff", "叠加", "三速", "中等打造"]
    },
    "chaos": {
        name: "混沌净化套装",
        alias: "强力CD切换套",
        difficulty: "高",
        category: "balanced",
        summary: "双模式CD套，净化模式减30%冷却，堕落模式减55%冷却",
        keywords: ["混沌", "净化", "CD", "霸体", "切换", "高端打造"]
    },
    "hunt": {
        name: "群猎美学套装",
        alias: "高速回血减伤套",
        difficulty: "低",
        category: "beginner",
        summary: "30%三速加成，每秒回血5%，减伤20%，单刷增伤24.1%",
        keywords: ["群猎", "回血", "减伤", "三速", "单刷", "平民打造"]
    },
    "shadow": {
        name: "潜影暗袭套装",
        alias: "影子机制手感套",
        difficulty: "中",
        category: "beginner",
        summary: "影子机制优化手感，可中断技能并瞬移，最高15%三速",
        keywords: ["潜影", "影子", "瞬移", "手感", "中等打造"]
    },
    "mage_normal": {
        name: "冥思者的魔力领域",
        alias: "魔力领域套（普通模式）",
        difficulty: "低",
        category: "beginner",
        summary: "魔力领域内提升35%技能伤害，自动回蓝，适合法师新手",
        keywords: ["冥思者", "魔力", "法师", "回蓝", "平民打造"]
    },
    "fate": {
        name: "天命者的气运",
        alias: "技能重置套",
        difficulty: "中",
        category: "beginner",
        summary: "攻击时有20%概率重置非觉醒技能，提升技能循环效率",
        keywords: ["天命", "重置", "技能循环", "概率", "中等打造"]
    }
};

let currentCategory = 'all';
let currentSets = Object.values(setDatabase);

// 修复DOMContentLoaded执行逻辑
document.addEventListener('DOMContentLoaded', function() {
    try {
        initStyleVars();
        if (!validateDOMElements()) return;
        initSearchButton();
        renderSetList(currentSets); // 直接渲染，不再依赖异步
        initializeEventListeners();
    } catch (e) {
        console.error("初始化失败：", e);
        document.getElementById('setList').innerHTML = `<div style="color: #ff4444; text-align: center; padding: 80px 20px;">加载失败：${e.message}</div>`;
    }
});

function initStyleVars() {
    const root = document.documentElement;
    Object.entries(DNF_STYLE_VARS).forEach(([key, value]) => {
        if (!getComputedStyle(root).getPropertyValue(`--dnf-${key}`)) {
            root.style.setProperty(`--dnf-${key}`, value);
        }
    });
}

function validateDOMElements() {
    const required = ['searchInput', 'setList', 'searchButton'];
    for (const id of required) {
        if (!document.getElementById(id)) {
            showError(`缺失核心元素#${id}`);
            return false;
        }
    }
    return true;
}

function initSearchButton() {
    document.getElementById('searchButton').addEventListener('click', performSearch);
}

function initializeEventListeners() {
    document.getElementById('searchInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
    });

    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category || 'all';
            filterSets();
        });
    });
}

function performSearch() {
    const term = document.getElementById('searchInput').value.toLowerCase().trim();
    const filtered = term ? currentSets.filter(set => 
        set.name.toLowerCase().includes(term) ||
        set.alias.toLowerCase().includes(term) ||
        set.keywords.some(k => k.toLowerCase().includes(term))
    ) : currentSets;
    renderSetList(filtered);
}

function filterSets() {
    currentSets = currentCategory === 'all' 
        ? Object.values(setDatabase)
        : Object.values(setDatabase).filter(set => set.category === currentCategory);
    renderSetList(currentSets);
}

function renderSetList(sets) {
    const list = document.getElementById('setList');
    if (sets.length === 0) {
        list.innerHTML = `<div style="color: #ffd700; text-align: center; padding: 80px 20px;">未找到匹配套装</div>`;
        return;
    }
    list.innerHTML = sets.map(set => `
        <div class="set-item" onclick="viewSetDetail('${set.name}')" style="background: #1a1a1a; border: 2px solid #8b7355; border-radius: 8px; padding: 15px; margin: 10px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="../static/img/logo/set-icon/${getSetIconName(set.name)}" alt="${set.name}" style="width: 60px; height: 60px;" onerror="this.src='../static/img/logo/set-icon/default-set.png'">
                <div>
                    <h4 style="color: #ffd700; margin: 0;">${set.name}</h4>
                    <div style="color: #c0c0c0; font-style: italic;">${set.alias}</div>
                    <span style="background: #8b7355; color: #1a1a1a; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-top: 5px; display: inline-block;">${getTierText(set.keywords)}</span>
                </div>
            </div>
            <p style="color: #c0c0c0; margin-top: 10px;">${set.summary}</p>
        </div>
    `).join('');
}

function getSetIconName(setName) {
    const map = {
        "理想之黄金乡套装": "gold-set.png",
        "龙战八荒套装": "dragon-set.png",
        "究极能量套装（3觉）": "energy3-set.png",
        "诸神黄昏之女武神": "valkyrie-set.png",
        "究极能量套装（2觉）": "energy2-set.png",
        "造化自然套装": "nature-set.png",
        "青丘灵珠套装（满珠）": "orb-set.png",
        "混沌净化套装": "chaos-set.png",
        "群猎美学套装": "hunt-set.png",
        "潜影暗袭套装": "shadow-set.png",
        "冥思者的魔力领域": "mage-set.png",
        "天命者的气运": "fate-set.png"
    };
    return map[setName] || "default-set.png";
}

function getTierText(keywords) {
    if (keywords.includes("顶级打造")) return "顶级打造";
    if (keywords.includes("高端打造")) return "高端打造";
    if (keywords.includes("中等打造")) return "中等打造";
    if (keywords.includes("平民打造")) return "平民打造";
    return "常规打造";
}

function viewSetDetail(setName) {
    const key = Object.keys(setDatabase).find(k => setDatabase[k].name === setName);
    if (key) window.location.href = `./detail.html?set=${key}`;
    else showError(`未找到${setName}的详情`);
}

// 补全resetSearch函数
function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.category-item[data-category="all"]').classList.add('active');
    currentCategory = 'all';
    currentSets = Object.values(setDatabase);
    renderSetList(currentSets);
}

function showError(message) {
    alert(`错误：${message}`);
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
}

function unescapeHtml(str) {
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, c => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'" }[c]));
}