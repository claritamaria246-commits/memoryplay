import { useState } from 'react';
import {
  Play,
  HelpCircle,
  Layers,
  Volume2,
  VolumeX,
  Music,
  Users,
  User,
} from 'lucide-react';
import { DIFFICULTIES, getStageConfig, STAGES } from '../data/cards';
import type { GameMode } from '../types/game';

interface StartScreenProps {
  mode: GameMode;
  selectedStage: number;
  completedStages: number[];
  player1Name: string;
  player2Name: string;
  sfxEnabled: boolean;
  musicEnabled: boolean;
  onChangeMode: (mode: GameMode) => void;
  onChangePlayerName: (player: 1 | 2, name: string) => void;
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  onOpenStageSelect: () => void;
  onToggleSfx: () => void;
  onToggleMusic: () => void;
}

const HERO_IMAGE = '/src/assets/images/memory_hero_mascot_1795008880898.jpg';

export function StartScreen({
  mode,
  selectedStage,
  completedStages,
  player1Name,
  player2Name,
  sfxEnabled,
  musicEnabled,
  onChangeMode,
  onChangePlayerName,
  onStartGame,
  onOpenHowToPlay,
  onOpenStageSelect,
  onToggleSfx,
  onToggleMusic,
}: StartScreenProps) {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const currentStage = getStageConfig(selectedStage);
  const diffLabel = DIFFICULTIES[currentStage.difficulty].label;

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 sm:px-8 py-6 max-w-6xl mx-auto">
      {/* Clean Top Bar */}
      <header className="flex items-center justify-between gap-6 py-2 border-b border-indigo-300/15">
        <span className="font-display text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0">
          MEMORY PLAY
        </span>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleSfx}
            aria-pressed={sfxEnabled}
            className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-xl text-sm font-medium text-indigo-100 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            {sfxEnabled ? (
              <Volume2 className="w-4 h-4 text-violet-300" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-indigo-300/60" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{sfxEnabled ? 'Som ligado' : 'Som mudo'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleMusic}
            aria-pressed={musicEnabled}
            className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-xl text-sm font-medium text-indigo-100 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <Music
              className={`w-4 h-4 ${musicEnabled ? 'text-amber-300' : 'text-indigo-300/60'}`}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">
              {musicEnabled ? 'Música ligada' : 'Música desligada'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Hero Split */}
      <main className="flex-1 flex items-center py-8 sm:py-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Title, Mode & Players, Stage Info, Primary Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <div className="space-y-2.5">
              <p className="text-sm font-semibold tracking-wide text-violet-300">
                Jogo da Memória por Fases · Duelo em Dupla ou Individual
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
                MEMORY PLAY
              </h1>
              <p className="font-display text-xl sm:text-2xl font-semibold text-amber-300">
                Desafie sua memória!
              </p>
            </div>

            {/* Game Mode Segmented Control */}
            <div className="space-y-3">
              <div
                role="group"
                aria-label="Modo de jogo"
                className="inline-flex p-1 rounded-xl bg-[#1C1742] border border-indigo-300/20"
              >
                <button
                  type="button"
                  onClick={() => onChangeMode('dupla')}
                  aria-pressed={mode === 'dupla'}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    mode === 'dupla'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-indigo-200 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" aria-hidden="true" />
                  Em Dupla (2 Jogadores)
                </button>

                <button
                  type="button"
                  onClick={() => onChangeMode('solo')}
                  aria-pressed={mode === 'solo'}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    mode === 'solo'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-indigo-200 hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  1 Jogador
                </button>
              </div>

              {/* Player Names Inputs for Dupla */}
              {mode === 'dupla' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="block text-xs font-semibold text-violet-200 mb-1">
                      Nome do Jogador 1
                    </span>
                    <input
                      type="text"
                      maxLength={18}
                      value={player1Name}
                      onChange={(e) => onChangePlayerName(1, e.target.value)}
                      placeholder="Jogador 1"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#1A153E] border border-violet-400/40 text-white placeholder:text-indigo-300/50 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-xs font-semibold text-amber-200 mb-1">
                      Nome do Jogador 2
                    </span>
                    <input
                      type="text"
                      maxLength={18}
                      value={player2Name}
                      onChange={(e) => onChangePlayerName(2, e.target.value)}
                      placeholder="Jogador 2"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#1A153E] border border-amber-400/40 text-white placeholder:text-indigo-300/50 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Unboxed Stage & Progress Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-indigo-200 border-y border-indigo-300/15 py-3">
              <span className="font-semibold text-white">{currentStage.title}</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span>Nível {diffLabel}</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="font-mono tabular-nums">{currentStage.pairs} pares</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="font-mono tabular-nums">{currentStage.totalCards} cartas</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="font-mono tabular-nums text-emerald-300">
                {completedStages.length}/{STAGES.length} fases concluídas
              </span>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onStartGame}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-xl bg-violet-600 hover:bg-violet-500 active:translate-y-px text-white font-display text-lg font-bold shadow-lg shadow-violet-950/50 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <Play className="w-5 h-5 fill-current" aria-hidden="true" />
                INICIAR FASE {currentStage.stageNumber}
              </button>

              <button
                type="button"
                onClick={onOpenStageSelect}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 min-h-[52px] rounded-xl bg-[#221D4A] hover:bg-[#2B255B] border border-indigo-300/25 text-indigo-50 font-semibold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                <Layers className="w-4 h-4 text-violet-300" aria-hidden="true" />
                ESCOLHER FASE
              </button>

              <button
                type="button"
                onClick={onOpenHowToPlay}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 min-h-[52px] rounded-xl bg-transparent hover:bg-white/10 border border-indigo-300/20 text-indigo-100 font-semibold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                <HelpCircle className="w-4 h-4 text-amber-300" aria-hidden="true" />
                COMO JOGAR
              </button>
            </div>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-6 flex items-stretch">
            <div className="relative w-full rounded-2xl overflow-hidden border border-indigo-300/20 bg-[#1B1640] shadow-xl shadow-black/40 min-h-[260px] lg:min-h-[400px]">
              {!heroImgFailed ? (
                <img
                  src={HERO_IMAGE}
                  alt="Ilustração divertida de um personagem cérebro amigável com óculos segurando cartas coloridas do jogo da memória"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#2A225C] via-[#1C1642] to-[#13102B]">
                  <p className="font-display text-2xl font-bold text-white">MEMORY PLAY</p>
                  <p className="text-sm text-indigo-200 mt-1">
                    5 Fases Progressivas · Modo em Dupla e Individual
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="pt-4 border-t border-indigo-300/15 flex flex-wrap items-center justify-between gap-4 text-xs text-indigo-200/70">
        <span>MEMORY PLAY · Estimule sua concentração, atenção e raciocínio lógico</span>
        <span>5 fases progressivas · Jogável em dupla ou individual</span>
      </footer>
    </div>
  );
}
