import { Message } from "../models/messageModel";
import { Client } from "./client";
import WebSocket from "ws";
import { saveMessage } from "../services/messageService";

export class Hub {
  clients: Map<Client, string>;
  registerCh: (client: Client) => void;
  unregisterCh: (client: Client) => void;
  broadcastCh: (message: Message) => void;

  constructor() {
    this.clients = new Map();
    this.registerCh = (client: Client) => this.register(client);
    this.unregisterCh = (client: Client) => this.unregister(client);
    this.broadcastCh = (message: Message) => this.broadcastToAllClient(message);
  }

  runLoop() {
    // this method is not needed in the new implementation
  }

  register(client: Client) {
    this.clients.set(client, client.ws.url.split("=")[1]);
  }

  unregister(client: Client) {
    this.clients.delete(client);
  }

  async broadcastToAllClient(msg: Message) {
    try {
      await saveMessage(msg);
    } catch (error) {
      console.error("Error saving message:", error);
      return;
    }

    this.clients.forEach((conversationId, client) => {
      if (conversationId === msg.conversation_id) {
        client.ws.send(JSON.stringify(msg));
      }
    });
  }
}
