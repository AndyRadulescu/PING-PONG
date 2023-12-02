import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { GameState } from '@/app/core/model/game-message';
import { useGameStateStore, usePlayerStateStore } from '@/app/core/store/game-state.store';
import { PlayerState } from '@/app/game/game-config';
import { startGame } from '@/app/core/api/api';

export class GameManager {
  public stompClient: Client;

  private static SOCKET_URL = 'http://localhost:8080/api/ws-message';
  private updateGame = useGameStateStore((state) => state.updateGameState);
  private playerState = usePlayerStateStore((state) => state.playerState);
  private updateTaskId = usePlayerStateStore((state) => state.updateTaskId);
  private updatePlayerCount = usePlayerStateStore((state) => state.updatePlayerCount);

  constructor(private readonly id: string) {
    const Sock = new SockJS(GameManager.SOCKET_URL);
    this.stompClient = over(Sock);
    console.log(`initiates socket connection on ${this.id}`);
    this.stompClient.connect({}, this.listenForGameStateUpdates());
  }

  listenForGameStateUpdates() {
    return () => {
      this.stompClient.subscribe(`/topic/count/${this.id}`, async (msg) => {
        const playerCount = msg.body;
        if (playerCount) {
          console.log(playerCount);
          if (playerCount === '2' && this.playerState.playerCount === 1) {
            const taskId = await startGame(this.id);
          }
          this.updatePlayerCount(parseInt(playerCount));
        }
      });
      this.stompClient.send(`/app/count/${this.id}`, {}, PlayerState.ADD);

      console.log(`Connected!! to ${this.id}`);
      this.stompClient.subscribe(`/topic/${this.id}`, (msg) => {
        if (msg.body) {
          const gameState = JSON.parse(msg.body) as GameState;
          console.log(gameState);
          this.updateGame(gameState);
        }
      });
    };
  }
}
