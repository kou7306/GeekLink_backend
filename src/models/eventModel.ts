// src/models/eventModel.ts

export type Event = {
  id?: string;
  created_at?: Date;
  title: string;
  tech_stack: string[];
  max_participants: number;
  event_type: string;
  owner_id: string;
  participant_ids: string[];
  description: string | null;
};
