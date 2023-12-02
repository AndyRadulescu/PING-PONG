import { create } from 'zustand';
import { GameState, PlayerState } from '@/app/core/model/game-message';

interface GameStateStore {
  gameState: GameState,
  updateGameState: (gameState: GameState) => void;
}

interface PlayerStateStore {
  playerState: PlayerState,
  updateTaskId: (taskId: string) => void;
  updatePlayerCount: (nr: number) => void
}

export const useGameStateStore = create<GameStateStore>()((set) => ({
  gameState: {} as GameState,
  updateGameState: (newGameState: GameState) => set((state) => ({ gameState: { ...state.gameState, newGameState } }))
}));

export const usePlayerStateStore = create<PlayerStateStore>()((set) => ({
  playerState: {} as PlayerState,
  updateTaskId: (taskId: string) => set((state) => ({ playerState: { ...state.playerState, taskId } })),
  updatePlayerCount: (playerNumber: number) => set((state) => ({
    playerState: {
      ...state.playerState,
      playerCount: playerNumber
    }
  }))
}));
