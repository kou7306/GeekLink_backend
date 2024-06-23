import WebSocket from "ws";
import { Hub } from "../utils/hub";
import { Client } from "../utils/client";

const hub = new Hub();

export const handleWebSocketConnection = (ws: WebSocket, conversationId: string) => {
  const clientWithConversationId = Client.newClientWithConversationId(ws, conversationId);
  hub.registerCh(clientWithConversationId.client);

  clientWithConversationId.client.readLoop(hub.broadcastCh, hub.unregisterCh);
  clientWithConversationId.client.writeLoop();
};
