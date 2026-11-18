import {
  RotateCcw,
  ArrowLeft,
  Layers,
  HelpCircle,
  Volume2,
  VolumeX,
  Music,
  Trophy,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { DIFFICULTIES, formatTime, getStageConfig, STAGES } from '../data/cards';
import type {
  CardInstance,
  GameMode,
  PlayerState,
  SessionRecord,
} from '../types/game';
import { MemoryCard } from './MemoryCard';

interface GameBoardProps {
  mode: GameMode;
  stageNumber: number;
  cards: CardInstance[];
  attempts: number;
  matchedPairs: number;
  elapsedSeconds: number;
  liveSoloScore: number;
  players: [PlayerState, PlayerState];
  activePlayerId: 1 | 2;
  isLocked: boolean;
  motivationalMessage: string;
  sessionRecord?: SessionRecord;
  sfxEnabled: boolean;
  musicEnabled: boolean;
  onSelectCard: (card: CardInstance) => void;
  onRestart: () => void;
  onBackToMenu: () => void;
  onOpenStageSelect: () => void;
  onOpenHowToPlay: () => void;
  onToggleSfx: () => void;
  onToggleMusic: () => void;
}

export function GameBoard({
  mode,
  stageNumber,
  cards,
  attempts,
  matchedPairs,
  elapsedSeconds,
  liveSoloScore,
  players,
  activePlayerId,
  isLocked,
  motivationalMessage,
  sessionRecord,
  sfxEnabled,
  musicEnabled,
  onSelectCard,
  onRestart,
  onBackToMenu,
  onOpenStageSelect,
  onOpenHowToPlay,
  onToggleSfx,
  onToggleMusic,
}: GameBoardProps) {
  const stage = getStageConfig(stageNumber);
  const diffLabel = DIFFICULTIES[stage.difficulty].label;
  const isCompact = stage.totalCards >= 20;

  return (
    <div className="min-h-screen flex flex-col px-3 sm:px-6 py-4 max-w-6xl mx-auto">
      {/* Top Action Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-300/15">
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-[#221D4A] hover:bg-[#2C265E] border border-indigo-300/20 text-sm font-semibold text-indigo-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Menu
          </button>

          <div className="flex items-baseline gap-2.5 whitespace-nowrap shrink-0">
            <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white">
              MEMORY PLAY
            </span>
            <span className="hidden md:inline text-xs font-medium text-indigo-200/80">
              Fase {stage.stageNumber} de {STAGES.length} · {diffLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenStageSelect}
            className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-[#221D4A] hover:bg-[#2C265E] border border-indigo-300/20 text-sm font-semibold text-indigo-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <Layers className="w-4 h-4 text-violet-300" aria-hidden="true" />
            <span>Fase {stage.stageNumber}/{STAGES.length}</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-bold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reiniciar
          </button>

          <button
            type="button"
            onClick={onToggleSfx}
            aria-label={sfxEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
            aria-pressed={sfxEnabled}
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#221D4A] hover:bg-[#2C265E] border border-indigo-300/20 text-indigo-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            title={sfxEnabled ? 'Efeitos: Ligados' : 'Efeitos: Mutados'}
          >
            {sfxEnabled ? (
              <Volume2 className="w-4 h-4 text-violet-300" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-indigo-300/60" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={musicEnabled ? 'Desativar música de fundo' : 'Ativar música de fundo'}
            aria-pressed={musicEnabled}
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#221D4A] hover:bg-[#2C265E] border border-indigo-300/20 text-indigo-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            title={musicEnabled ? 'Música: Ligada' : 'Música: Desligada'}
          >
            <Music
              className={`w-4 h-4 ${musicEnabled ? 'text-amber-300' : 'text-indigo-300/60'}`}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={onOpenHowToPlay}
            aria-label="Como Jogar"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#221D4A] hover:bg-[#2C265E] border border-indigo-300/20 text-indigo-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            title="Como Jogar"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* HUD: Dupla Mode vs Solo Mode */}
      {mode === 'dupla' ? (
        <section
          aria-label="Placar da dupla"
          className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 py-3"
        >
          {/* Player 1 Panel */}
          <div
            className={`md:col-span-4 rounded-xl px-4 py-3 border transition-colors ${
              activePlayerId === 1
                ? 'bg-[#28205C] border-violet-400 shadow-md shadow-violet-950/50'
                : 'bg-[#1B163E] border-indigo-300/15 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-base sm:text-lg font-bold text-white truncate">
                {players[0].name}
              </span>
              {activePlayerId === 1 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-200 whitespace-nowrap shrink-0">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  Sua vez
                </span>
              ) : (
                <span className="text-xs text-indigo-300/70 whitespace-nowrap shrink-0">
                  Aguardando
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-1.5 font-mono tabular-nums text-sm">
              <span className="text-emerald-300 font-bold">{players[0].pairs} pares</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="text-violet-200 font-semibold">{players[0].score} pts</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="text-indigo-200/80 text-xs">{players[0].stageWins} fases</span>
            </div>
          </div>

          {/* Center Match Info */}
          <div className="md:col-span-4 rounded-xl bg-[#181438] border border-indigo-300/15 px-4 py-2.5 flex items-center justify-around gap-2 text-center">
            <div>
              <span className="block text-[11px] text-indigo-200/75">Pares</span>
              <span className="font-mono tabular-nums text-base sm:text-lg font-bold text-white">
                {matchedPairs}/{stage.pairs}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-indigo-200/75">Tentativas</span>
              <span className="font-mono tabular-nums text-base sm:text-lg font-bold text-white">
                {attempts}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-indigo-200/75">Tempo</span>
              <span className="font-mono tabular-nums text-base sm:text-lg font-bold text-violet-200">
                {formatTime(elapsedSeconds)}
              </span>
            </div>
          </div>

          {/* Player 2 Panel */}
          <div
            className={`md:col-span-4 rounded-xl px-4 py-3 border transition-colors ${
              activePlayerId === 2
                ? 'bg-[#2C2252] border-amber-400 shadow-md shadow-amber-950/40'
                : 'bg-[#1B163E] border-indigo-300/15 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-base sm:text-lg font-bold text-white truncate">
                {players[1].name}
              </span>
              {activePlayerId === 2 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-200 whitespace-nowrap shrink-0">
                  <UserCheck className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  Sua vez
                </span>
              ) : (
                <span className="text-xs text-indigo-300/70 whitespace-nowrap shrink-0">
                  Aguardando
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-1.5 font-mono tabular-nums text-sm">
              <span className="text-amber-300 font-bold">{players[1].pairs} pares</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="text-amber-100 font-semibold">{players[1].score} pts</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="text-indigo-200/80 text-xs">{players[1].stageWins} fases</span>
            </div>
          </div>
        </section>
      ) : (
        <section
          aria-label="Placar da partida"
          className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 py-3"
        >
          <div className="rounded-xl bg-[#1D1842] border border-indigo-300/15 px-3.5 py-2.5 flex flex-col">
            <span className="text-xs font-medium text-indigo-200/80">Pares encontrados</span>
            <span className="font-mono tabular-nums text-lg sm:text-xl font-bold text-emerald-300">
              {matchedPairs} / {stage.pairs}
            </span>
          </div>

          <div className="rounded-xl bg-[#1D1842] border border-indigo-300/15 px-3.5 py-2.5 flex flex-col">
            <span className="text-xs font-medium text-indigo-200/80">Tentativas</span>
            <span className="font-mono tabular-nums text-lg sm:text-xl font-bold text-white">
              {attempts}
            </span>
          </div>

          <div className="rounded-xl bg-[#1D1842] border border-indigo-300/15 px-3.5 py-2.5 flex flex-col">
            <span className="text-xs font-medium text-indigo-200/80">Cronômetro</span>
            <span className="font-mono tabular-nums text-lg sm:text-xl font-bold text-violet-200">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          <div className="rounded-xl bg-[#1D1842] border border-indigo-300/15 px-3.5 py-2.5 flex flex-col">
            <span className="text-xs font-medium text-indigo-200/80">Pontuação</span>
            <span className="font-mono tabular-nums text-lg sm:text-xl font-bold text-amber-300">
              {liveSoloScore}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl bg-[#1D1842] border border-indigo-300/15 px-3.5 py-2.5 flex flex-col">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-200/80">
              <Trophy className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              Recorde da fase
            </span>
            <span className="font-mono tabular-nums text-lg sm:text-xl font-bold text-white">
              {sessionRecord ? `${sessionRecord.bestScore} pts` : '—'}
            </span>
          </div>
        </section>
      )}

      {/* Motivational Feedback Strip */}
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-2 py-1 text-sm font-semibold text-violet-100 min-h-[30px]"
      >
        <Sparkles className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
        <span className="text-center">{motivationalMessage}</span>
      </div>

      {/* Card Grid Arena */}
      <main className="flex-1 flex items-center justify-center py-2.5 sm:py-4">
        <div
          className={`w-full mx-auto grid ${stage.gridClass} ${
            isCompact ? 'gap-2 sm:gap-3' : 'gap-2.5 sm:gap-4'
          }`}
        >
          {cards.map((card, index) => (
            <MemoryCard
              key={card.uid}
              card={card}
              index={index}
              disabled={isLocked}
              compact={isCompact}
              onSelect={onSelectCard}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
