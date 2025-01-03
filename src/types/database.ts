import { Match } from "../models/matchModel";
import { User } from "../models/userModel";
import { Message } from "../models/messageModel";
import { Like } from "../models/likeModel";
import { Event } from "../models/eventModel";
import { Timeline } from "../models/timelineModel";
import { Follow } from "../models/followModel";

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
        Row: Like;
      };
      Message: {
        Row: Message;
      };
      Event: {
        Row: Event;
      };
      Timeline: {
        Row: Timeline;
      };
      Follow: {
        Row: Follow;
      };
    };
  };
}