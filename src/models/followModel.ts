export type Follow = {
  id?: number;
  follower_id: string;
  followee_id: string;
  created_at: Date;
};