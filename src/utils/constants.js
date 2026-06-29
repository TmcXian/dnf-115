// 全局常量配置
export const API_BASE = '';

export const MAX_COMPARE_SETS = 4;

export const TIER_COLORS = {
  primordial: { bg: 'var(--tier-primordial)', text: '#fff', label: '太初' },
  epic:       { bg: 'var(--tier-epic)', text: '#fff', label: '史诗' },
  legendary:  { bg: 'var(--tier-legendary)', text: '#fff', label: '传说' },
  rare:       { bg: 'var(--tier-rare)', text: '#1a1a1a', label: '稀有' }
};

export const DIFFICULTY_COLORS = {
  '极高': { color: '#f85149', bg: 'rgba(248,81,73,0.15)', label: '极高' },
  '高':   { color: '#d29922', bg: 'rgba(210,153,34,0.15)', label: '高' },
  '中':   { color: '#3fb950', bg: 'rgba(63,185,80,0.15)', label: '中等' },
  '低':   { color: '#58a6ff', bg: 'rgba(88,166,255,0.15)', label: '低' }
};

export const SET_CATEGORIES = {
  core:     { label: '核心毕业',  tier: 'top' },
  balanced: { label: '均衡实用',  tier: 'high' },
  beginner: { label: '新手/平民', tier: 'low' }
};

export const RANK_TYPES = [
  { value: 'overall',   label: '综合强度' },
  { value: 'damage',    label: '伤害输出' },
  { value: 'survival',  label: '生存能力' },
  { value: 'mobility',  label: '机动性' },
  { value: 'difficulty',label: '上手难度' }
];

export const PLAYER_LEVELS = [
  { value: 'high',  label: '高端玩家' },
  { value: 'mid',   label: '中等玩家' },
  { value: 'beginner', label: '新手玩家' }
];

export const GAME_MODES = [
  { value: 'general', label: '通用' },
  { value: 'solo',    label: '单人' },
  { value: 'party',   label: '组队' }
];

export const OATH_BRANCH_TYPES = {
  base:   { label: '基础分支',  icon: '◆', color: '#f0c040' },
  burst:  { label: '爆发分支',  icon: '▲', color: '#f85149' },
  sustain:{ label: '续航分支',  icon: '⬟', color: '#58a6ff' }
};
