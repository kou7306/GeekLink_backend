// ユーザーのリポジトリ情報を取得(最新10件)
export const getRepositoryQuery = `
  query getRepositoryQuery($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
        edges {
          node {
            name
            stargazerCount
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
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

// ユーザーのコントリビューション数を取得
export const getContributionsQuery = `
  query getUserContributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          months {
            name
            year
            firstDay
          }
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

// ユーザーの直近のアクティビティログを取得
export const getActivityLogQuery = `
  query getActivityLog($username: String!) {
  user(login: $username) {
    repositories(first: 20, orderBy: { field: CREATED_AT, direction: DESC }) {
      edges {
        node {
          name
          owner {
            login
          }
          isFork
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
          createdAt
        }
      }
    }
    contributionsCollection {
      pullRequestContributionsByRepository(maxRepositories: 10) {
          repository {
            name
            owner {
              login
            }
          }
          contributions(first: 30) {
            nodes {
              occurredAt
              pullRequest {
                title
                url
              }
            }
          }
        }
    }
  }
}
`;

// ユーザーの使用言語を取得
export const getUseLanguageQuery = `
  query getRepositoryQuery($username: String!) {
    user(login: $username) {
      repositories(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
        edges {
          node {
            name
            stargazerCount
            owner {
              login
            }
            isFork
            languages(first: 20, orderBy: {field: SIZE, direction: DESC}) {
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
