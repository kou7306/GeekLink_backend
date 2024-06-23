import { Message } from "../models/messageModel";
import { Client } from "./client";
import WebSocket from "ws";
import { supabase } from "../config/db";

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
    const message = {
      sender_id: msg.sender_id,
      receiver_id: msg.receiver_id,
      content: msg.content,
      created_at: msg.created_at,
      conversation_id: msg.conversation_id,
    };

    const { error } = await supabase.from("messages").insert(message);

    if (error) {
      console.error("Error inserting message into database:", error);
      return;
    }

    this.clients.forEach((conversationId, client) => {
      if (conversationId === msg.conversation_id) {
        client.ws.send(JSON.stringify(message));
      }
    });
  }
}
