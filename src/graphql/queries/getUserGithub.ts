// ユーザーのリポジトリ情報を取得(最新10件)
export const getRepositoryQuery = `
  query getRepositoryQuery($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
        edges {
          node {
            name
            url
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
query ($username: String!, $since: GitTimestamp!) {
  user(login: $username) {
    # リポジトリ情報
    repositories(first: 100) {
      edges {
        node {
          name
          owner {
            login
          }
          isFork
          createdAt
          # デフォルトブランチでのコミット履歴を取得
          defaultBranchRef {
            target {
              ... on Commit {
                history(since: $since, first: 100) {
                  totalCount
                  edges {
                    node {
                      message
                      committedDate
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    # プルリクエストの履歴を取得
    contributionsCollection {
      pullRequestContributionsByRepository {
        repository {
          name
        }
        contributions(first: 100) { 
          nodes {
            pullRequest {
              title
              url
              mergedAt
              createdAt
              reviews(first: 10) {
                nodes {
                  author {
                    login
                  }
                  body
                  submittedAt
                }
              }
            }
          }
        }
      }
    }

    # イシュー情報を取得
    issues(first: 100) {
      edges {
        node {
          title
          url
          createdAt
          closedAt
          repository {
            name
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
