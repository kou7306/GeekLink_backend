// リアクションインターフェース
export interface Reaction {
  reactionId: string; // リアクションのID
  postId: string; // 関連する投稿のID
  userId: string; // リアクションを行ったユーザーのID
  emoji: string; // 使用された絵文字
  createdAt: Date; // リアクションが作成された日時
}

// 投稿インターフェース
export interface Post {
  id: string; // 投稿のID
  userId: string; // 投稿を作成したユーザーのID
  user_name: string; // 投稿を作成したユーザーの名前
  user_image: string; // 投稿を作成したユーザーのアイコン
  title: string; // 投稿のタイトル
  time: string; // やった時間
  comment: string; // 投稿の内容
  timestamp: Date; // 投稿の作成日時
  reactions: Reaction[]; // リアクションの配列
}

export type Timeline = {
  post_id: string;
  user_id: string;
  title: string;
  time: string;
  comment: string;
  created_at: Date;
};
