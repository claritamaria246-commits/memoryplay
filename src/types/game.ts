export type DifficultyKey = 'easy' | 'medium' | 'hard';

export type GameMode = 'dupla' | 'solo';

export type GameState = 'MENU' | 'PLAYING' | 'VICTORY';

export type ActiveModal = 'NONE' | 'HOW_TO_PLAY' | 'STAGE_SELECT';

export type CardCategory = 'Animal' | 'Fruta' | 'Objeto' | 'Estrela' | 'Personagem';

export interface DifficultyConfig {
  key: DifficultyKey;
  label: string;
  pairs: number;
  totalCards: number;
  description: string;
  targetTimeSeconds: number;
  timeBonusPerSecond: number;
  gridClass: string;
}

export interface StageConfig {
  stageNumber: number;
  title: string;
  subtitle: string;
  difficulty: DifficultyKey;
  pairs: number;
  totalCards: number;
  targetTimeSeconds: number;
  timeBonusPerSecond: number;
  gridClass: string;
  cardIds: string[];
}

export interface PlayerState {
  id: 1 | 2;
  name: string;
  pairs: number;
  score: number;
  streak: number;
  stageWins: number;
}

export interface CardDefinition {
  id: string;
  name: string;
  category: CardCategory;
  accentColor: string;
  surfaceTint: string;
  renderArt: () => React.ReactNode;
}

export interface CardInstance {
  uid: string;
  cardId: string;
  isFlipped: boolean;
  isMatched: boolean;
  matchedBy?: 1 | 2;
}

export interface SessionRecord {
  bestScore: number;
  bestTimeSeconds: number;
  bestAttempts: number;
}

export type SessionBestMap = Partial<Record<number, SessionRecord>>;
