import { PrismaClient } from "@prisma/client";
import { Post, Reaction } from "../models/timelineModel"; // 型定義は適宜修正してください

const prisma = new PrismaClient();

export const getPostService = async (
  page: number,
  limit: number
): Promise<{ posts: Post[] }> => {
  const posts = await prisma.timeline.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      created_at: "desc",
    },
    include: {
      TimelineReaction: true,
    },
  });

  const formattedPosts: Post[] = posts.map((post) => ({
    id: post.post_id,
    userId: post.user_id || "",
    user_name: post.user_name || "",
    title: post.title || "",
    time: post.time || "",
    comment: post.comment || "",
    timestamp: post.created_at,
    reactions: post.TimelineReaction.map((reaction) => ({
      reactionId: reaction.reaction_id,
      postId: reaction.post_id || "",
      userId: reaction.user_id || "",
      emoji: reaction.emoji || "",
      createdAt: reaction.created_at,
    })),
  }));

  return { posts: formattedPosts };
};

export const createPostService = async (
  userId: string,
  title: string,
  time: string,
  comment: string
): Promise<Post> => {
  const user = await prisma.users.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      name: true,
    },
  });

  const newPost = await prisma.timeline.create({
    data: {
      user_id: userId,
      user_name: user?.name,
      title: title,
      time: time,
      comment: comment,
    },
  });

  return {
    id: newPost.post_id,
    userId: newPost.user_id || "",
    user_name: newPost.user_name || "",
    title: newPost.title || "",
    time: newPost.time || "",
    comment: newPost.comment || "",
    timestamp: newPost.created_at,
    reactions: [],
  };
};

export const addReactionService = async (
  postId: string,
  userId: string,
  emoji: string
): Promise<Post> => {
  const existingReaction = await prisma.timelineReaction.findFirst({
    where: {
      post_id: postId,
      user_id: userId,
    },
  });

  if (existingReaction) {
    await prisma.timelineReaction.delete({
      where: {
        reaction_id: existingReaction.reaction_id,
      },
    });
  } else {
    await prisma.timelineReaction.create({
      data: {
        post_id: postId,
        user_id: userId,
        emoji,
      },
    });
  }

  const updatedPost = await prisma.timeline.findUnique({
    where: {
      post_id: postId,
    },
    include: {
      TimelineReaction: true,
    },
  });

  if (!updatedPost) throw new Error("Post not found");

  return {
    id: updatedPost.post_id,
    userId: updatedPost.user_id || "",
    user_name: updatedPost.user_name || "",
    title: updatedPost.title || "",
    time: updatedPost.time || "",
    comment: updatedPost.comment || "",
    timestamp: updatedPost.created_at,
    reactions: updatedPost.TimelineReaction.map((reaction) => ({
      reactionId: reaction.reaction_id,
      postId: reaction.post_id || "",
      userId: reaction.user_id || "",
      emoji: reaction.emoji || "",
      createdAt: reaction.created_at,
    })),
  };
};
