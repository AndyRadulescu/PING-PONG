import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { GameState } from '@/app/core/model/game-message';
import { useGameStateStore } from '@/app/core/store/game-state.store';
import { PlayerState } from '@/app/game/game-config';

export class GameManager {
  public stompClient: Client;

  private static SOCKET_URL = 'http://localhost:8080/api/ws-message';
  private updateGame = useGameStateStore((state) => state.updateGameState);

  constructor(private readonly id: string) {
    const Sock = new SockJS(GameManager.SOCKET_URL);
    this.stompClient = over(Sock);
    console.log(`initiates socket connection on ${this.id}`);
    this.stompClient.connect({}, this.listenForGameStateUpdates());
  }

  listenForGameStateUpdates() {
    return () => {
      this.stompClient.subscribe(`/topic/count/${this.id}`, (msg) => {
        if (msg.body) {
          console.log(msg.body);
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
