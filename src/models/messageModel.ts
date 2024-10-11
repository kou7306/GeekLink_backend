export type Message = {
  id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: Date;
  room_id: string;
};
