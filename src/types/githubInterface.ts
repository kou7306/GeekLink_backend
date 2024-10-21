interface languageNode {
  name: string;
}

interface commitNode {
  target: {
    history: {
      edges: any;
      totalCount: number;
    };
  };
}

interface repositoryNode {
  name: string;
  url: string;
  stargazerCount: number;
  defaultBranchRef: commitNode;
  languages: {
    edges: Array<{
      node: languageNode;
      size: number;
    }>;
  };
  updatedAt: string;
}

export interface repositoryResponse {
  user: {
    repositories: {
      edges: Array<{
        node: repositoryNode;
      }>;
    };
  };
}

export interface contributionResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        months: Array<{
          name: string;
          year: number;
          firstDay: string;
        }>;
        weeks: Array<{
          contributionDays: Array<{
            date: string;
            contributionCount: number;
          }>;
        }>;
      };
    };
  };
}

export interface activityResponse {
  user: {
    issues: any;
    repositories: {
      edges: Array<{
        node: {
          name: string;
          owner: {
            login: string;
          };
          isFork: boolean;
          defaultBranchRef: commitNode;
          createdAt: Date;
        };
      }>;
    };
    contributionsCollection: {
      pullRequestContributionsByRepository: Array<{
        repository: {
          name: string;
          owner: {
            login: string;
          };
        };
        contributions: {
          nodes: {
            forEach(arg0: (contribution: any) => void): unknown;
            occurredAt: Date;
            pullRequest: {
              title: string;
              url: string;
            };
          };
        };
      }>;
    };
  };
}
