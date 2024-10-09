import prisma from "../config/prisma";
import axios from "axios";

export const qiitaCallBackService = async (
  uuid: string,
  code: string,
  client_id: string,
  client_secret: string
): Promise<void> => {
  try {
    // 認証コードを使ってアクセストークンを取得
    const tokenResponse = await axios.post(
      "https://qiita.com/api/v2/access_tokens",
      {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
      }
    );

    const accessToken = tokenResponse.data.token;

    // Qiita APIを使ってユーザー情報を取得
    const userResponse = await axios.get(
      "https://qiita.com/api/v2/authenticated_user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const qiitaUserId = userResponse.data.id; // QiitaのユーザーID

    // アクセストークンとユーザー情報をデータベースに保存
    await prisma.users.update({
      where: { user_id: uuid }, // ここに認証中のユーザーのUUIDを指定
      data: {
        qiita: qiitaUserId,
        qiita_access_token: accessToken,
      },
    });

    console.log("成功");
  } catch (error) {
    console.error(
      "アクセストークンの取得またはユーザー情報の取得に失敗しました:",
      error
    );
  }
};

export const getQiitaUserActivityService = async (
  uuid: string,
  period: string
) => {
  try {
    // データベースからQiitaアクセストークンとユーザーIDを取得
    const user = await prisma.users.findUnique({
      where: { user_id: uuid },
      select: {
        qiita_access_token: true,
        qiita: true, // QiitaのユーザーIDを取得
      },
    });

    if (!user) {
      return {
        monthlyPostCounts: Array(12).fill(0),
        postDetails: [],
      };
    }

    const { qiita_access_token, qiita } = user;

    if (!qiita_access_token || !qiita) {
      return {
        monthlyPostCounts: Array(12).fill(0),
        postDetails: [],
      };
    }

    // ユーザーの投稿情報を取得
    const response = await axios.get(
      `https://qiita.com/api/v2/users/${qiita}/items`,
      {
        headers: {
          Authorization: `Bearer ${qiita_access_token}`,
        },
      }
    );

    const posts = response.data;

    // 現在の日付を取得
    const currentDate = new Date();
    // 期間によってカットオフ日を設定
    let cutoffDate: Date;

    if (period === "1mo") {
      cutoffDate = new Date();
      cutoffDate.setMonth(currentDate.getMonth() - 1); // 1ヶ月前の日付
    } else if (period === "1yr") {
      cutoffDate = new Date();
      cutoffDate.setFullYear(currentDate.getFullYear() - 1); // 1年前の日付
    } else if (period === "all") {
      // 全ての投稿を取得
      cutoffDate = new Date(0); // 1970年1月1日を設定して全てのデータを取得
    } else {
      // 不正な期間指定に対するエラーハンドリング
      throw new Error("Invalid period specified");
    }

    // 月毎の投稿数を計算
    const monthlyPostCounts = Array(12).fill(0);
    const postDetails: {
      title: any;
      likes_count: any;
      page_views_count: any;
      tags: any[];
      url: any;
      date: Date;
    }[] = [];

    posts.forEach(
      (post: {
        tags: any[];
        page_views_count: any;
        likes_count: any;
        created_at: Date;
        title: any;
        url: any;
      }) => {
        const postDate = new Date(post.created_at);
        if (postDate >= cutoffDate) {
          // カットオフ日以降の投稿のみを考慮
          const month = postDate.getUTCMonth(); // 0-11の範囲
          monthlyPostCounts[month] += 1;

          // 投稿の詳細を追加
          postDetails.push({
            title: post.title,
            likes_count: post.likes_count,
            page_views_count: post.page_views_count,
            tags: post.tags,
            url: post.url,
            date: post.created_at,
            // 他の必要な情報を追加
          });
        }
      }
    );

    // 結果を返す
    return {
      monthlyPostCounts,
      postDetails,
    };
  } catch (error) {
    console.error("Error fetching Qiita user activity:", error);
    throw new Error("Failed to fetch user activity from Qiita");
  }
};
