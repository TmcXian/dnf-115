// 排行页面逻辑 - 筛选条件变更、排行渲染

// 模拟套装数据（与index.html保持一致的完整套装列表）
const mockSetData = {
    "gold": { 
        "name": "理想之黄金乡套装", 
        "alias": "俗称\"恍惚套\"", 
        "difficulty": "极高", 
        "score": 95,
        "category": "核心毕业套装",
        "damage": 98,
        "survival": 85,
        "mobility": 90,
        "soloScore": 94,
        "partyScore": 96
    },
    "dragon": { 
        "name": "龙战八荒套装", 
        "alias": "俗称\"无色套\"", 
        "difficulty": "高", 
        "score": 88,
        "category": "核心毕业套装",
        "damage": 95,
        "survival": 75,
        "mobility": 80,
        "soloScore": 89,
        "partyScore": 87
    },
    "energy_3": { 
        "name": "究极能量套装（3觉）", 
        "alias": "三觉极限套", 
        "difficulty": "极高", 
        "score": 93,
        "category": "核心毕业套装",
        "damage": 99,
        "survival": 80,
        "mobility": 75,
        "soloScore": 92,
        "partyScore": 94
    },
    "valkyrie": { 
        "name": "诸神黄昏之女武神", 
        "alias": "持续输出套", 
        "difficulty": "高", 
        "score": 90,
        "category": "核心毕业套装",
        "damage": 92,
        "survival": 90,
        "mobility": 85,
        "soloScore": 91,
        "partyScore": 89
    },
    "energy_2": { 
        "name": "究极能量套装（2觉）", 
        "alias": "二觉续航套", 
        "difficulty": "高", 
        "score": 86,
        "category": "均衡实用套装",
        "damage": 88,
        "survival": 82,
        "mobility": 80,
        "soloScore": 87,
        "partyScore": 85
    },
    "nature": { 
        "name": "造化自然套装", 
        "alias": "均衡发展套", 
        "difficulty": "中", 
        "score": 80,
        "category": "均衡实用套装",
        "damage": 82,
        "survival": 85,
        "mobility": 78,
        "soloScore": 80,
        "partyScore": 80
    },
    "spirit_orb": { 
        "name": "青丘灵珠套装（满珠）", 
        "alias": "灵珠buff套", 
        "difficulty": "中", 
        "score": 79,
        "category": "均衡实用套装",
        "damage": 75,
        "survival": 88,
        "mobility": 76,
        "soloScore": 77,
        "partyScore": 81
    },
    "chaos": { 
        "name": "混沌净化套装", 
        "alias": "强力CD切换套", 
        "difficulty": "高", 
        "score": 85,
        "category": "均衡实用套装",
        "damage": 80,
        "survival": 90,
        "mobility": 88,
        "soloScore": 86,
        "partyScore": 84
    },
    "hunt": { 
        "name": "群猎美学套装", 
        "alias": "高速回血减伤套", 
        "difficulty": "中", 
        "score": 82,
        "category": "新手/平民套装",
        "damage": 78,
        "survival": 92,
        "mobility": 90,
        "soloScore": 85,
        "partyScore": 79
    },
    "shadow": { 
        "name": "潜影暗袭套装", 
        "alias": "影子机制手感套", 
        "difficulty": "中", 
        "score": 78,
        "category": "新手/平民套装",
        "damage": 76,
        "survival": 75,
        "mobility": 95,
        "soloScore": 79,
        "partyScore": 77
    },
    "mage_normal": { 
        "name": "冥思者的魔力领域", 
        "alias": "魔力领域套（普通模式）", 
        "difficulty": "低", 
        "score": 75,
        "category": "新手/平民套装",
        "damage": 74,
        "survival": 80,
        "mobility": 72,
        "soloScore": 76,
        "partyScore": 74
    },
    "fate": { 
        "name": "天命者的气运", 
        "alias": "技能重置套", 
        "difficulty": "中", 
        "score": 77,
        "category": "新手/平民套装",
        "damage": 77,
        "survival": 72,
        "mobility": 80,
        "soloScore": 78,
        "partyScore": 76
    }
};

let currentRanking = [];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    // 初始化时直接加载综合强度排行（默认筛选条件）
    const defaultRankType = document.getElementById('rank-type').value;
    const defaultPlayerLevel = document.getElementById('player-level').value;
    const defaultGameMode = document.getElementById('game-mode').value;
    generateRanking(defaultRankType, defaultPlayerLevel, defaultGameMode);
});

// 初始化筛选器事件
function initializeFilters() {
    const rankTypeSelect = document.getElementById('rank-type');
    const playerLevelSelect = document.getElementById('player-level');
    const gameModeSelect = document.getElementById('game-mode');
    
    // 为所有筛选器添加变更事件
    rankTypeSelect.addEventListener('change', handleFilterChange);
    playerLevelSelect.addEventListener('change', handleFilterChange);
    gameModeSelect.addEventListener('change', handleFilterChange);
}

// 处理筛选条件变更
function handleFilterChange() {
    const rankType = document.getElementById('rank-type').value;
    const playerLevel = document.getElementById('player-level').value;
    const gameMode = document.getElementById('game-mode').value;
    
    // 显示加载状态
    const rankList = document.getElementById('rankList');
    if (rankList) {
        rankList.innerHTML = '<div class="loading-state">正在更新套装排行数据...</div>';
    }
    
    // 延迟生成排行，增强加载体验
    setTimeout(() => {
        generateRanking(rankType, playerLevel, gameMode);
    }, 300);
}

// 生成排行
function generateRanking(type, level, mode) {
    let sets = Object.entries(mockSetData).map(([key, set]) => ({
        key,
        ...set
    }));
    
    // 根据筛选条件调整排序
    sets = sortSetsByCriteria(sets, type, level, mode);
    currentRanking = sets;
    
    renderRanking(sets);
}

// 根据条件排序
function sortSetsByCriteria(sets, type, level, mode) {
    return sets.sort((a, b) => {
        // 根据排行类型选择基础分数
        let scoreA, scoreB;
        switch(type) {
            case 'damage':
                scoreA = a.damage;
                scoreB = b.damage;
                break;
            case 'survival':
                scoreA = a.survival;
                scoreB = b.survival;
                break;
            case 'mobility':
                scoreA = a.mobility;
                scoreB = b.mobility;
                break;
            case 'difficulty':
                // 难度排行倒序（低难度在前）
                const difficultyOrder = { '低': 1, '中': 2, '高': 3, '极高': 4 };
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            default: // overall
                // 根据游戏模式选择综合分数
                if (mode === 'solo') {
                    scoreA = a.soloScore;
                    scoreB = b.soloScore;
                } else if (mode === 'party') {
                    scoreA = a.partyScore;
                    scoreB = b.partyScore;
                } else {
                    scoreA = a.score;
                    scoreB = b.score;
                }
        }
        
        // 根据玩家水平调整分数
        if (level === 'beginner') {
            // 新手更偏向低难度套装
            scoreA -= a.difficulty === '极高' ? 20 : a.difficulty === '高' ? 10 : 0;
            scoreB -= b.difficulty === '极高' ? 20 : b.difficulty === '高' ? 10 : 0;
        } else if (level === 'high') {
            // 高端玩家更偏向高难度套装
            scoreA += a.difficulty === '极高' ? 10 : a.difficulty === '高' ? 5 : 0;
            scoreB += b.difficulty === '极高' ? 10 : b.difficulty === '高' ? 5 : 0;
        }
        
        return scoreB - scoreA;
    });
}

// 渲染排行列表
function renderRanking(sets) {
    const rankList = document.getElementById('rankList');
    if (!rankList) return;
    
    // 如果没有数据，显示错误状态
    if (sets.length === 0) {
        rankList.innerHTML = `
            <div class="error-state">
                <p>无法获取套装数据，请稍后重试</p>
                <button onclick="window.location.reload()" class="refresh-btn">刷新页面</button>
            </div>
        `;
        return;
    }
    
    // 渲染排行列表
    rankList.innerHTML = sets.map((set, index) => `
        <div class="rank-item" onclick="location.href='../page/detail.html?set=${set.key}'">
            <div class="rank-number">${index + 1}</div>
            <div class="rank-info">
                <div class="rank-name">${set.name} 
                    <span style="color: var(--dnf-silver); font-size: 14px;">(${set.alias})</span>
                </div>
                <div class="rank-desc">
                    分类: ${set.category} | 打造难度: ${set.difficulty}
                </div>
            </div>
            <div class="rank-score">${getDisplayScore(set)}</div>
        </div>
    `).join('');
}

// 根据当前排序类型获取显示分数
function getDisplayScore(set) {
    const rankType = document.getElementById('rank-type').value;
    const gameMode = document.getElementById('game-mode').value;
    
    switch(rankType) {
        case 'damage':
            return set.damage;
        case 'survival':
            return set.survival;
        case 'mobility':
            return set.mobility;
        case 'difficulty':
            return set.difficulty === '低' ? '简单' : 
                   set.difficulty === '中' ? '中等' : 
                   set.difficulty === '高' ? '困难' : '极难';
        default:
            return gameMode === 'solo' ? set.soloScore : 
                   gameMode === 'party' ? set.partyScore : set.score;
    }
}