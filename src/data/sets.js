// 12套装备数据
import { getSetIconPath } from '../utils/helpers.js';

export const sets = [
  {
    id: 'gold', name: '理想之黄金乡套装', alias: '恍惚套',
    category: 'core', tier: 'primordial', tierLabel: '顶级打造', difficulty: '极高',
    description: '套装属性会根据装备增幅数值提升，全身红12可拉满属性。加成包含20%~24%的攻击速度、移动速度和释放速度，10%~12%的伤害减免，以及20%~24%的技能范围提升，兼顾伤害、三速与技能范围，是高增幅玩家的毕业首选。',
    stats: { '攻击速度': '24%', '移动速度': '24%', '释放速度': '24%', '伤害减免': '12%', '技能范围': '24%' },
    recommendation: '适合高增幅玩家，全身红12可达到最佳效果。红12最强全能套，超高功能性。',
    speedScore: 5, damageScore: 5, cdScore: 3, survivalScore: 3, difficultyScore: 5,
    keywords: ['恍惚套', '黄金乡', '增幅', '红12', '毕业装', '全能'],
    icon: getSetIconPath('gold')
  },
  {
    id: 'dragon', name: '龙战八荒套装', alias: '无色套',
    category: 'core', tier: 'primordial', tierLabel: '顶级打造', difficulty: '高',
    description: '达成太初品级后，未开启如意珠时无色消耗减少5，三速提升10%；开启如意珠后所有速度提升30%，技能伤害增加3%，无色消耗量固定为15，释放无色技能时触发额外特效伤害。高额三速，斗气系统，减伤+霸体。',
    stats: { '三速(未开启)': '10%', '三速(开启)': '30%', '技能伤害': '3%', '无色消耗': '15(固定)' },
    recommendation: '适合依赖无色技能的玩家，分支2与天争命推荐。',
    speedScore: 4, damageScore: 5, cdScore: 3, survivalScore: 4, difficultyScore: 4,
    keywords: ['无色套', '龙战', '如意珠', '斗气', '霸体', '三速'],
    icon: getSetIconPath('dragon')
  },
  {
    id: 'hunt', name: '群猎美学套装', alias: '高速回血减伤套',
    category: 'balanced', tier: 'epic', tierLabel: '高端打造', difficulty: '中',
    description: '提供30%的三速加成，具备回血回蓝效果和15%的所受伤害减免。单刷时可增加24.1%的技工，组队时能使敌人受到的伤害提升5%~8%；主动技能可给敌人挂上易伤debuff。',
    stats: { '三速': '30%', '伤害减免': '15%', '单刷技工': '24.1%', '组队增伤': '5%~8%' },
    recommendation: '适合单刷和高难度副本，团队功能性突出，混搭推荐。',
    speedScore: 5, damageScore: 3, cdScore: 4, survivalScore: 5, difficultyScore: 2,
    keywords: ['群猎', '回血', '减伤', '辅助', '混搭', '团队'],
    icon: getSetIconPath('hunt')
  },
  {
    id: 'shadow', name: '潜影暗袭套装', alias: '影子机制手感套',
    category: 'balanced', tier: 'epic', tierLabel: '高端打造', difficulty: '中',
    description: '释放技能积累影子层数，消耗影子层数可中断当前释放的技能，让全职业拥有类似武神的流畅手感；消耗五层影子可瞬移到敌人身后。三速最高提升15%。',
    stats: { '三速': '最高15%', '影子层数': '可积累', '技能中断': '消耗影子', '瞬移': '5层影子' },
    recommendation: '适合追求操作手感和技能灵活性的玩家，全职业技能手感优化。',
    speedScore: 5, damageScore: 4, cdScore: 4, survivalScore: 4, difficultyScore: 3,
    keywords: ['影子', '手感', '瞬移', '中断技能', '灵活'],
    icon: getSetIconPath('shadow')
  },
  {
    id: 'chaos', name: '混沌净化套装', alias: '强力CD切换套',
    category: 'core', tier: 'primordial', tierLabel: '顶级打造', difficulty: '高',
    description: '强力CD套，支持净化和堕落两种模式自由切换。净化模式：增加10%技攻、30%冷却缩减并提供护盾；堕落模式：冷却缩减提升至55%，附加霸体和二连跳。10%CDR。',
    stats: { '技攻(净化)': '10%', '冷却(净化)': '30%', '冷却(堕落)': '55%', '特殊': '护盾/霸体/二连跳' },
    recommendation: '适合需要灵活应对不同战斗情况的玩家，双模式自由切换。',
    speedScore: 3, damageScore: 4, cdScore: 5, survivalScore: 4, difficultyScore: 4,
    keywords: ['混沌', 'CD', '切换', '净化', '堕落', '冷却'],
    icon: getSetIconPath('chaos')
  },
  {
    id: 'energy_3', name: '究极能量套装（3觉）', alias: '三觉极限套',
    category: 'core', tier: 'primordial', tierLabel: '顶级打造', difficulty: '高',
    description: '太初品级下的顶级爆发套装，3觉状态可提供60%冷却缩减，宠物加成下技能冷却时间压缩至110.2秒，理论强度高达137.96%。觉醒强化，混搭推荐。',
    stats: { '冷却缩减': '60%', '宠物加成CD': '110.2秒', '理论强度': '137.96%' },
    recommendation: '适合三觉技能占比高的爆发型职业，需解锁3觉和太初品级。',
    speedScore: 3, damageScore: 5, cdScore: 5, survivalScore: 2, difficultyScore: 5,
    keywords: ['三觉', '爆发', '觉醒', '能量', '极限'],
    icon: getSetIconPath('energy_3')
  },
  {
    id: 'energy_2', name: '究极能量套装（2觉）', alias: '二觉续航套',
    category: 'balanced', tier: 'epic', tierLabel: '高端打造', difficulty: '中',
    description: '2觉状态下提供60%冷却缩减，宠物加成下技能冷却时间为68.4秒，理论强度125.42%，兼顾爆发与续航。',
    stats: { '冷却缩减': '60%', '宠物加成CD': '68.4秒', '理论强度': '125.42%' },
    recommendation: '适合二觉技能频繁使用的职业，兼顾爆发与续航。',
    speedScore: 3, damageScore: 4, cdScore: 4, survivalScore: 3, difficultyScore: 3,
    keywords: ['二觉', '续航', '能量', '冷却'],
    icon: getSetIconPath('energy_2')
  },
  {
    id: 'valkyrie', name: '诸神黄昏之女武神', alias: '持续输出套',
    category: 'core', tier: 'primordial', tierLabel: '顶级打造', difficulty: '高',
    description: '改版后理论强度提升至103.19%，特效占比7.65%。核心机制为每30秒内需要20秒攻击怪物以维持全程增益，瞬移+追踪，灵活机动。',
    stats: { '理论强度': '103.19%', '特效占比': '7.65%', '维持条件': '30秒内攻击20秒' },
    recommendation: '适合高频攻击、持续输出的职业，对空窗期较长的职业有限制。',
    speedScore: 4, damageScore: 4, cdScore: 3, survivalScore: 3, difficultyScore: 3,
    keywords: ['女武神', '诸神黄昏', '持续输出', '追踪', '瞬移'],
    icon: getSetIconPath('valkyrie')
  },
  {
    id: 'nature', name: '造化自然套装', alias: '均衡发展套',
    category: 'balanced', tier: 'epic', tierLabel: '中等打造', difficulty: '中',
    description: '改版后理论强度提升至102.24%，特效占比8.33%，属性均衡无明显短板，对打造要求中等。特效伤害为主。',
    stats: { '理论强度': '102.24%', '特效占比': '8.33%' },
    recommendation: '适合中等打造、追求稳定输出的玩家，适配性广。',
    speedScore: 3, damageScore: 3, cdScore: 3, survivalScore: 3, difficultyScore: 2,
    keywords: ['自然', '均衡', '造化', '稳定', '过渡'],
    icon: getSetIconPath('nature')
  },
  {
    id: 'spirit_orb', name: '青丘灵珠套装（满珠）', alias: '灵珠buff套',
    category: 'balanced', tier: 'epic', tierLabel: '中等打造', difficulty: '高',
    description: '满珠状态下理论强度106.19%，核心为灵珠积累机制，满层后提供高额增益，需维持叠加。',
    stats: { '理论强度': '106.19%', '机制': '灵珠积累系统' },
    recommendation: '适合能稳定维持灵珠层数的职业，技能循环需与灵珠机制匹配。',
    speedScore: 3, damageScore: 4, cdScore: 3, survivalScore: 3, difficultyScore: 4,
    keywords: ['灵珠', '青丘', '叠加', 'buff', '满珠'],
    icon: getSetIconPath('spirit_orb')
  },
  {
    id: 'mage_normal', name: '冥思者的魔力领域', alias: '魔力领域套',
    category: 'beginner', tier: 'rare', tierLabel: '平民打造', difficulty: '低',
    description: '普通模式下理论强度105.14%，特效占比24.23%，特效冷却仅1秒，适合技能频率高、能频繁触发特效的职业，操作门槛低。魔法系特效。',
    stats: { '理论强度': '105.14%', '特效占比': '24.23%', '特效冷却': '1秒' },
    recommendation: '适合平民玩家和技能频率高的职业，操作门槛最低。',
    speedScore: 3, damageScore: 3, cdScore: 4, survivalScore: 2, difficultyScore: 1,
    keywords: ['魔力', '冥思者', '魔法', '特效', '平民', '新手'],
    icon: getSetIconPath('mage_normal')
  },
  {
    id: 'fate', name: '天命者的气运', alias: '技能重置套',
    category: 'beginner', tier: 'rare', tierLabel: '中等打造', difficulty: '中',
    description: '技能重置机制套装，适合需要技能循环的职业。强度偏低，不推荐作为主力使用。',
    stats: { '机制': '技能重置', '定位': '功能型套装' },
    recommendation: '不推荐作为主力套装使用，强度偏低。',
    speedScore: 2, damageScore: 2, cdScore: 3, survivalScore: 2, difficultyScore: 2,
    keywords: ['天命', '气运', '重置', '功能', '运气'],
    icon: getSetIconPath('fate')
  }
];
