import prisma from "../config/prisma";

export const getUserAppActivityService = async (
  uuid: string | null,
  hoursBack: string
) => {
  try {
    const time = new Date();
    time.setUTCHours(time.getUTCHours() - parseInt(hoursBack, 10));

    // タイムラインへの投稿を取得
    const posts = await prisma.timeline.findMany({
      where: {
        user_id: uuid,
        created_at: {
          gte: time.toISOString(),
        },
      },
    });

    // 作成したイベントを取得
    const events = await prisma.event.findMany({
      where: uuid
        ? {
            owner_id: uuid,
            created_at: {
              gte: time.toISOString(),
            },
          }
        : undefined,
    });

    const activity = [...posts, ...events].sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    return activity;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
