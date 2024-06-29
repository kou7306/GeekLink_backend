import supabase from "../config/supabase";
import prisma from "../config/prisma";

export const exchangeCodeForSessionService = async (
  code: string,
  next: string = "/",
  origin: string
): Promise<string> => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }

  // セッション情報が含まれている場合、それを使ってユーザー情報を取得または作成することができます
  const { user } = data;
  if (user) {
    await prisma.users.upsert({
      where: { user_id: user.id },
      update: {
        name: user.user_metadata?.name || "Unknown",
        updated_at: new Date(),
      },
      create: {
        user_id: user.id,
        name: user.user_metadata?.name || "Unknown",
        sex: user.user_metadata?.sex || "Unknown",
        age: user.user_metadata?.age || "Unknown",
        place: user.user_metadata?.place || "Unknown",
        top_teches: user.user_metadata?.top_teches || [],
        teches: user.user_metadata?.teches || [],
        hobby: user.user_metadata?.hobby || null,
        occupation: user.user_metadata?.occupation || "Unknown",
        affiliation: user.user_metadata?.affiliation || null,
        qualification: user.user_metadata?.qualification || [],
        editor: user.user_metadata?.editor || null,
        github: user.user_metadata?.github || null,
        twitter: user.user_metadata?.twitter || null,
        qiita: user.user_metadata?.qiita || null,
        zenn: user.user_metadata?.zenn || null,
        atcoder: user.user_metadata?.atcoder || null,
        message: user.user_metadata?.message || null,
        created_at: new Date(),
        updated_at: new Date(),
        portfolio: user.user_metadata?.portfolio || null,
        graduate: user.user_metadata?.graduate || null,
        desired_occupation: user.user_metadata?.desired_occupation || null,
        faculty: user.user_metadata?.faculty || null,
        experience: user.user_metadata?.experience || [],
        image_url: user.user_metadata?.image_url || null,
      },
    });
  }

  return `${origin}${next}`;
};
