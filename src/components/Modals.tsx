import { X, Check, Trophy, RotateCcw, Home, ArrowRight } from 'lucide-react';
import { DIFFICULTIES, formatTime, getStageConfig, STAGES } from '../data/cards';
import type { GameMode, PlayerState, SessionBestMap } from '../types/game';

interface HowToPlayModalProps {
  onClose: () => void;
}

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B091A]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-[#1E1946] border border-indigo-300/25 p-6 sm:p-8 shadow-2xl shadow-black/60 text-indigo-50">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-indigo-300/15">
          <div>
            <h2 id="how-to-play-title" className="font-display text-2xl font-bold text-white">
              Como Jogar
            </h2>
            <p className="text-sm text-indigo-200/80 mt-0.5">
              Fases progressivas e duelo em dupla
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar instruções"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/15 text-indigo-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <ol className="space-y-4 py-5 text-sm sm:text-base text-indigo-100 leading-relaxed">
          <li className="flex gap-3">
            <span className="font-mono font-bold text-amber-300 shrink-0">01.</span>
            <span>
              <strong>Encontre os pares:</strong> clique em duas cartas por vez para revelar as ilustrações. Cartas iguais ficam abertas; diferentes voltam a esconder.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono font-bold text-amber-300 shrink-0">02.</span>
            <span>
              <strong>Modo em Dupla:</strong> quem acertar um par ganha pontos e <strong>joga novamente</strong>! Se errar, a vez passa para o outro jogador.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono font-bold text-amber-300 shrink-0">03.</span>
            <span>
              <strong>5 Fases Crescentes:</strong> avance da Fase 1 (8 cartas) até a Fase 5 (24 cartas). Quem fizer mais pares e pontos vence a fase!
            </span>
          </li>
        </ol>

        <div className="pt-4 border-t border-indigo-300/15 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 min-h-[44px] rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-display font-bold text-base transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            Entendi, vamos jogar
          </button>
        </div>
      </div>
    </div>
  );
}

interface StageSelectModalProps {
  selectedStage: number;
  completedStages: number[];
  sessionBest: SessionBestMap;
  onSelectStage: (stageNumber: number) => void;
  onClose: () => void;
}

export function StageSelectModal({
  selectedStage,
  completedStages,
  sessionBest,
  onSelectStage,
  onClose,
}: StageSelectModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B091A]/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stage-modal-title"
    >
      <div className="w-full max-w-xl rounded-2xl bg-[#1E1946] border border-indigo-300/25 p-6 sm:p-8 shadow-2xl shadow-black/60 text-indigo-50 my-auto">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-indigo-300/15">
          <div>
            <h2 id="stage-modal-title" className="font-display text-2xl font-bold text-white">
              Escolher Fase
            </h2>
            <p className="text-sm text-indigo-200/80 mt-0.5">
              5 fases progressivas do nível Fácil ao Difícil
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar seleção de fases"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/15 text-indigo-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-2.5 py-5">
          {STAGES.map((stage) => {
            const isSelected = stage.stageNumber === selectedStage;
            const isCompleted = completedStages.includes(stage.stageNumber);
            const diffLabel = DIFFICULTIES[stage.difficulty].label;
            const record = sessionBest[stage.stageNumber];

            return (
              <button
                key={stage.stageNumber}
                type="button"
                onClick={() => onSelectStage(stage.stageNumber)}
                className={`w-full text-left rounded-xl p-3.5 sm:p-4 border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                  isSelected
                    ? 'bg-violet-600/25 border-violet-400'
                    : 'bg-[#171338] hover:bg-[#231E50] border-indigo-300/15'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-display text-base sm:text-lg font-bold text-white truncate">
                      {stage.title}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 shrink-0">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        Concluída
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 font-mono tabular-nums text-xs sm:text-sm text-indigo-200 shrink-0">
                    <span>{diffLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{stage.totalCards} cartas</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-indigo-200/80 mt-1">{stage.subtitle}</p>
                {record && (
                  <p className="text-xs font-mono tabular-nums text-amber-300 mt-1.5">
                    Melhor solo: {record.bestScore} pts · {formatTime(record.bestTimeSeconds)}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

interface VictoryModalProps {
  mode: GameMode;
  stageNumber: number;
  finalSoloScore: number;
  elapsedSeconds: number;
  attempts: number;
  players: [PlayerState, PlayerState];
  isNewSessionRecord: boolean;
  onNextStage: () => void;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const CONFETTI_COLORS = ['#A78BFA', '#F59E0B', '#34D399', '#F472B6', '#60A5FA'];

export function VictoryModal({
  mode,
  stageNumber,
  finalSoloScore,
  elapsedSeconds,
  attempts,
  players,
  isNewSessionRecord,
  onNextStage,
  onPlayAgain,
  onBackToMenu,
}: VictoryModalProps) {
  const stage = getStageConfig(stageNumber);
  const hasNextStage = stageNumber < STAGES.length;
  const accuracy = attempts > 0 ? Math.round((stage.pairs / attempts) * 100) : 100;

  // Determine duo winner by pairs first, then score
  const p1 = players[0];
  const p2 = players[1];
  const isTie = mode === 'dupla' && p1.pairs === p2.pairs && p1.score === p2.score;
  const stageWinner =
    p1.pairs > p2.pairs || (p1.pairs === p2.pairs && p1.score > p2.score) ? p1 : p2;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B091A]/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-title"
    >
      {/* Celebratory Confetti Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="confetti-piece absolute top-0 w-2.5 h-3.5 rounded-sm"
            style={{
              left: `${(i * 4.2 + 2) % 98}%`,
              backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              ['--fall-duration' as string]: `${2.4 + (i % 5) * 0.35}s`,
              ['--fall-delay' as string]: `${(i % 7) * 0.25}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-xl rounded-2xl bg-[#1E1946] border border-violet-300/35 p-6 sm:p-8 shadow-2xl shadow-black/70 text-center space-y-5 my-auto">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-300/40 flex items-center justify-center text-amber-300">
          <Trophy className="w-7 h-7" aria-hidden="true" />
        </div>

        <div className="space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-violet-200">
            {stage.title} concluída
          </p>

          <h2
            id="victory-title"
            className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]"
          >
            {mode === 'dupla'
              ? isTie
                ? 'EMPATE INCRÍVEL NA DUPLA! 🎉'
                : `PARABÉNS, ${stageWinner.name.toUpperCase()} VENCEU! 🎉`
              : 'PARABÉNS! VOCÊ VENCEU! 🎉'}
          </h2>

          <div className="space-y-1 text-sm sm:text-base text-indigo-100 leading-relaxed">
            <p className="font-semibold text-violet-200">
              Você encontrou todos os pares do MEMORY PLAY!
            </p>
            <p>Sua memória está cada vez melhor! Continue jogando e desafie seus limites!</p>
          </div>

          {!hasNextStage && (
            <p className="text-sm font-bold text-emerald-300 pt-1">
              Jornada completa! Vocês superaram todas as {STAGES.length} fases!
            </p>
          )}

          {mode === 'solo' && isNewSessionRecord && (
            <p className="text-sm font-bold text-amber-300 pt-1">
              Novo recorde da sessão na {stage.title}!
            </p>
          )}
        </div>

        {/* Duo vs Solo Results Breakdown */}
        {mode === 'dupla' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-left">
              {[p1, p2].map((player) => {
                const isWinner = !isTie && stageWinner.id === player.id;
                return (
                  <div
                    key={player.id}
                    className={`rounded-xl p-4 border ${
                      isWinner
                        ? 'bg-[#28205B] border-amber-400/70'
                        : 'bg-[#151133] border-indigo-300/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-bold text-white truncate">
                        {player.name}
                      </span>
                      {isWinner && (
                        <span className="text-xs font-bold text-amber-300 shrink-0">
                          Vencedor
                        </span>
                      )}
                    </div>
                    <p className="font-mono tabular-nums text-xl font-bold text-emerald-300 mt-1.5">
                      {player.pairs} pares
                    </p>
                    <p className="font-mono tabular-nums text-xs text-indigo-200/85 mt-0.5">
                      {player.score} pts · {player.stageWins} {player.stageWins === 1 ? 'fase vencida' : 'fases vencidas'}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-xs font-mono tabular-nums text-indigo-200/80">
              Tempo total: {formatTime(elapsedSeconds)} · {attempts} tentativas na rodada
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3 text-left">
              <div className="rounded-xl bg-[#151133] border border-indigo-300/15 p-3.5">
                <span className="block text-xs text-indigo-200/80">Pontuação final</span>
                <span className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-amber-300">
                  {finalSoloScore}
                </span>
              </div>

              <div className="rounded-xl bg-[#151133] border border-indigo-300/15 p-3.5">
                <span className="block text-xs text-indigo-200/80">Tempo total</span>
                <span className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-white">
                  {formatTime(elapsedSeconds)}
                </span>
              </div>

              <div className="rounded-xl bg-[#151133] border border-indigo-300/15 p-3.5">
                <span className="block text-xs text-indigo-200/80">Tentativas</span>
                <span className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-emerald-300">
                  {attempts}
                </span>
              </div>
            </div>

            <p className="text-xs font-mono tabular-nums text-indigo-200/80">
              {stage.pairs} pares · Precisão de {accuracy}%
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 pt-1">
          {hasNextStage ? (
            <button
              type="button"
              onClick={onNextStage}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-display font-bold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              PRÓXIMA FASE (FASE {stageNumber + 1})
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : null}

          <button
            type="button"
            onClick={onPlayAgain}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl font-display font-bold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
              hasNextStage
                ? 'bg-[#29235C] hover:bg-[#342D73] border border-indigo-300/20 text-indigo-50'
                : 'bg-violet-600 hover:bg-violet-500 text-white'
            }`}
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            JOGAR NOVAMENTE
          </button>

          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-[#29235C] hover:bg-[#342D73] border border-indigo-300/20 text-indigo-50 font-display font-bold text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            VOLTAR AO MENU
          </button>
        </div>
      </div>
    </div>
  );
}
