// 详情页面逻辑 - 属性/建议/获取方式，动态渲染
"use strict"; // 开启严格模式，避免隐式错误

// 全局常量定义（统一管理样式变量）
const DNF_STYLE_VARS = {
    dark: "#1a1a1a",
    gold: "#ffd700",
    silver: "#c0c0c0",
    border: "#8b7355",
    red: "#ff4444"
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化样式变量（防止base.css未定义变量导致样式异常）
    initStyleVars();
    
    const urlParams = new URLSearchParams(window.location.search);
    const setId = urlParams.get('set');
    
    if (setId) {
        // 先清空加载中提示，再加载数据
        const contentDiv = document.getElementById('setDetailContent');
        if (contentDiv) contentDiv.innerHTML = '<div style="text-align: center; padding: 80px 20px; color: var(--dnf-gold);"><p>正在加载套装详情...</p></div>';
        
        loadSetDetail(setId);
    } else {
        showError('未指定套装ID，请返回查询页面重新选择');
    }
});

// 初始化全局CSS变量（兼容base.css缺失场景）
function initStyleVars() {
    const root = document.documentElement;
    Object.entries(DNF_STYLE_VARS).forEach(([key, value]) => {
        if (!getComputedStyle(root).getPropertyValue(`--dnf-${key}`)) {
            root.style.setProperty(`--dnf-${key}`, value);
        }
    });
}

// 加载套装详情
function loadSetDetail(setId) {
    // 校验setId格式（防止非法参数）
    if (!/^[a-z0-9_-]+$/.test(setId)) {
        showError('套装ID格式错误');
        return;
    }

    // 模拟从JSON数据获取信息（后续可替换为fetch请求set-data.json）
    const setData = {
        "gold": {
            name: "理想之黄金乡套装",
            alias: "俗称 \"恍惚套\"",
            description: "套装属性会根据装备增幅数值提升，全身红12可拉满属性。加成包含20%~24%的攻击速度、移动速度和释放速度，10%~12%的伤害减免，以及20%~24%的技能范围提升，兼顾伤害、三速与技能范围，是高增幅玩家的毕业首选。",
            stats: {
                "攻击速度": "20%~24%",
                "移动速度": "20%~24%", 
                "释放速度": "20%~24%",
                "伤害减免": "10%~12%",
                "技能范围": "20%~24%",
                "特殊说明": "属性随增幅数值提升"
            },
            recommendation: "适合高增幅玩家，全身红12可达到最佳效果",
            difficulty: "极高",
            tags: ["毕业装", "高增幅", "三速", "技能范围"]
        },
        "dragon": {
            name: "龙战八荒套装", 
            alias: "也被称为 \"无色套\"",
            description: "达成太初品级后，未开启如意珠状态时，无色小晶块消耗量减少5，三速提升10%；开启如意珠状态后，所有速度提升30%，技能伤害增加3%，无色技能消耗量固定为15，释放无色技能时还会触发额外特效伤害。",
            stats: {
                "普通状态-消耗减少": "无色小晶块消耗量减少5",
                "普通状态-速度提升": "三速提升10%",
                "激活状态-速度提升": "所有速度提升30%",
                "激活状态-伤害增加": "技能伤害增加3%",
                "激活状态-消耗固定": "无色技能消耗量固定为15",
                "特殊效果": "释放无色技能触发额外特效伤害",
                "需求条件": "需达成太初品级"
            },
            recommendation: "适合依赖无色技能的玩家",
            difficulty: "高",
            tags: ["太初品级", "无色套", "双形态", "特效伤害"]
        },
        "energy_3": {
            name: "究极能量套装（3觉）",
            alias: "三觉极限套",
            description: "专为三觉技能优化的毕业套装，可大幅提升三觉技能伤害与范围。激活三觉状态时，所有技能冷却时间减少15%，技攻提升25%，并获得50%的伤害减免效果，持续15秒。套装属性受角色觉醒等级影响，觉醒等级越高加成越显著。",
            stats: {
                "三觉技能伤害": "提升80%~120%",
                "三觉技能范围": "扩大50%",
                "三觉状态-技攻": "提升25%",
                "三觉状态-冷却缩减": "15%",
                "三觉状态-减伤": "50%",
                "持续时间": "15秒（冷却45秒）",
                "关联属性": "受觉醒等级影响"
            },
            recommendation: "适合已完成三次觉醒且以三觉技能为核心输出的职业",
            difficulty: "极高",
            tags: ["三觉", "极限输出", "毕业装", "觉醒关联"]
        },
        "valkyrie": {
            name: "诸神黄昏之女武神",
            alias: "持续输出套",
            description: "主打持续输出的高端套装，普通攻击命中敌人时会积累女神能量，满层后进入女武神形态，期间所有技能无需消耗MP且攻击力提升30%。套装自带20%的暴击率加成和15%的暴击伤害提升，适合需要持续站桩输出的职业。",
            stats: {
                "女武神形态-攻击力": "提升30%",
                "女武神形态-MP消耗": "0",
                "暴击率加成": "20%",
                "暴击伤害": "15%",
                "形态持续时间": "20秒",
                "能量积累方式": "普通攻击命中（每击+10%）"
            },
            recommendation: "适合漫游枪手、元素师等依赖持续输出的职业",
            difficulty: "高",
            tags: ["持续输出", "暴击加成", "形态切换", "无MP消耗"]
        },
        "energy_2": {
            name: "究极能量套装（2觉）",
            alias: "二觉续航套",
            description: "针对二次觉醒技能优化的续航套装，二觉技能冷却时间减少40%，伤害提升50%。套装提供18%的技攻加成和25%的三速提升，适合需要频繁使用二觉技能进行续航输出的职业。相比3觉版本更易获取，打造门槛更低。",
            stats: {
                "二觉技能冷却": "减少40%",
                "二觉技能伤害": "提升50%",
                "基础技攻": "18%",
                "三速加成": "25%",
                "套装特性": "无觉醒等级门槛",
                "获取难度": "中等"
            },
            recommendation: "适合未完成三觉或依赖二觉续航的职业",
            difficulty: "高",
            tags: ["二觉", "续航", "低门槛", "三速"]
        },
        "nature": {
            name: "造化自然套装",
            alias: "均衡发展套",
            description: "各项属性均衡的实用套装，无明显短板。提供15%的全属性加成、20%的三速提升和10%的伤害减免，同时具备每秒3%的HP/MP恢复效果。套装适配所有职业，无需特殊操作即可发挥全部性能，非常适合新手过渡。",
            stats: {
                "全属性加成": "15%",
                "三速提升": "20%",
                "伤害减免": "10%",
                "HP/MP恢复": "每秒3%",
                "适配性": "全职业通用",
                "操作难度": "无特殊操作"
            },
            recommendation: "适合所有职业，尤其推荐新手和追求均衡属性的玩家",
            difficulty: "中",
            tags: ["均衡", "续航", "新手友好", "全职业"]
        },
        "spirit_orb": {
            name: "青丘灵珠套装（满珠）",
            alias: "灵珠buff套",
            description: "通过积累灵珠层数提升属性的特色套装，最多可积累10颗灵珠。每层灵珠提供2%的技攻加成和1%的三速提升，满层时额外获得霸体效果和10%的伤害减免。灵珠可通过击杀敌人或使用技能积累，死亡后保留50%层数。",
            stats: {
                "单颗灵珠-技攻": "2%",
                "单颗灵珠-三速": "1%",
                "满层效果-霸体": "常驻",
                "满层效果-减伤": "10%",
                "灵珠上限": "10颗",
                "死亡保留": "50%层数"
            },
            recommendation: "适合所有职业，尤其适合需要持续作战的副本",
            difficulty: "中",
            tags: ["灵珠机制", "buff叠加", "霸体", "续航"]
        },
        "chaos": {
            name: "混沌净化套装",
            alias: "强力CD套",
            description: "是一套强力CD套，支持净化和堕落两种模式自由切换。净化模式下，增加10%技攻、30%冷却缩减并提供护盾；堕落模式下，冷却缩减幅度提升至55%，同时附加霸体效果和二连跳能力。",
            stats: {
                "净化模式-技攻": "增加10%技攻",
                "净化模式-冷却缩减": "30%冷却缩减",
                "净化模式-护盾": "提供护盾",
                "堕落模式-冷却缩减": "55%冷却缩减", 
                "堕落模式-霸体": "附加霸体效果",
                "堕落模式-跳跃": "二连跳能力",
                "切换特性": "双模式自由切换"
            },
            recommendation: "适合需要灵活应对不同战斗情况的玩家",
            difficulty: "高",
            tags: ["CD套", "双模式", "净化", "堕落", "灵活切换"]
        },
        "hunt": {
            name: "群猎美学套装",
            alias: "高速回血减伤套", 
            description: "提供30%的三速加成，具备回血回蓝效果和15%的所受伤害减免。单刷时可增加24.1%的技工，组队时能使敌人受到的伤害提升5%~8%；主动技能可给敌人挂上易伤debuff，功能类似老版本的巨龙套。",
            stats: {
                "三速加成": "30%",
                "伤害减免": "15%",
                "单刷效果": "增加24.1%的技工",
                "组队效果": "敌人受到伤害提升5%~8%",
                "主动技能": "给敌人挂上易伤debuff",
                "功能类比": "类似老版本的巨龙套"
            },
            recommendation: "适合单刷和高难度副本",
            difficulty: "中", 
            tags: ["三速", "回血回蓝", "单刷", "组队增益"]
        },
        "shadow": {
            name: "潜影暗袭套装",
            alias: "影子机制手感套",
            description: "释放技能可积累\"影子\"层数，消耗影子层数能够中断当前释放的角色技能，让全职业都拥有类似武神的流畅手感；消耗五层影子还能瞬移到敌人身后。该套装的攻击速度、移动速度、释放速度最高可提升15%。",
            stats: {
                "核心机制": "影子层数系统",
                "技能中断": "消耗影子层数中断当前技能",
                "瞬移能力": "消耗五层影子瞬移到敌人身后", 
                "速度提升": "三速最高可提升15%",
                "特色功能": "全职业都有类似武神的流畅手感"
            },
            recommendation: "适合追求操作手感的玩家",
            difficulty: "中",
            tags: ["影子机制", "手感优化", "瞬移", "技能中断"]
        },
        "mage_normal": {
            name: "冥思者的魔力领域",
            alias: "魔力领域套（普通模式）",
            description: "为法师职业设计的平民友好套装，普通模式下提供30%的魔法攻击力加成和20%的MP恢复速度。释放技能时有50%概率生成魔力领域，进入领域内的敌人会受到持续魔法伤害并降低10%的魔法抗性。套装获取难度低，适合新手法师过渡使用。",
            stats: {
                "魔法攻击力": "30%",
                "MP恢复速度": "20%",
                "魔力领域概率": "50%（技能释放时）",
                "领域效果-持续伤害": "每秒3%魔法伤害",
                "领域效果-减抗": "10%魔法抗性",
                "职业适配": "全法师系职业"
            },
            recommendation: "适合新手法师职业，如元素师、魔道学者等",
            difficulty: "低",
            tags: ["法师专属", "平民", "魔力领域", "过渡装"]
        },
        "fate": {
            name: "天命者的气运",
            alias: "技能重置套",
            description: "主打技能重置机制的特色套装，攻击时有10%概率重置当前冷却时间最长的技能。套装提供15%的全技能伤害加成和10%的三速提升，当技能被重置时会获得5秒的霸体效果。适合依赖核心技能输出的职业，随机性较强但上限较高。",
            stats: {
                "技能重置概率": "10%（攻击时）",
                "全技能伤害": "15%",
                "三速提升": "10%",
                "重置触发效果": "5秒霸体",
                "机制特色": "重置冷却最长技能",
                "适用场景": "长CD技能依赖型职业"
            },
            recommendation: "适合散打、大枪等依赖核心技能输出的职业",
            difficulty: "中",
            tags: ["技能重置", "随机性", "霸体", "核心技能"]
        }
    };
    
    const setInfo = setData[setId];
    if (setInfo) {
        renderSetDetail(setInfo);
    } else {
        showError(`未找到ID为「${setId}」的套装，请确认套装ID是否正确`);
    }
}

// 渲染套装详情
function renderSetDetail(setInfo) {
    // 校验DOM元素是否存在（防止元素缺失导致报错）
    const titleEl = document.getElementById('setTitle');
    const contentDiv = document.getElementById('setDetailContent');
    
    if (!titleEl || !contentDiv) {
        showError('页面核心元素缺失，请刷新页面重试');
        return;
    }

    // 更新标题
    titleEl.textContent = setInfo.name;
    
    // 渲染详情内容（优化HTML结构，增加空值处理）
    contentDiv.innerHTML = `
        <div class="detail-container">
            <!-- 套装基本信息 -->
            <div class="detail-header">
                <div class="set-basic-info">
                    <h2>${escapeHtml(setInfo.name)}</h2>
                    <p class="set-alias">${escapeHtml(setInfo.alias || '无别名')}</p>
                    <div class="set-tags">
                        ${(setInfo.tags && setInfo.tags.length > 0) 
                            ? setInfo.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('') 
                            : '<span class="tag">无标签</span>'}
                    </div>
                </div>
            </div>
            
            <!-- 套装描述 -->
            <div class="detail-section">
                <h3>套装介绍</h3>
                <p class="set-description">${escapeHtml(setInfo.description || '暂无描述')}</p>
            </div>
            
            <!-- 属性详情 -->
            <div class="detail-section">
                <h3>属性详情</h3>
                <div class="stats-grid">
                    ${setInfo.stats && Object.keys(setInfo.stats).length > 0 
                        ? Object.entries(setInfo.stats).map(([key, value]) => `
                            <div class="stat-item">
                                <span class="stat-name">${escapeHtml(key)}</span>
                                <span class="stat-value">${escapeHtml(value)}</span>
                            </div>
                        `).join('')
                        : '<p class="no-stats">暂无属性信息</p>'}
                </div>
            </div>
            
            <!-- 推荐建议 -->
            <div class="detail-section">
                <h3>推荐建议</h3>
                <div class="recommendation-box">
                    <p><strong>适用人群:</strong> ${escapeHtml(setInfo.recommendation || '暂无推荐')}</p>
                    <p><strong>打造难度:</strong> <span class="difficulty-${escapeHtml(setInfo.difficulty || '中')}">${escapeHtml(setInfo.difficulty || '中')}</span></p>
                </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="detail-actions">
                <button onclick="compareWithOther('${setInfo.name}')" class="action-btn primary">与其他套装对比</button>
                <button onclick="goBack()" class="action-btn secondary">返回查询</button>
            </div>
        </div>
    `;
    
    // 添加详情页样式
    addDetailStyles();
}

// 添加详情页样式（优化样式兼容性，增加响应式）
function addDetailStyles() {
    if (document.querySelector('#detail-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'detail-styles';
    style.textContent = `
        :root {
            --dnf-dark: ${DNF_STYLE_VARS.dark};
            --dnf-gold: ${DNF_STYLE_VARS.gold};
            --dnf-silver: ${DNF_STYLE_VARS.silver};
            --dnf-border: ${DNF_STYLE_VARS.border};
            --dnf-red: ${DNF_STYLE_VARS.red};
        }
        
        .detail-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
            box-sizing: border-box;
        }
        
        .detail-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: var(--dnf-dark);
            border: 2px solid var(--dnf-border);
            border-radius: 8px;
            box-sizing: border-box;
        }
        
        .detail-header h2 {
            color: var(--dnf-gold);
            font-size: 28px;
            margin-bottom: 10px;
            margin-top: 0;
        }
        
        .set-alias {
            color: var(--dnf-silver);
            font-size: 16px;
            font-style: italic;
            margin-bottom: 15px;
            margin-top: 0;
        }
        
        .set-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }
        
        .tag {
            background: rgba(255, 215, 0, 0.2);
            color: var(--dnf-gold);
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            border: 1px solid var(--dnf-gold);
            box-sizing: border-box;
        }
        
        .detail-section {
            background: var(--dnf-dark);
            border: 2px solid var(--dnf-border);
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            box-sizing: border-box;
        }
        
        .detail-section h3 {
            color: var(--dnf-gold);
            font-size: 20px;
            margin-bottom: 15px;
            margin-top: 0;
            border-bottom: 1px solid var(--dnf-border);
            padding-bottom: 8px;
        }
        
        .set-description {
            color: var(--dnf-silver);
            line-height: 1.8;
            font-size: 16px;
            margin: 0;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 15px;
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            border-left: 3px solid var(--dnf-gold);
            box-sizing: border-box;
        }
        
        .stat-name {
            color: var(--dnf-silver);
            font-size: 14px;
        }
        
        .stat-value {
            color: var(--dnf-gold);
            font-weight: bold;
            font-size: 14px;
        }
        
        .no-stats {
            color: var(--dnf-silver);
            text-align: center;
            padding: 20px;
        }
        
        .recommendation-box {
            background: rgba(255, 215, 0, 0.1);
            border: 1px solid var(--dnf-gold);
            border-radius: 6px;
            padding: 20px;
            box-sizing: border-box;
        }
        
        .recommendation-box p {
            color: var(--dnf-silver);
            margin-bottom: 10px;
            margin-top: 0;
            line-height: 1.6;
        }
        
        .recommendation-box p:last-child {
            margin-bottom: 0;
        }
        
        .difficulty-极高 { color: #ff4444; font-weight: bold; }
        .difficulty-高 { color: #ff8800; font-weight: bold; }
        .difficulty-中 { color: #44ff44; font-weight: bold; }
        .difficulty-低 { color: #8888ff; font-weight: bold; }
        
        .detail-actions {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 40px;
            flex-wrap: wrap;
        }
        
        .action-btn {
            padding: 12px 30px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }
        
        .action-btn.primary {
            background: var(--dnf-gold);
            color: var(--dnf-dark);
        }
        
        .action-btn.primary:hover {
            background: #ffed4e;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .action-btn.secondary {
            background: transparent;
            color: var(--dnf-silver);
            border: 2px solid var(--dnf-border);
        }
        
        .action-btn.secondary:hover {
            border-color: var(--dnf-gold);
            color: var(--dnf-gold);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        /* 响应式适配 */
        @media (max-width: 768px) {
            .detail-header {
                padding: 20px;
            }
            .detail-header h2 {
                font-size: 24px;
            }
            .detail-section {
                padding: 20px;
            }
            .stats-grid {
                grid-template-columns: 1fr;
            }
            .action-btn {
                width: 100%;
                max-width: 300px;
            }
        }

        /* 加载中样式统一 */
        .loading-tip {
            text-align: center;
            padding: 80px 20px;
            color: var(--dnf-gold);
            font-size: 16px;
        }
    `;
    document.head.appendChild(style);
}

// 显示错误信息（优化样式和交互）
function showError(message) {
    const contentDiv = document.getElementById('setDetailContent');
    if (!contentDiv) return;

    contentDiv.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--dnf-red); background: var(--dnf-dark); border-radius: 8px; margin: 20px;">
            <h2 style="margin-top: 0; color: var(--dnf-red);">操作错误</h2>
            <p style="color: var(--dnf-silver); line-height: 1.6;">${escapeHtml(message)}</p>
            <button onclick="goBack()" style="margin-top: 20px; padding: 10px 20px; background: var(--dnf-gold); border: none; border-radius: 4px; cursor: pointer; font-weight: bold; color: var(--dnf-dark);">返回查询页面</button>
        </div>
    `;
}

// 与其他套装对比（优化跳转逻辑，适配page目录路径）
function compareWithOther(setName) {
    // 优先尝试跳转对比页面，失败则显示提示
    try {
        const encodedSetName = encodeURIComponent(setName || '');
        // 修复：对比页面路径适配page目录（同级别跳转）
        window.location.href = `./compare.html?baseSet=${encodedSetName}`;
    } catch (e) {
        showModal('功能提示', '<p>套装对比功能正在开发中，敬请期待！</p>');
    }
}

// 返回上一页（增加容错，适配page目录路径）
function goBack() {
    if (history.length > 1) {
        history.back();
    } else {
        // 修复：兜底跳转路径适配page目录（同级别query.html）
        window.location.href = './query.html'; 
    }
}

// 通用弹窗函数（补充缺失的showModal实现）
function showModal(title, content) {
    // 移除已有弹窗
    const oldModal = document.getElementById('dnf-modal');
    if (oldModal) oldModal.remove();

    // 创建弹窗
    const modal = document.createElement('div');
    modal.id = 'dnf-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        box-sizing: border-box;
    `;

    modal.innerHTML = `
        <div style="background: var(--dnf-dark); border: 2px solid var(--dnf-gold); border-radius: 8px; padding: 30px; max-width: 400px; width: 90%; box-sizing: border-box;">
            <h3 style="color: var(--dnf-gold); margin-top: 0; margin-bottom: 15px;">${escapeHtml(title)}</h3>
            <div style="color: var(--dnf-silver); margin-bottom: 20px;">${content}</div>
            <button onclick="document.getElementById('dnf-modal').remove()" style="padding: 8px 20px; background: var(--dnf-gold); border: none; border-radius: 4px; cursor: pointer; font-weight: bold; color: var(--dnf-dark);">确定</button>
        </div>
    `;

    document.body.appendChild(modal);
}

// 辅助函数：HTML转义（防止XSS和特殊字符渲染异常）
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}