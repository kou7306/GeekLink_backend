import prisma from "../config/prisma";
import axios from "axios";

export const githubCallBackService = async (
  uuid: string,
  code: string,
  client_id: string,
  client_secret: string
): Promise<void> => {
  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;

    await prisma.users.update({
      where: { user_id: uuid },
      data: {
        github_access_token: accessToken,
      },
    });

    await saveGithubUser(accessToken, uuid);
  } catch (error) {
    console.error("Failed to save access token:", error);
  }
};

export const saveGithubUser = async (accessToken: string, uuid: string) => {
    try {
      const query = `
        query {
          viewer {
            login
          }
        }
      `;
  
      const userResponse = await axios.post(
        "https://api.github.com/graphql",
        JSON.stringify({ query }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const githubUser = userResponse.data.data.viewer.login;
  
      await prisma.users.update({
        where: { user_id: uuid },
        data: {
          github: githubUser,
        },
      });
    } catch (error) {
      console.error("Failed to fetch or save GitHub user info:", error);
    }
  };