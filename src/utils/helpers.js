// 通用工具函数

export function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function formatSetName(setKey) {
  const map = {
    gold: '理想之黄金乡', dragon: '龙战八荒', hunt: '群猎美学',
    shadow: '潜影暗袭', chaos: '混沌净化', energy_3: '究极能量(3觉)',
    energy_2: '究极能量(2觉)', valkyrie: '诸神黄昏之女武神',
    nature: '造化自然', spirit_orb: '青丘灵珠', mage_normal: '冥思者的魔力领域',
    fate: '天命者的气运'
  };
  return map[setKey] || setKey;
}

export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function getSetIconPath(setKey) {
  const iconMap = {
    gold: 'gold-set.png', dragon: 'dragon-set.png', hunt: 'hunt-set.png',
    shadow: 'shadow-set.png', chaos: 'chaos-set.png', energy_3: 'energy3-set.png',
    energy_2: 'energy2-set.png', valkyrie: 'valkyrie-set.png',
    nature: 'nature-set.png', spirit_orb: 'orb-set.png', mage_normal: 'mage-set.png',
    fate: 'fate-set.png'
  };
  const file = iconMap[setKey] || 'default-set.png';
  return `./static/img/logo/set-icon/${file}`;
}
