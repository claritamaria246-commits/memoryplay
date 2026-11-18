import { useState } from 'react';
import { Check } from 'lucide-react';
import { CARD_MAP } from '../data/cards';
import type { CardInstance } from '../types/game';

interface MemoryCardProps {
  card: CardInstance;
  index: number;
  disabled: boolean;
  compact?: boolean;
  onSelect: (card: CardInstance) => void;
}

const CARD_BACK_IMAGE = '/src/assets/images/memory_card_back_1795008881988.jpg';

export function MemoryCard({
  card,
  index,
  disabled,
  compact = false,
  onSelect,
}: MemoryCardProps) {
  const [backImgFailed, setBackImgFailed] = useState(false);
  const definition = CARD_MAP[card.cardId];
  const isRevealed = card.isFlipped || card.isMatched;

  const handleClick = () => {
    if (disabled || isRevealed) return;
    onSelect(card);
  };

  const matchBorderClass =
    card.isMatched && card.matchedBy === 2
      ? 'border-amber-500 shadow-lg shadow-amber-950/30'
      : card.isMatched
      ? 'border-emerald-500 shadow-lg shadow-emerald-950/30'
      : 'border-violet-200 shadow-lg shadow-black/25';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled && !isRevealed}
      aria-label={
        isRevealed
          ? `Carta ${index + 1}: ${definition.name}${card.isMatched ? ' (par encontrado)' : ''}`
          : `Carta ${index + 1}: virada para baixo`
      }
      aria-pressed={isRevealed}
      className={`group relative w-full aspect-[3/4] min-h-[74px] rounded-2xl card-perspective focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121028] ${
        isRevealed ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <div
        className={`card-inner rounded-2xl ${isRevealed ? 'is-flipped' : ''} ${
          card.isMatched ? 'is-matched' : ''
        }`}
      >
        {/* Card Back (Face Down) */}
        <div
          className={`card-face rounded-2xl overflow-hidden border transition-transform duration-150 ${
            disabled
              ? 'border-indigo-400/25'
              : 'border-violet-300/35 group-hover:-translate-y-0.5 group-hover:border-violet-200/70'
          } bg-[#1C1642] shadow-md shadow-black/30`}
        >
          {!backImgFailed ? (
            <img
              src={CARD_BACK_IMAGE}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setBackImgFailed(true)}
              className="w-full h-full object-cover scale-[1.08] select-none pointer-events-none"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2E256B] via-[#211A4E] to-[#161238] p-3">
              <div className="w-10 h-10 rounded-xl border border-amber-300/50 bg-violet-500/20 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-amber-200">M</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121028]/30 via-transparent to-white/5 pointer-events-none" />
        </div>

        {/* Card Front (Face Up) */}
        <div
          style={{ backgroundColor: definition.surfaceTint }}
          className={`card-face card-face-front rounded-2xl overflow-hidden flex flex-col items-center justify-between border-2 transition-colors ${
            compact ? 'p-1.5 sm:p-2.5' : 'p-2.5 sm:p-3.5'
          } ${matchBorderClass}`}
        >
          {/* Top match status row */}
          <div className="w-full flex items-center justify-between text-[11px] font-semibold leading-none min-h-[16px]">
            <span
              className="uppercase tracking-wider truncate"
              style={{ color: definition.accentColor }}
            >
              {definition.category}
            </span>
            {card.isMatched && (
              <span
                className={`inline-flex items-center gap-0.5 font-bold ${
                  card.matchedBy === 2 ? 'text-amber-700' : 'text-emerald-700'
                }`}
                title="Par encontrado"
              >
                {card.matchedBy ? (
                  <span className="font-mono text-[10px]">J{card.matchedBy}</span>
                ) : null}
                <Check className="w-3.5 h-3.5 stroke-[2.75]" aria-hidden="true" />
              </span>
            )}
          </div>

          {/* Center Artwork */}
          <div className="w-full flex-1 flex items-center justify-center min-h-0 py-1">
            <div className={compact ? 'w-11 h-11 sm:w-15 sm:h-15' : 'w-14 h-14 sm:w-20 sm:h-20'}>
              {definition.renderArt()}
            </div>
          </div>

          {/* Bottom Name */}
          <span
            className={`font-display font-bold text-[#1E1B4B] tracking-tight text-center leading-tight truncate w-full ${
              compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
            }`}
          >
            {definition.name}
          </span>
        </div>
      </div>
    </button>
  );
}
