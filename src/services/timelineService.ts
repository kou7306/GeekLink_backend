import { Post } from "../models/timelineModel";

// 投稿データの例
export const posts: Post[] = [
  {
    id: "1",
    userid: "user1",
    content: "This is a sample post",
    timestamp: new Date("2024-08-01T10:00:00Z"),
    reactions: {
      "👍": ["test"], // 配列を使用
    },
  },
  {
    id: "2",
    userid: "user1",
    content: "Another sample post",
    timestamp: new Date("2024-08-02T14:30:00Z"),
    reactions: {}, // Initialize reactions
  },
];

// 投稿サービスの関数
export const getPostService = async (): Promise<{ posts: Post[] }> => {
  // 投稿データをそのまま返す
  return { posts };
};

export const createPostService = async (
  uuid: string,
  contents: string
): Promise<Post> => {
  const newPost: Post = {
    id: uuid,
    userid: uuid,
    content: contents,
    timestamp: new Date(),
    reactions: {}, // Initialize reactions
  };

  posts.push(newPost);
  return newPost;
};

// サーバー側のリアクションを適切に初期化
export const addReactionService = async (
  postId: string,
  userId: string,
  emoji: string
): Promise<Post> => {
  const post = posts.find((p) => p.id === postId);
  if (!post) throw new Error("投稿が見つかりません");

  // Initialize reactions if they don't exist
  if (!post.reactions) {
    post.reactions = {};
  }

  // Initialize emoji reactions as an Array
  if (!post.reactions[emoji]) {
    post.reactions[emoji] = [];
  }

  // Check if user has already reacted with this emoji
  const userReactions = post.reactions[emoji];
  const userIndex = userReactions.indexOf(userId);

  if (userIndex !== -1) {
    // Remove reaction
    userReactions.splice(userIndex, 1);
    if (userReactions.length === 0) {
      delete post.reactions[emoji];
    }
  } else {
    // Add reaction
    userReactions.push(userId);
    console.log("Added reaction:", post);
  }

  return post;
};
