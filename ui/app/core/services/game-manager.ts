import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';

export class GameManager {
  private static SOCKET_URL = 'http://localhost:8080/api/ws-message';
  public stompClient: Client;

  constructor(private readonly id: string) {
    const Sock = new SockJS(GameManager.SOCKET_URL);
    this.stompClient = over(Sock);
    console.log(`initiates socket connection on ${this.id}`);
    this.stompClient.connect({}, this.listenForBallMovement());
  }

  listenForBallMovement() {
    return () => {
      console.log(`Connected!! to ${this.id}`);
      this.stompClient.subscribe(`/topic/${this.id}`, function(msg) {
        if (msg.body) {
          const jsonBody = JSON.parse(msg.body);
          if (jsonBody.message) {
            console.log(jsonBody.message);
          }
        }
      });
    };
  }
}
