import { Match } from "../models/matchModel";
import { User } from "../models/userModel";
import { Message } from "../models/messageModel";
import { Follow } from "../models/followModel";
import { Event } from "../models/eventModel";

export interface Database {
  public: {
    Tables: {
      Match: {
        Row: Match;
      };
      User: {
        Row: User;
      };
      Like: {
        Row: Follow;
      };
      Message: {
        Row: Message;
      };
      Event: {
        Row: Event;
      };
    };
  };
}
