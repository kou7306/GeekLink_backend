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

    // アクセストークンをデータベースに保存
    await prisma.users.update({
      where: { user_id: uuid }, // ここに認証中のユーザーのUUIDを指定
      data: {
        qiita_access_token: accessToken,
      },
    });

    console.log("成功");
  } catch (error) {
    console.error("アクセストークンの取得に失敗しました:", error);
  }
};
