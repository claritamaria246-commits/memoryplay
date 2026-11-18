import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  calculateSoloStageScore,
  createShuffledStageDeck,
  getStageConfig,
  MOTIVATIONAL_MATCH_MESSAGES,
  STAGES,
} from './data/cards';
import type {
  ActiveModal,
  CardInstance,
  GameMode,
  GameState,
  PlayerState,
  SessionBestMap,
} from './types/game';
import { soundManager } from './utils/sound';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { HowToPlayModal, StageSelectModal, VictoryModal } from './components/Modals';

const SESSION_STORAGE_KEY = 'memory_play_stage_best_v2';

function loadSessionBest(): SessionBestMap {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as SessionBestMap;
  } catch {
    return {};
  }
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [mode, setMode] = useState<GameMode>('dupla');
  const [stageNumber, setStageNumber] = useState<number>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [activeModal, setActiveModal] = useState<ActiveModal>('NONE');

  const [player1Name, setPlayer1Name] = useState('Jogador 1');
  const [player2Name, setPlayer2Name] = useState('Jogador 2');

  const [players, setPlayers] = useState<[PlayerState, PlayerState]>([
    { id: 1, name: 'Jogador 1', pairs: 0, score: 0, streak: 0, stageWins: 0 },
    { id: 2, name: 'Jogador 2', pairs: 0, score: 0, streak: 0, stageWins: 0 },
  ]);
  const [activePlayerId, setActivePlayerId] = useState<1 | 2>(1);

  const [cards, setCards] = useState<CardInstance[]>(() => createShuffledStageDeck(1));
  const [selectedUids, setSelectedUids] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [soloStreak, setSoloStreak] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalSoloScore, setFinalSoloScore] = useState(0);
  const [isNewSessionRecord, setIsNewSessionRecord] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState(
    'Encontre os pares! Clique em duas cartas para começar.'
  );

  const [sessionBest, setSessionBest] = useState<SessionBestMap>(loadSessionBest);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const mismatchTimeoutRef = useRef<number | null>(null);
  const victoryTimeoutRef = useRef<number | null>(null);

  const clearPendingTimeouts = useCallback(() => {
    if (mismatchTimeoutRef.current !== null) {
      window.clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
    if (victoryTimeoutRef.current !== null) {
      window.clearTimeout(victoryTimeoutRef.current);
      victoryTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearPendingTimeouts();
      soundManager.stopMusic();
    };
  }, [clearPendingTimeouts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeModal !== 'NONE') {
        setActiveModal('NONE');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  useEffect(() => {
    if (gameState !== 'PLAYING' || activeModal !== 'NONE') {
      return;
    }
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [gameState, activeModal]);

  const startStage = useCallback(
    (targetStage: number, nextMode: GameMode = mode, keepStageWins = true) => {
      clearPendingTimeouts();
      const stage = getStageConfig(targetStage);
      const safeP1Name = player1Name.trim() || 'Jogador 1';
      const safeP2Name = player2Name.trim() || 'Jogador 2';
      const starter: 1 | 2 = targetStage % 2 === 1 ? 1 : 2;

      setStageNumber(stage.stageNumber);
      setCards(createShuffledStageDeck(stage.stageNumber));
      setSelectedUids([]);
      setIsLocked(false);
      setAttempts(0);
      setMatchedPairs(0);
      setSoloStreak(0);
      setElapsedSeconds(0);
      setFinalSoloScore(0);
      setIsNewSessionRecord(false);
      setActivePlayerId(starter);

      setPlayers((prev) => [
        {
          id: 1,
          name: safeP1Name,
          pairs: 0,
          score: 0,
          streak: 0,
          stageWins: keepStageWins ? prev[0].stageWins : 0,
        },
        {
          id: 2,
          name: safeP2Name,
          pairs: 0,
          score: 0,
          streak: 0,
          stageWins: keepStageWins ? prev[1].stageWins : 0,
        },
      ]);

      const starterName = starter === 1 ? safeP1Name : safeP2Name;
      setMotivationalMessage(
        nextMode === 'dupla'
          ? `${stage.title} · Vez de ${starterName}! Encontre um par para continuar jogando.`
          : `${stage.title} · Encontre todos os ${stage.pairs} pares!`
      );
      setActiveModal('NONE');
      setGameState('PLAYING');
    },
    [clearPendingTimeouts, mode, player1Name, player2Name]
  );

  const handleBackToMenu = useCallback(() => {
    clearPendingTimeouts();
    setSelectedUids([]);
    setIsLocked(false);
    setActiveModal('NONE');
    setGameState('MENU');
  }, [clearPendingTimeouts]);

  const handleSelectStage = useCallback(
    (targetStage: number) => {
      if (gameState === 'PLAYING') {
        startStage(targetStage, mode, true);
      } else {
        setStageNumber(targetStage);
        setActiveModal('NONE');
      }
    },
    [gameState, mode, startStage]
  );

  const handleChangePlayerName = useCallback((player: 1 | 2, name: string) => {
    if (player === 1) {
      setPlayer1Name(name);
    } else {
      setPlayer2Name(name);
    }
  }, []);

  const handleToggleSfx = useCallback(() => {
    setSfxEnabled((prev) => {
      const next = !prev;
      soundManager.setSfxEnabled(next);
      return next;
    });
  }, []);

  const handleToggleMusic = useCallback(() => {
    setMusicEnabled((prev) => {
      const next = !prev;
      soundManager.setMusicEnabled(next);
      return next;
    });
  }, []);

  const liveSoloScore = useMemo(() => {
    if (matchedPairs === 0 && attempts === 0) return 0;
    const base = matchedPairs * 150;
    const wrongAttempts = Math.max(0, attempts - matchedPairs);
    return Math.max(0, base - wrongAttempts * 25);
  }, [matchedPairs, attempts]);

  const handleSelectCard = useCallback(
    (clickedCard: CardInstance) => {
      if (isLocked || gameState !== 'PLAYING') return;
      if (clickedCard.isFlipped || clickedCard.isMatched) return;
      if (selectedUids.includes(clickedCard.uid)) return;
      if (selectedUids.length >= 2) return;

      soundManager.playFlip();

      const updatedSelection = [...selectedUids, clickedCard.uid];
      setCards((prev) =>
        prev.map((c) => (c.uid === clickedCard.uid ? { ...c, isFlipped: true } : c))
      );
      setSelectedUids(updatedSelection);

      if (updatedSelection.length < 2) {
        return;
      }

      // Two cards flipped: lock board while verifying
      setIsLocked(true);
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      const firstCard = cards.find((c) => c.uid === updatedSelection[0]);
      const secondCard = clickedCard;
      const stage = getStageConfig(stageNumber);

      if (firstCard && firstCard.cardId === secondCard.cardId) {
        const nextMatched = matchedPairs + 1;
        const isLastPair = nextMatched === stage.pairs;

        const currentActivePlayer = players[activePlayerId - 1];
        const nextPlayerStreak = currentActivePlayer.streak + 1;
        const nextSoloStreak = soloStreak + 1;
        const earnedPoints =
          150 + Math.max(0, (mode === 'dupla' ? nextPlayerStreak : nextSoloStreak) - 1) * 50;

        soundManager.playMatch(mode === 'dupla' ? nextPlayerStreak : nextSoloStreak);

        setCards((prev) =>
          prev.map((c) =>
            c.uid === firstCard.uid || c.uid === secondCard.uid
              ? {
                  ...c,
                  isFlipped: true,
                  isMatched: true,
                  matchedBy: mode === 'dupla' ? activePlayerId : undefined,
                }
              : c
          )
        );
        setMatchedPairs(nextMatched);
        setSelectedUids([]);
        setIsLocked(false);

        let updatedPlayersSnapshot: [PlayerState, PlayerState] = players;
        if (mode === 'dupla') {
          updatedPlayersSnapshot = [
            activePlayerId === 1
              ? {
                  ...players[0],
                  pairs: players[0].pairs + 1,
                  score: players[0].score + earnedPoints,
                  streak: nextPlayerStreak,
                }
              : players[0],
            activePlayerId === 2
              ? {
                  ...players[1],
                  pairs: players[1].pairs + 1,
                  score: players[1].score + earnedPoints,
                  streak: nextPlayerStreak,
                }
              : players[1],
          ];
          setPlayers(updatedPlayersSnapshot);
        } else {
          setSoloStreak(nextSoloStreak);
        }

        if (isLastPair) {
          setMotivationalMessage('Incrível! Todos os pares da fase encontrados!');
          setCompletedStages((prev) =>
            prev.includes(stageNumber) ? prev : [...prev, stageNumber]
          );

          if (mode === 'dupla') {
            const [p1, p2] = updatedPlayersSnapshot;
            const isTie = p1.pairs === p2.pairs && p1.score === p2.score;
            if (!isTie) {
              const winnerId: 1 | 2 =
                p1.pairs > p2.pairs || (p1.pairs === p2.pairs && p1.score > p2.score) ? 1 : 2;
              setPlayers((prev) => [
                winnerId === 1 ? { ...prev[0], stageWins: prev[0].stageWins + 1 } : prev[0],
                winnerId === 2 ? { ...prev[1], stageWins: prev[1].stageWins + 1 } : prev[1],
              ]);
            }
          } else {
            const computedScore = calculateSoloStageScore(stage, nextAttempts, elapsedSeconds);
            setFinalSoloScore(computedScore);

            const currentBest = sessionBest[stageNumber];
            const beatRecord = !currentBest || computedScore > currentBest.bestScore;
            setIsNewSessionRecord(beatRecord);

            if (beatRecord) {
              const updatedSession: SessionBestMap = {
                ...sessionBest,
                [stageNumber]: {
                  bestScore: computedScore,
                  bestTimeSeconds: elapsedSeconds,
                  bestAttempts: nextAttempts,
                },
              };
              setSessionBest(updatedSession);
              try {
                sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedSession));
              } catch {
                // Ignore storage quota errors
              }
            }
          }

          victoryTimeoutRef.current = window.setTimeout(() => {
            soundManager.playVictory();
            setGameState('VICTORY');
          }, 420);
        } else if (mode === 'dupla') {
          if (nextMatched === stage.pairs - 1) {
            setMotivationalMessage(
              `Par encontrado! ${currentActivePlayer.name} joga novamente — falta só 1 par!`
            );
          } else if (nextPlayerStreak >= 2) {
            setMotivationalMessage(
              `Sequência de ${nextPlayerStreak} pares para ${currentActivePlayer.name}! Jogue novamente!`
            );
          } else {
            setMotivationalMessage(
              `Boa, ${currentActivePlayer.name}! Par encontrado — você joga novamente!`
            );
          }
        } else {
          if (nextMatched === stage.pairs - 1) {
            setMotivationalMessage('Quase lá! Falta apenas 1 par!');
          } else if (nextSoloStreak >= 2) {
            setMotivationalMessage(`Sequência incrível! ${nextSoloStreak} pares seguidos!`);
          } else {
            const msgIndex = (nextMatched - 1) % MOTIVATIONAL_MATCH_MESSAGES.length;
            setMotivationalMessage(MOTIVATIONAL_MATCH_MESSAGES[msgIndex]);
          }
        }
      } else {
        // Mismatch: reset active player's streak, flip back, and switch turn in duo mode
        soundManager.playMismatch();
        const nextPlayerId: 1 | 2 = activePlayerId === 1 ? 2 : 1;
        const nextPlayerName = players[nextPlayerId - 1].name;

        if (mode === 'dupla') {
          setPlayers((prev) => [
            activePlayerId === 1 ? { ...prev[0], streak: 0 } : prev[0],
            activePlayerId === 2 ? { ...prev[1], streak: 0 } : prev[1],
          ]);
          setMotivationalMessage(`Não foi dessa vez! Passando a vez para ${nextPlayerName}...`);
        } else {
          setSoloStreak(0);
          setMotivationalMessage('Quase! Memorize essas posições e tente novamente.');
        }

        const [firstUid, secondUid] = updatedSelection;
        mismatchTimeoutRef.current = window.setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uid === firstUid || c.uid === secondUid ? { ...c, isFlipped: false } : c
            )
          );
          if (mode === 'dupla') {
            setActivePlayerId(nextPlayerId);
            setMotivationalMessage(`Vez de ${nextPlayerName}! Escolha duas cartas.`);
          }
          setSelectedUids([]);
          setIsLocked(false);
          mismatchTimeoutRef.current = null;
        }, 850);
      }
    },
    [
      activePlayerId,
      attempts,
      cards,
      elapsedSeconds,
      gameState,
      isLocked,
      matchedPairs,
      mode,
      players,
      selectedUids,
      sessionBest,
      soloStreak,
      stageNumber,
    ]
  );

  const handleNextStage = useCallback(() => {
    const nextStage = Math.min(STAGES.length, stageNumber + 1);
    startStage(nextStage, mode, true);
  }, [mode, stageNumber, startStage]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_#2D246B_0%,_#18143B_52%,_#100D26_100%)] text-[#F5F3FF]">
      {gameState === 'MENU' && (
        <StartScreen
          mode={mode}
          selectedStage={stageNumber}
          completedStages={completedStages}
          player1Name={player1Name}
          player2Name={player2Name}
          sfxEnabled={sfxEnabled}
          musicEnabled={musicEnabled}
          onChangeMode={setMode}
          onChangePlayerName={handleChangePlayerName}
          onStartGame={() => startStage(stageNumber, mode, false)}
          onOpenHowToPlay={() => setActiveModal('HOW_TO_PLAY')}
          onOpenStageSelect={() => setActiveModal('STAGE_SELECT')}
          onToggleSfx={handleToggleSfx}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {(gameState === 'PLAYING' || gameState === 'VICTORY') && (
        <GameBoard
          mode={mode}
          stageNumber={stageNumber}
          cards={cards}
          attempts={attempts}
          matchedPairs={matchedPairs}
          elapsedSeconds={elapsedSeconds}
          liveSoloScore={gameState === 'VICTORY' ? finalSoloScore : liveSoloScore}
          players={players}
          activePlayerId={activePlayerId}
          isLocked={isLocked || gameState === 'VICTORY'}
          motivationalMessage={motivationalMessage}
          sessionRecord={sessionBest[stageNumber]}
          sfxEnabled={sfxEnabled}
          musicEnabled={musicEnabled}
          onSelectCard={handleSelectCard}
          onRestart={() => startStage(stageNumber, mode, true)}
          onBackToMenu={handleBackToMenu}
          onOpenStageSelect={() => setActiveModal('STAGE_SELECT')}
          onOpenHowToPlay={() => setActiveModal('HOW_TO_PLAY')}
          onToggleSfx={handleToggleSfx}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {activeModal === 'HOW_TO_PLAY' && (
        <HowToPlayModal onClose={() => setActiveModal('NONE')} />
      )}

      {activeModal === 'STAGE_SELECT' && (
        <StageSelectModal
          selectedStage={stageNumber}
          completedStages={completedStages}
          sessionBest={sessionBest}
          onSelectStage={handleSelectStage}
          onClose={() => setActiveModal('NONE')}
        />
      )}

      {gameState === 'VICTORY' && (
        <VictoryModal
          mode={mode}
          stageNumber={stageNumber}
          finalSoloScore={finalSoloScore}
          elapsedSeconds={elapsedSeconds}
          attempts={attempts}
          players={players}
          isNewSessionRecord={isNewSessionRecord}
          onNextStage={handleNextStage}
          onPlayAgain={() => startStage(stageNumber, mode, true)}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}
