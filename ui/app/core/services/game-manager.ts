import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';

export class GameManager {
  private static SOCKET_URL = 'http://localhost:8080/api/ws-message';
  public stompClient: Client;

  constructor() {
    const Sock = new SockJS(GameManager.SOCKET_URL);
    this.stompClient = over(Sock);

    console.log('initiates socket connection');
    this.stompClient.connect({}, this.listenForBallMovement());
  }

  listenForBallMovement(){
    return () => {
      console.log('Connected!!');
      this.stompClient.subscribe('/topic/andy', function(msg) {
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
