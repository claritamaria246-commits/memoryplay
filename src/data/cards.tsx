import type {
  CardDefinition,
  CardInstance,
  DifficultyConfig,
  DifficultyKey,
  StageConfig,
} from '../types/game';

export const DIFFICULTIES: Record<DifficultyKey, DifficultyConfig> = {
  easy: {
    key: 'easy',
    label: 'Fácil',
    pairs: 6,
    totalCards: 12,
    description: 'Ideal para iniciantes e aquecimento rápido.',
    targetTimeSeconds: 60,
    timeBonusPerSecond: 10,
    gridClass: 'grid-cols-3 sm:grid-cols-4 max-w-2xl',
  },
  medium: {
    key: 'medium',
    label: 'Médio',
    pairs: 8,
    totalCards: 16,
    description: 'Desafio intermediário para testar o foco.',
    targetTimeSeconds: 95,
    timeBonusPerSecond: 12,
    gridClass: 'grid-cols-4 max-w-2xl',
  },
  hard: {
    key: 'hard',
    label: 'Difícil',
    pairs: 12,
    totalCards: 24,
    description: 'Para quem deseja testar ainda mais sua memória.',
    targetTimeSeconds: 150,
    timeBonusPerSecond: 15,
    gridClass: 'grid-cols-4 sm:grid-cols-6 max-w-4xl',
  },
};

export const STAGES: StageConfig[] = [
  {
    stageNumber: 1,
    title: 'Fase 1 · Aquecimento',
    subtitle: '4 pares (8 cartas) para entrar no ritmo',
    difficulty: 'easy',
    pairs: 4,
    totalCards: 8,
    targetTimeSeconds: 45,
    timeBonusPerSecond: 10,
    gridClass: 'grid-cols-2 sm:grid-cols-4 max-w-2xl',
    cardIds: ['raposa', 'coruja', 'morango', 'estrela'],
  },
  {
    stageNumber: 2,
    title: 'Fase 2 · Exploradores',
    subtitle: '6 pares (12 cartas) com novos personagens',
    difficulty: 'easy',
    pairs: 6,
    totalCards: 12,
    targetTimeSeconds: 65,
    timeBonusPerSecond: 10,
    gridClass: 'grid-cols-3 sm:grid-cols-4 max-w-2xl',
    cardIds: ['raposa', 'coruja', 'morango', 'estrela', 'foguete', 'robo'],
  },
  {
    stageNumber: 3,
    title: 'Fase 3 · Desafio Equilibrado',
    subtitle: '8 pares (16 cartas) para testar a atenção',
    difficulty: 'medium',
    pairs: 8,
    totalCards: 16,
    targetTimeSeconds: 95,
    timeBonusPerSecond: 12,
    gridClass: 'grid-cols-4 max-w-2xl',
    cardIds: ['raposa', 'coruja', 'morango', 'estrela', 'foguete', 'robo', 'abacaxi', 'polvo'],
  },
  {
    stageNumber: 4,
    title: 'Fase 4 · Memória Afiada',
    subtitle: '10 pares (20 cartas) em ritmo avançado',
    difficulty: 'medium',
    pairs: 10,
    totalCards: 20,
    targetTimeSeconds: 120,
    timeBonusPerSecond: 14,
    gridClass: 'grid-cols-4 sm:grid-cols-5 max-w-3xl',
    cardIds: [
      'raposa',
      'coruja',
      'morango',
      'estrela',
      'foguete',
      'robo',
      'abacaxi',
      'polvo',
      'coroa',
      'melancia',
    ],
  },
  {
    stageNumber: 5,
    title: 'Fase 5 · Grande Final',
    subtitle: '12 pares (24 cartas) — o desafio completo!',
    difficulty: 'hard',
    pairs: 12,
    totalCards: 24,
    targetTimeSeconds: 150,
    timeBonusPerSecond: 15,
    gridClass: 'grid-cols-4 sm:grid-cols-6 max-w-4xl',
    cardIds: [
      'raposa',
      'coruja',
      'morango',
      'estrela',
      'foguete',
      'robo',
      'abacaxi',
      'polvo',
      'coroa',
      'melancia',
      'leao',
      'violao',
    ],
  },
];

export const MOTIVATIONAL_MATCH_MESSAGES: string[] = [
  'Boa memória! Par encontrado!',
  'Excelente atenção! Continue assim!',
  'Você está indo muito bem!',
  'Olhar afiado! Mais um par!',
  'Ótima jogada! Concentração em alta!',
];

export const CARD_DEFINITIONS: CardDefinition[] = [
  {
    id: 'raposa',
    name: 'Raposa',
    category: 'Animal',
    accentColor: '#EA580C',
    surfaceTint: '#FFF4ED',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#FFEDD5" />
        <polygon points="18,22 28,36 16,40" fill="#EA580C" />
        <polygon points="62,22 52,36 64,40" fill="#EA580C" />
        <polygon points="20,26 26,35 19,37" fill="#FDBA74" />
        <polygon points="60,26 54,35 61,37" fill="#FDBA74" />
        <ellipse cx="40" cy="46" rx="22" ry="18" fill="#F97316" />
        <path d="M20 46 Q40 62 60 46 Q52 63 40 64 Q28 63 20 46 Z" fill="#FFF7ED" />
        <circle cx="32" cy="43" r="3" fill="#1E1B4B" />
        <circle cx="48" cy="43" r="3" fill="#1E1B4B" />
        <circle cx="33" cy="42" r="1" fill="#FFFFFF" />
        <circle cx="49" cy="42" r="1" fill="#FFFFFF" />
        <ellipse cx="40" cy="52" rx="4" ry="3" fill="#1E1B4B" />
        <path d="M36 56 Q40 59 44 56" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'coruja',
    name: 'Coruja',
    category: 'Animal',
    accentColor: '#7C3AED',
    surfaceTint: '#F5F0FF',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#EDE9FE" />
        <path d="M22 22 L28 32 L18 34 Z" fill="#6D28D9" />
        <path d="M58 22 L52 32 L62 34 Z" fill="#6D28D9" />
        <ellipse cx="40" cy="46" rx="20" ry="20" fill="#7C3AED" />
        <ellipse cx="40" cy="52" rx="13" ry="11" fill="#DDD6FE" />
        <circle cx="32" cy="39" r="7.5" fill="#FFFFFF" />
        <circle cx="48" cy="39" r="7.5" fill="#FFFFFF" />
        <circle cx="32" cy="39" r="3.8" fill="#1E1B4B" />
        <circle cx="48" cy="39" r="3.8" fill="#1E1B4B" />
        <circle cx="33.5" cy="37.5" r="1.3" fill="#FFFFFF" />
        <circle cx="49.5" cy="37.5" r="1.3" fill="#FFFFFF" />
        <polygon points="36,44 44,44 40,51" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    id: 'morango',
    name: 'Morango',
    category: 'Fruta',
    accentColor: '#E11D48',
    surfaceTint: '#FFF1F4',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#FFE4E6" />
        <path d="M40 24 C55 24 61 36 55 50 C50 61 44 65 40 65 C36 65 30 61 25 50 C19 36 25 24 40 24 Z" fill="#E11D48" />
        <path d="M29 24 Q40 31 51 24 L45 18 L40 22 L35 18 Z" fill="#16A34A" />
        <path d="M40 14 L40 22" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
        <circle cx="33" cy="36" r="1.7" fill="#FDE047" />
        <circle cx="46" cy="37" r="1.7" fill="#FDE047" />
        <circle cx="39" cy="43" r="1.7" fill="#FDE047" />
        <circle cx="31" cy="48" r="1.7" fill="#FDE047" />
        <circle cx="47" cy="48" r="1.7" fill="#FDE047" />
        <circle cx="40" cy="56" r="1.7" fill="#FDE047" />
      </svg>
    ),
  },
  {
    id: 'estrela',
    name: 'Estrela',
    category: 'Estrela',
    accentColor: '#D97706',
    surfaceTint: '#FFFBEB',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#FEF3C7" />
        <polygon
          points="40,14 47.8,30.2 65.6,32.8 52.8,45.3 55.8,63 40,54.6 24.2,63 27.2,45.3 14.4,32.8 32.2,30.2"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <polygon
          points="40,22 44.5,32 55.5,33.5 47.5,41.2 49.5,52 40,46.8 30.5,52 32.5,41.2 24.5,33.5 35.5,32"
          fill="#FDE68A"
        />
        <circle cx="36" cy="39" r="2" fill="#78350F" />
        <circle cx="44" cy="39" r="2" fill="#78350F" />
        <path d="M37 44 Q40 47 43 44" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'foguete',
    name: 'Foguete',
    category: 'Objeto',
    accentColor: '#2563EB',
    surfaceTint: '#EFF6FF',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#DBEAFE" />
        <path d="M35 56 L40 69 L45 56 Z" fill="#F97316" />
        <path d="M37 56 L40 64 L43 56 Z" fill="#FDE047" />
        <path d="M27 45 L21 56 L32 52 Z" fill="#EF4444" />
        <path d="M53 45 L59 56 L48 52 Z" fill="#EF4444" />
        <path d="M40 14 C50 24 52 40 48 56 L32 56 C28 40 30 24 40 14 Z" fill="#FFFFFF" stroke="#1E40AF" strokeWidth="2.5" />
        <path d="M40 14 C46 20 49 27 49 29 L31 29 C31 27 34 20 40 14 Z" fill="#2563EB" />
        <circle cx="40" cy="39" r="6" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2.5" />
        <circle cx="38.5" cy="37.5" r="2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'robo',
    name: 'Robô',
    category: 'Personagem',
    accentColor: '#0D9488',
    surfaceTint: '#F0FDFA',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#CCFBF1" />
        <line x1="40" y1="15" x2="40" y2="24" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="14" r="4" fill="#F59E0B" />
        <rect x="20" y="24" width="40" height="34" rx="9" fill="#14B8A6" stroke="#0F766E" strokeWidth="2.5" />
        <rect x="26" y="31" width="28" height="14" rx="5" fill="#134E4A" />
        <circle cx="33" cy="38" r="3.5" fill="#5EEAD4" />
        <circle cx="47" cy="38" r="3.5" fill="#5EEAD4" />
        <rect x="30" y="49" width="20" height="4" rx="2" fill="#F0FDFA" />
        <rect x="15" y="34" width="5" height="12" rx="2.5" fill="#0F766E" />
        <rect x="60" y="34" width="5" height="12" rx="2.5" fill="#0F766E" />
      </svg>
    ),
  },
  {
    id: 'abacaxi',
    name: 'Abacaxi',
    category: 'Fruta',
    accentColor: '#CA8A04',
    surfaceTint: '#FEFCE8',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#FEF9C3" />
        <path d="M40 13 L34 27 L46 27 Z" fill="#16A34A" />
        <path d="M30 18 L34 29 L40 26 Z" fill="#22C55E" />
        <path d="M50 18 L46 29 L40 26 Z" fill="#22C55E" />
        <ellipse cx="40" cy="47" rx="16" ry="19" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.2" />
        <path d="M28 40 L52 54 M28 54 L52 40 M33 32 L47 62 M47 32 L33 62" stroke="#CA8A04" strokeWidth="1.8" opacity="0.65" />
      </svg>
    ),
  },
  {
    id: 'polvo',
    name: 'Polvo',
    category: 'Animal',
    accentColor: '#DB2777',
    surfaceTint: '#FDF2F8',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#FCE7F3" />
        <path d="M24 46 C18 54 18 62 24 62 C28 62 29 55 32 52" stroke="#EC4899" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M56 46 C62 54 62 62 56 62 C52 62 51 55 48 52" stroke="#EC4899" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M34 52 C32 60 30 64 35 64 C38 64 38 58 39 53" stroke="#EC4899" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M46 52 C48 60 50 64 45 64 C42 64 42 58 41 53" stroke="#EC4899" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <circle cx="40" cy="36" r="17" fill="#EC4899" />
        <circle cx="34" cy="36" r="3" fill="#1E1B4B" />
        <circle cx="46" cy="36" r="3" fill="#1E1B4B" />
        <circle cx="35" cy="35" r="1" fill="#FFFFFF" />
        <circle cx="47" cy="35" r="1" fill="#FFFFFF" />
        <path d="M36 42 Q40 46 44 42" stroke="#1E1B4B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'coroa',
    name: 'Coroa',
    category: 'Objeto',
    accentColor: '#B45309',
    surfaceTint: '#FFFBEB',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#FEF3C7" />
        <path
          d="M18 54 L15 28 L29 40 L40 22 L51 40 L65 28 L62 54 Z"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="18" y="54" width="44" height="7" rx="3" fill="#D97706" />
        <circle cx="15" cy="26" r="3.5" fill="#FDE047" />
        <circle cx="40" cy="20" r="4" fill="#FDE047" />
        <circle cx="65" cy="26" r="3.5" fill="#FDE047" />
        <circle cx="40" cy="44" r="4" fill="#E11D48" />
        <circle cx="28" cy="46" r="3" fill="#2563EB" />
        <circle cx="52" cy="46" r="3" fill="#10B981" />
      </svg>
    ),
  },
  {
    id: 'melancia',
    name: 'Melancia',
    category: 'Fruta',
    accentColor: '#16A34A',
    surfaceTint: '#F0FDF4',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#DCFCE7" />
        <path d="M16 34 A24 24 0 0 0 64 34 Z" fill="#16A34A" />
        <path d="M20 34 A20 20 0 0 0 60 34 Z" fill="#BBF7D0" />
        <path d="M23 34 A17 17 0 0 0 57 34 Z" fill="#EF4444" />
        <circle cx="33" cy="40" r="1.8" fill="#1E1B4B" />
        <circle cx="40" cy="44" r="1.8" fill="#1E1B4B" />
        <circle cx="47" cy="40" r="1.8" fill="#1E1B4B" />
        <circle cx="37" cy="38" r="1.5" fill="#1E1B4B" />
        <circle cx="44" cy="38" r="1.5" fill="#1E1B4B" />
      </svg>
    ),
  },
  {
    id: 'leao',
    name: 'Leão',
    category: 'Animal',
    accentColor: '#D97706',
    surfaceTint: '#FFFBEB',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#FEF3C7" />
        <circle cx="40" cy="42" r="23" fill="#B45309" />
        <circle cx="26" cy="24" r="6" fill="#F59E0B" />
        <circle cx="54" cy="24" r="6" fill="#F59E0B" />
        <circle cx="40" cy="43" r="16" fill="#FBBF24" />
        <circle cx="34" cy="40" r="2.7" fill="#1E1B4B" />
        <circle cx="46" cy="40" r="2.7" fill="#1E1B4B" />
        <polygon points="37,46 43,46 40,50" fill="#78350F" />
        <path d="M35 52 Q40 55 45 52" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'violao',
    name: 'Violão',
    category: 'Objeto',
    accentColor: '#9333EA',
    surfaceTint: '#FAF5FF',
    renderArt: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="42" r="28" fill="#F3E8FF" />
        <g transform="rotate(-35 40 42)">
          <rect x="37" y="13" width="6" height="28" rx="2" fill="#78350F" />
          <rect x="35" y="10" width="10" height="6" rx="2" fill="#451A03" />
          <circle cx="40" cy="40" r="10" fill="#D97706" />
          <circle cx="40" cy="53" r="13" fill="#B45309" />
          <circle cx="40" cy="44" r="4.5" fill="#451A03" />
          <rect x="35" y="54" width="10" height="3" rx="1" fill="#451A03" />
        </g>
      </svg>
    ),
  },
];

export const CARD_MAP: Record<string, CardDefinition> = Object.fromEntries(
  CARD_DEFINITIONS.map((card) => [card.id, card])
);

export function getStageConfig(stageNumber: number): StageConfig {
  return STAGES.find((s) => s.stageNumber === stageNumber) ?? STAGES[0];
}

export function createShuffledStageDeck(stageNumber: number): CardInstance[] {
  const stage = getStageConfig(stageNumber);
  const selected = stage.cardIds
    .map((id) => CARD_MAP[id])
    .filter((card): card is CardDefinition => Boolean(card));

  const doubled: CardInstance[] = [];

  selected.forEach((card) => {
    doubled.push({
      uid: `${card.id}-a-${Math.random().toString(36).slice(2, 7)}`,
      cardId: card.id,
      isFlipped: false,
      isMatched: false,
    });
    doubled.push({
      uid: `${card.id}-b-${Math.random().toString(36).slice(2, 7)}`,
      cardId: card.id,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Fisher-Yates shuffle
  for (let i = doubled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function calculateSoloStageScore(
  stage: StageConfig,
  attempts: number,
  elapsedSeconds: number
): number {
  const basePairPoints = stage.pairs * 150;
  const extraAttempts = Math.max(0, attempts - stage.pairs);
  const attemptPenalty = extraAttempts * 25;
  const remainingTime = Math.max(0, stage.targetTimeSeconds - elapsedSeconds);
  const timeBonus = remainingTime * stage.timeBonusPerSecond;
  const minimumGuaranteed = stage.pairs * 75;

  return Math.max(minimumGuaranteed, basePairPoints - attemptPenalty + timeBonus);
}
