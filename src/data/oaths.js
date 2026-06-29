// 誓约系统完整数据 — 千海天版本
export const oaths = [
  {
    id: 'gold', name: '理想之黄金乡', overallStrength: 'S',
    recommendedBranch: 0,
    description: '红12最强全能套，超高功能性。誓约系统核心推荐，属性随增幅数值提升。',
    branches: [
      {
        name: '基础分支', subtitle: '原套装特性优化', type: 'base',
        summary: '最稳定的全能型选择，+12增幅拉满后强度登顶',
        stats: [
          { label: '攻击速度', value: '24%' }, { label: '移动速度', value: '24%' },
          { label: '释放速度', value: '24%' }, { label: '伤害减免', value: '12%' },
          { label: '技能范围', value: '24%' }
        ],
        effects: ['属性随增幅数值提升', '全身红12拉满属性', '三速+技能范围全面提升'],
        note: '推荐分支：高增幅玩家首选，全能无短板'
      },
      {
        name: '分支1 (左)', subtitle: '爆发特化', type: 'burst',
        summary: '大特效伤害爆发型，牺牲部分功能性换取更高输出',
        stats: [
          { label: '技能攻击力', value: '+8%' }, { label: '攻击速度', value: '18%' },
          { label: '移动速度', value: '18%' }, { label: '释放速度', value: '18%' }
        ],
        effects: ['爆发时触发额外特效', '技能范围略微缩减'],
        note: '适合追求极限输出的玩家'
      },
      {
        name: '分支2 (右)', subtitle: '持续/功能', type: 'sustain',
        summary: '增强生存和续航，减少技能冷却',
        stats: [
          { label: '冷却缩减', value: '15%' }, { label: '伤害减免', value: '20%' },
          { label: 'HP恢复', value: '每秒0.5%' }
        ],
        effects: ['持续回血', '被击时触发护盾'],
        note: '适合开荒和高难副本'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '狄瑞吉攻坚战', '迷雾誓约等级奖励', '光辉启示兑换'],
    relatedSetId: 'gold'
  },
  {
    id: 'dragon', name: '龙战八荒', overallStrength: 'S',
    recommendedBranch: 1,
    description: '高额三速，斗气系统，减伤+霸体。分支2"与天争命"是主流推荐。',
    branches: [
      {
        name: '基础分支', subtitle: '斗气均衡', type: 'base',
        summary: '保留双形态切换核心机制，均衡输出与生存',
        stats: [
          { label: '三速(未开启)', value: '10%' }, { label: '三速(开启)', value: '30%' },
          { label: '技能伤害', value: '+3%' }
        ],
        effects: ['双形态自由切换', '无色消耗管理'],
        note: '灵活应对不同战斗场景'
      },
      {
        name: '分支1 (左) — 与天争命', subtitle: '爆发+霸体', type: 'burst',
        summary: '强化爆发输出，开启如意珠后伤害大幅提升，附带霸体',
        stats: [
          { label: '技能伤害', value: '+8%' }, { label: '三速', value: '35%' },
          { label: '霸体', value: '常驻' }, { label: '减伤', value: '10%' }
        ],
        effects: ['常驻霸体', '伤害提升', '速度提升'],
        note: '⭐ 推荐分支：高爆发+霸体，综合最优'
      },
      {
        name: '分支2 (右)', subtitle: '续航/减伤', type: 'sustain',
        summary: '强化减伤和续航，适合持久战',
        stats: [
          { label: '伤害减免', value: '25%' }, { label: 'HP恢复', value: '每秒0.8%' },
          { label: '冷却缩减', value: '10%' }
        ],
        effects: ['高额减伤', '持续恢复', '技能循环优化'],
        note: '适合高难副本和开荒期'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '狄瑞吉攻坚战', '迷雾誓约等级奖励'],
    relatedSetId: 'dragon'
  },
  {
    id: 'hunt', name: '精灵国度', overallStrength: 'A',
    recommendedBranch: 0,
    description: '召唤精灵协助战斗，15%减伤。团队辅助功能突出，混搭推荐。',
    branches: [
      {
        name: '基础分支 — 皇室天卫', subtitle: '精灵召唤均衡', type: 'base',
        summary: '召唤精灵提供持续辅助和伤害分担',
        stats: [
          { label: '伤害减免', value: '15%' }, { label: '精灵数量', value: '3只' },
          { label: '三速', value: '15%' }
        ],
        effects: ['精灵自动攻击', '分担伤害', '团队光环'],
        note: '⭐ 推荐分支：稳定可靠的团队辅助'
      },
      {
        name: '分支1 (左) — 女王威严', subtitle: '爆发+控制', type: 'burst',
        summary: '强化精灵的攻击力和控制能力',
        stats: [
          { label: '精灵伤害', value: '+50%' }, { label: '控制效果', value: '眩晕2秒' },
          { label: '爆发周期', value: '30秒' }
        ],
        effects: ['精灵伤害大幅提升', '控制敌人', '爆发周期缩短'],
        note: '适合需要控制和爆发的场景'
      },
      {
        name: '分支2 (右)', subtitle: '守护/恢复', type: 'sustain',
        summary: '精灵专注防御和恢复，提高生存能力',
        stats: [
          { label: '伤害减免', value: '25%' }, { label: 'HP恢复', value: '每秒1%' },
          { label: '护盾', value: '15%最大HP' }
        ],
        effects: ['持续回血', '周期性护盾', '精灵防御光环'],
        note: '高难副本生存首选'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '高级地下城', '迷雾誓约等级奖励'],
    relatedSetId: 'hunt'
  },
  {
    id: 'valkyrie', name: '诸神黄昏之女武神', overallStrength: 'A',
    recommendedBranch: 0,
    description: '瞬移+追踪，灵活机动。每30秒需要20秒攻击维持增益。',
    branches: [
      {
        name: '基础分支 — 天罚之翼', subtitle: '灵活机动', type: 'base',
        summary: '瞬移+追踪，维持条件优化',
        stats: [
          { label: '三速', value: '18%' }, { label: '瞬移冷却', value: '5秒' },
          { label: '维持条件', value: '30秒内攻击15秒' }
        ],
        effects: ['瞬移追踪', '维持条件放宽', '持续输出增益'],
        note: '⭐ 推荐分支：优化后维持条件更宽松'
      },
      {
        name: '分支1 (左)', subtitle: '爆发追击', type: 'burst',
        summary: '强化追踪攻击的爆发伤害',
        stats: [
          { label: '追踪伤害', value: '+40%' }, { label: '攻击速度', value: '25%' }
        ],
        effects: ['追踪伤害大幅提升', '连击增益'],
        note: '适合高频攻击职业'
      },
      {
        name: '分支2 (右)', subtitle: '生存机动', type: 'sustain',
        summary: '强化生存和机动性',
        stats: [
          { label: '闪避率', value: '+15%' }, { label: '瞬移次数', value: '+1' },
          { label: '无敌帧', value: '0.3秒' }
        ],
        effects: ['闪避提升', '额外瞬移', '瞬移无敌帧'],
        note: '高操作上限的生存分支'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '狄瑞吉攻坚战'],
    relatedSetId: 'valkyrie'
  },
  {
    id: 'chaos', name: '混沌净化', overallStrength: 'A',
    recommendedBranch: 0,
    description: '双模式CD套，净化30%冷却，堕落55%冷却加霸体。10%CDR。',
    branches: [
      {
        name: '基础分支 — 光辉洗礼', subtitle: '双模式均衡', type: 'base',
        summary: '优化双模式切换，降低切换惩罚',
        stats: [
          { label: '冷却(净化)', value: '30%' }, { label: '冷却(堕落)', value: '55%' },
          { label: '切换CD', value: '5秒' }
        ],
        effects: ['双模式自由切换', '切换CD缩短', '护盾+霸体'],
        note: '⭐ 推荐分支：最灵活的CD解决方案'
      },
      {
        name: '分支1 (左)', subtitle: '净化专精', type: 'burst',
        summary: '专注净化模式，强化技攻和护盾',
        stats: [
          { label: '技攻', value: '+15%' }, { label: '冷却', value: '30%' },
          { label: '护盾量', value: '+50%' }
        ],
        effects: ['技攻大幅提升', '强化护盾'],
        note: '适合需要护盾保护的输出环境'
      },
      {
        name: '分支2 (右)', subtitle: '堕落专精', type: 'sustain',
        summary: '专注堕落模式，极限冷却+生存',
        stats: [
          { label: '冷却缩减', value: '60%' }, { label: '霸体', value: '常驻' },
          { label: '移速', value: '20%' }
        ],
        effects: ['极限冷却', '常驻霸体', '高速移动'],
        note: '极致CD体验，适合技能型职业'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '高级地下城', '狄瑞吉攻坚战'],
    relatedSetId: 'chaos'
  },
  {
    id: 'nature', name: '造化自然', overallStrength: 'B',
    recommendedBranch: 2,
    description: '特效伤害为主，属性均衡。气象异变分支推荐。',
    branches: [
      {
        name: '基础分支', subtitle: '自然均衡', type: 'base',
        summary: '保持全属性均衡，无明显短板',
        stats: [
          { label: '全属性', value: '+5%' }, { label: '特效占比', value: '8.33%' }
        ],
        effects: ['全属性均衡提升'],
        note: '适合过渡使用'
      },
      {
        name: '分支1 (左)', subtitle: '自然之怒', type: 'burst',
        summary: '集中强化特效爆发伤害',
        stats: [
          { label: '特效伤害', value: '+30%' }, { label: '特效占比', value: '15%' }
        ],
        effects: ['特效伤害提升', '特效冷却缩短'],
        note: '适合特效流职业'
      },
      {
        name: '分支2 (右) — 气象异变', subtitle: '持续特效', type: 'sustain',
        summary: '特效持续输出，稳定伤害来源',
        stats: [
          { label: '特效伤害', value: '+20%' }, { label: '特效频率', value: '+40%' },
          { label: '持续时间', value: '+50%' }
        ],
        effects: ['高频特效触发', '持续伤害稳定'],
        note: '⭐ 推荐分支：最高效的特效伤害模式'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '迷雾誓约等级奖励'],
    relatedSetId: 'nature'
  },
  {
    id: 'energy_3', name: '究极能量', overallStrength: 'S',
    recommendedBranch: 1,
    description: '觉醒强化，混搭推荐。无穷动能分支最大化觉醒收益。',
    branches: [
      {
        name: '基础分支', subtitle: '觉醒均衡', type: 'base',
        summary: '均衡提升觉醒技能效果',
        stats: [
          { label: '觉醒冷却', value: '-30%' }, { label: '觉醒伤害', value: '+15%' }
        ],
        effects: ['觉醒冷却缩减', '觉醒伤害提升'],
        note: '基础觉醒强化'
      },
      {
        name: '分支1 (左) — 无穷动能', subtitle: '极限觉醒爆发', type: 'burst',
        summary: '最大化觉醒技能的爆发输出',
        stats: [
          { label: '觉醒冷却', value: '-60%' }, { label: '觉醒伤害', value: '+30%' },
          { label: '宠物同步', value: '冷却同步' }
        ],
        effects: ['极限觉醒冷却', '觉醒伤害最大化', '宠物冷却同步'],
        note: '⭐ 推荐分支：三觉爆发职业首选，觉醒循环极致'
      },
      {
        name: '分支2 (右)', subtitle: '觉醒续航', type: 'sustain',
        summary: '减少觉醒依赖，强化普通技能',
        stats: [
          { label: '全技能冷却', value: '-15%' }, { label: '非觉醒伤害', value: '+20%' }
        ],
        effects: ['全技能CD优化', '非觉醒技能强化'],
        note: '适合觉醒占比不高的职业'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '狄瑞吉攻坚战', '迷雾誓约等级奖励'],
    relatedSetId: 'energy_3'
  },
  {
    id: 'shadow', name: '潜影暗袭', overallStrength: 'B',
    recommendedBranch: 2,
    description: '强制中断技能，全职业手感优化。幽冥之思分支推荐。',
    branches: [
      {
        name: '基础分支', subtitle: '影子操控', type: 'base',
        summary: '标准影子机制，中断+瞬移',
        stats: [
          { label: '三速', value: '15%' }, { label: '影子层数', value: '最大5层' }
        ],
        effects: ['技能中断', '瞬移', '影子积累'],
        note: '手感的质变体验'
      },
      {
        name: '分支1 (左)', subtitle: '暗杀突袭', type: 'burst',
        summary: '消耗影子造成额外爆发伤害',
        stats: [
          { label: '影子爆发', value: '+45%' }, { label: '暴击率', value: '+10%' }
        ],
        effects: ['影子爆发伤害', '暴击提升'],
        note: '适合爆发型职业'
      },
      {
        name: '分支2 (右) — 幽冥之思', subtitle: '无限影子', type: 'sustain',
        summary: '影子恢复加速，中断无消耗',
        stats: [
          { label: '影子恢复', value: '加速50%' }, { label: '中断消耗', value: '减半' },
          { label: '冷却缩减', value: '10%' }
        ],
        effects: ['快速回影', '中断消耗减半', '技能CD优化'],
        note: '⭐ 推荐分支：手感最流畅，适合持续作战'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '高级地下城'],
    relatedSetId: 'shadow'
  },
  {
    id: 'spirit_orb', name: '青丘灵珠', overallStrength: 'B',
    recommendedBranch: 0,
    description: '需维持灵珠叠加，满珠状态最强。凝华分支为平衡选择。',
    branches: [
      {
        name: '基础分支 — 凝华', subtitle: '平衡积累', type: 'base',
        summary: '优化灵珠积累速度，降低维持难度',
        stats: [
          { label: '积累速度', value: '+30%' }, { label: '满珠强度', value: '106.19%' },
          { label: '衰减速度', value: '-25%' }
        ],
        effects: ['快速积累', '衰减减缓', '满珠高额增益'],
        note: '⭐ 推荐分支：大幅降低操作难度'
      },
      {
        name: '分支1 (左)', subtitle: '灵珠爆发', type: 'burst',
        summary: '消耗灵珠造成巨额爆发',
        stats: [
          { label: '消耗爆发', value: '+60%' }, { label: '满珠时间', value: '延长50%' }
        ],
        effects: ['灵珠消耗爆发', '满珠延长'],
        note: '适合爆发窗口期职业'
      },
      {
        name: '分支2 (右)', subtitle: '灵珠光环', type: 'sustain',
        summary: '灵珠转为光环效果，团队受益',
        stats: [
          { label: '光环范围', value: '500px' }, { label: '团队增益', value: '+8%' },
          { label: '自身增益', value: '+15%' }
        ],
        effects: ['团队光环', '持续增益'],
        note: '团队辅助向选择'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '迷雾誓约等级奖励'],
    relatedSetId: 'spirit_orb'
  },
  {
    id: 'mage_normal', name: '冥思者的魔力领域', overallStrength: 'B',
    recommendedBranch: 1,
    description: '魔法系特效，高频触发。魔力神兵分支最大化特效收益。',
    branches: [
      {
        name: '基础分支', subtitle: '魔力均衡', type: 'base',
        summary: '稳定的魔法特效触发',
        stats: [
          { label: '特效占比', value: '24.23%' }, { label: '特效冷却', value: '1秒' }
        ],
        effects: ['高频特效触发', '稳定伤害输出'],
        note: '操作门槛最低'
      },
      {
        name: '分支1 (左) — 魔力神兵', subtitle: '特效强化', type: 'burst',
        summary: '大幅提升特效伤害和触发频率',
        stats: [
          { label: '特效伤害', value: '+40%' }, { label: '特效频率', value: '+50%' },
          { label: '额外特效', value: '魔力之刃' }
        ],
        effects: ['特效伤害飙升', '额外特效追加', '触发频率翻倍'],
        note: '⭐ 推荐分支：魔法特效最大化'
      },
      {
        name: '分支2 (右)', subtitle: '魔力护体', type: 'sustain',
        summary: '魔力转化为防护和恢复',
        stats: [
          { label: '魔力护盾', value: '20%HP' }, { label: 'MP恢复', value: '每秒2%' },
          { label: '减伤', value: '15%' }
        ],
        effects: ['魔力护盾', 'MP快速恢复', '伤害减免'],
        note: '法师生存向选择'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '高级地下城', '迷雾誓约等级奖励'],
    relatedSetId: 'mage_normal'
  },
  {
    id: 'fate', name: '天命者的气运', overallStrength: 'C',
    recommendedBranch: -1,
    description: '技能重置机制，但因强度偏低，不推荐作为主力使用。',
    branches: [
      {
        name: '基础分支', subtitle: '命运重置', type: 'base',
        summary: '概率重置技能冷却',
        stats: [
          { label: '重置概率', value: '15%' }, { label: '重置冷却', value: '30秒' }
        ],
        effects: ['概率技能重置'],
        note: '娱乐性较强，稳定性不足'
      },
      {
        name: '分支1 (左)', subtitle: '幸运爆发', type: 'burst',
        summary: '提高重置概率但缩短效果',
        stats: [
          { label: '重置概率', value: '25%' }, { label: '重置技能数', value: '1个' }
        ],
        effects: ['概率提升', '单技能重置'],
        note: '适合单技能爆发职业'
      },
      {
        name: '分支2 (右)', subtitle: '命运共享', type: 'sustain',
        summary: '重置效果可共享给队友',
        stats: [
          { label: '共享范围', value: '600px' }, { label: '重置概率', value: '10%' },
          { label: '团队增益', value: '冷却-5%' }
        ],
        effects: ['团队技能重置', '光环冷却缩减'],
        note: '团队辅助定位'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '迷雾誓约等级奖励'],
    relatedSetId: 'fate'
  },
  {
    id: 'energy_2', name: '究极能量(2觉)', overallStrength: 'A',
    recommendedBranch: 1,
    description: '二觉特化版本，适合二觉技能循环优秀的职业。',
    branches: [
      {
        name: '基础分支', subtitle: '二觉均衡', type: 'base',
        summary: '均衡二觉技能增益',
        stats: [
          { label: '二觉冷却', value: '-30%' }, { label: '二觉伤害', value: '+12%' }
        ],
        effects: ['二觉冷却缩减'],
        note: '基础二觉强化'
      },
      {
        name: '分支1 (左)', subtitle: '二觉极限', type: 'burst',
        summary: '最大化二觉技能收益',
        stats: [
          { label: '二觉冷却', value: '-60%' }, { label: '二觉伤害', value: '+25%' },
          { label: '理论强度', value: '125.42%' }
        ],
        effects: ['极限二觉冷却', '二觉伤害最大化'],
        note: '⭐ 推荐分支：二觉特化职业首选'
      },
      {
        name: '分支2 (右)', subtitle: '二觉续航', type: 'sustain',
        summary: '二觉期间获得额外生存能力',
        stats: [
          { label: '二觉减伤', value: '30%' }, { label: '二觉回血', value: '每秒2%' }
        ],
        effects: ['二觉期间减伤', '二觉期间回复'],
        note: '开荒安全选择'
      }
    ],
    starStone: { maxPrimordial: 3, totalSlots: 11 },
    mistLevel: {
      max: 100,
      qualityBreakpoints: [
        { level: 30, quality: 'Rare', color: 'var(--tier-rare)', label: '稀有' },
        { level: 60, quality: 'Legendary', color: 'var(--tier-legendary)', label: '传说' },
        { level: 80, quality: 'Epic', color: 'var(--tier-epic)', label: '史诗' },
        { level: 100, quality: 'Primordial', color: 'var(--tier-primordial)', label: '太初' }
      ]
    },
    acquisition: ['悖论迷宫', '迷雾誓约等级奖励'],
    relatedSetId: 'energy_2'
  }
];

// 誓约系统机制数据
export const oathMechanics = {
  scoreCorrection: {
    description: '主装备页面分数未达到太初(2550分)时，自动从誓约系统补正分数',
    threshold: 2550
  },
  antiDuplicate: {
    description: '已获得的誓约不会再掉落，12套无放回抽取',
    totalSets: 12
  },
  guarantees: [
    { name: '无放回抽取', detail: '12套誓约，已获得的不再出现，保证最终集齐全套' },
    { name: '光辉启示兑换', detail: '获得任意2件太初誓约后，可兑换指定太初誓约自选礼盒' },
    { name: '迷雾满级兑换', detail: '迷雾誓约100级满级后，继续获取经验可直接兑换太初誓约自选' }
  ],
  acquisitionChannels: [
    { name: '悖论迷宫', type: '地下城', drop: '史诗/太初誓约自选礼盒' },
    { name: '别阁北大西库', type: '高级地下城', drop: '誓约装备' },
    { name: '背教者的城堡', type: '高级地下城', drop: '誓约装备' },
    { name: '狄瑞吉攻坚战', type: '团队副本', drop: '誓约装备(活动期间)' },
    { name: '迷雾誓约升级奖励', type: '等级奖励', drop: '过渡誓约装备(30/60/80/100级)' }
  ]
};
