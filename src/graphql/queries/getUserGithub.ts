// ユーザーのリポジトリ情報を取得(最新10件)
export const getRepositoryQuery = `
  query getRepositoryQuery($userName: String!) {
    user(login: $userName) {
      repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
        edges {
          node {
            name
            stargazerCount
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                node {
                  name
                }
                size
              }
            }
            updatedAt
          }
        }
      }
    }
  }
`;