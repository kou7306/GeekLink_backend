import WebSocket from 'ws';
import { Message } from '../models/messageModel';

export class Client {
  ws: WebSocket;
  sendCh: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
    this.sendCh = ws;
  }

  static newClient(ws: WebSocket) {
    return new Client(ws);
  }

  static newClientWithConversationId(ws: WebSocket, conversationId: string) {
    return {
      client: new Client(ws),
      conversationId,
    };
  }

  readLoop(broadcast: (message: Message) => void, unregister: (client: Client) => void) {
    this.ws.on('message', (data: WebSocket.Data) => {
      const message: Message = JSON.parse(data.toString());
      broadcast(message);
    });

    this.ws.on('close', () => {
      unregister(this);
    });
  }

  writeLoop() {
    this.ws.on('message', (data: WebSocket.Data) => {
      const message: Message = JSON.parse(data.toString());
      this.ws.send(JSON.stringify(message));
    });

    this.ws.on('close', () => {
      this.ws.close();
    });
  }

  disconnect(unregister: (client: Client) => void) {
    unregister(this);
    this.ws.close();
  }
}
