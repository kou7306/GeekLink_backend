import { Match } from "../models/matchModel";
import { User } from "../models/userModel";
import { Message } from "../models/messageModel";
import { Like } from "../models/likeModel";

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
    };
  };
}
