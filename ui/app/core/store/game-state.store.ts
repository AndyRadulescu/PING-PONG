import { create } from 'zustand';
import { GameState } from '@/app/core/model/game-message';

interface GameStateStore {
  gameState: GameState,
  updateGameState: (gameState: GameState) => void;
  updateTaskId: (taskId: string) => void;
}

export const useGameStateStore = create<GameStateStore>()((set) => ({
  gameState: {} as GameState,
  updateGameState: (newGameState: GameState) => set((state) => ({ gameState: { ...state.gameState, newGameState } })),
  updateTaskId: (taskId: string) => set((state) => ({ gameState: { ...state.gameState, taskId } }))
}));
