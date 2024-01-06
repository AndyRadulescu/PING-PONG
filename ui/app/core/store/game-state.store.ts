import { create } from 'zustand';
import { GameState, ThisPlayer } from '@/app/core/model/game.model';
import { devtools } from 'zustand/middleware';

interface GameStateStore {
  gameState: GameState,
  updateGameState: (gameState: Partial<GameState>) => void;
  updateRoomId: (roomId: string) => void;
  updateIsStarted: (isStarted: boolean) => void;
  updatePlayerCount: (nr: number) => void
  updateThisPlayer: (thisPlayer: ThisPlayer) => void
  updateThisPlayerReady: () => void
}

export const useGameStateStore = create<GameStateStore>()(devtools((set) => ({
  gameState: {} as GameState,
  updateGameState: (newGameState: Partial<GameState>) => set((state) => ({ gameState: { ...state.gameState, ...newGameState } })),
  updateRoomId: (roomId: string) => set((state) => ({ gameState: { ...state.gameState, roomId } })),
  updatePlayerCount: (playerCount: number) => set((state) => ({
    gameState: {
      ...state.gameState,
      playerState: { ...state.gameState.playerState, playerReadyCount: playerCount }
    }
  })),
  updateIsStarted: (isStarted: boolean) => set((state) => ({
    gameState: {
      ...state.gameState,
      playerState: { ...state.gameState.playerState, isStarted }
    }
  })),
  updateThisPlayer: (thisPlayer: ThisPlayer) => set((state) => ({
    gameState: {
      ...state.gameState,
      playerState: { ...state.gameState.playerState, thisPlayer }
    }
  })),
  updateThisPlayerReady: () => set((state) => ({
    gameState: {
      ...state.gameState,
      playerState: { ...state.gameState.playerState, isThisPlayerReady: true }
    }
  }))
})));
