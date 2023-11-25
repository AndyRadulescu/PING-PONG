import { create } from 'zustand';
import { GameState } from '@/app/core/model/game-message';

interface GameStateStore {
  gameState: GameState,
  updateGameState: (gameState: GameState) => void;
}

export const useGameStateStore = create<GameStateStore>()((set) => ({
  gameState: {} as GameState,
  updateGameState: (newGameState: GameState) => set((state) => ({ gameState: newGameState }))
}));
