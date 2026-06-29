// 预计算排行数据
// 格式: { [rankType]_[playerLevel]_[gameMode]: [{ id, score }] }

const allSets = [
  { id: 'gold',       overall: 95, damage: 92, survival: 78, mobility: 90, difficulty: 85 },
  { id: 'dragon',     overall: 93, damage: 95, survival: 82, mobility: 88, difficulty: 80 },
  { id: 'chaos',      overall: 90, damage: 85, survival: 80, mobility: 75, difficulty: 82 },
  { id: 'energy_3',   overall: 88, damage: 98, survival: 60, mobility: 70, difficulty: 90 },
  { id: 'valkyrie',   overall: 85, damage: 82, survival: 75, mobility: 85, difficulty: 75 },
  { id: 'energy_2',   overall: 82, damage: 85, survival: 70, mobility: 70, difficulty: 72 },
  { id: 'hunt',       overall: 80, damage: 70, survival: 95, mobility: 92, difficulty: 55 },
  { id: 'spirit_orb', overall: 78, damage: 80, survival: 72, mobility: 72, difficulty: 80 },
  { id: 'shadow',     overall: 76, damage: 78, survival: 78, mobility: 88, difficulty: 68 },
  { id: 'nature',     overall: 74, damage: 72, survival: 75, mobility: 72, difficulty: 60 },
  { id: 'mage_normal',overall: 72, damage: 75, survival: 65, mobility: 68, difficulty: 50 },
  { id: 'fate',       overall: 65, damage: 60, survival: 65, mobility: 65, difficulty: 55 }
];

function buildRanking(rankType, playerLevel, gameMode) {
  const sorted = [...allSets].sort((a, b) => {
    let scoreA, scoreB;
    switch (rankType) {
      case 'damage': scoreA = a.damage; scoreB = b.damage; break;
      case 'survival': scoreA = a.survival; scoreB = b.survival; break;
      case 'mobility': scoreA = a.mobility; scoreB = b.mobility; break;
      case 'difficulty':
        // 难度越低分越高(新手友好)
        scoreA = 100 - a.difficulty; scoreB = 100 - b.difficulty;
        break;
      default: scoreA = a.overall; scoreB = b.overall;
    }
    // 玩家等级修正
    if (playerLevel === 'beginner') {
      scoreA -= a.difficulty * 0.2;
      scoreB -= b.difficulty * 0.2;
    } else if (playerLevel === 'high') {
      scoreA += a.difficulty * 0.1;
      scoreB += b.difficulty * 0.1;
    }
    // 游戏模式修正
    if (gameMode === 'solo') {
      if (rankType === 'survival') { scoreA += 5; scoreB += 5; }
    } else if (gameMode === 'party') {
      if (a.id === 'hunt' || a.id === 'fate') scoreA += 5;
      if (b.id === 'hunt' || b.id === 'fate') scoreB += 5;
    }
    return scoreB - scoreA;
  });
  return sorted.map((s, i) => ({ id: s.id, score: Math.round(sorted[0].overall - i * 3 + 90) }));
}

// 生成所有组合的排行
const rankTypes = ['overall', 'damage', 'survival', 'mobility', 'difficulty'];
const playerLevels = ['high', 'mid', 'beginner'];
const gameModes = ['general', 'solo', 'party'];

export const rankings = {};

for (const rt of rankTypes) {
  for (const pl of playerLevels) {
    for (const gm of gameModes) {
      const key = `${rt}_${pl}_${gm}`;
      rankings[key] = buildRanking(rt, pl, gm);
    }
  }
}
