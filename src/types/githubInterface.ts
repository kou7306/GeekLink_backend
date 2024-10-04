interface languageNode {
  name: string;
};

interface commitNode {
  target: {
    history: {
      totalCount: number;
    };
  };
};

interface repositoryNode {
  name: string;
  stargazerCount: number;
  defaultBranchRef: commitNode
  languages: {
      edges: Array<{
        node: languageNode
        size: number;
      }>;
  };
  updatedAt: string;
};
  
export interface repositoryResponse {
  user: {
    repositories: {
      edges: Array<{
        node: repositoryNode;
      }>;
    };
  };
};

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
};

export interface MonthContribution {
  name: string;
  year: number;
  contributions: number;
};

export interface activityResponse {
  user: {
    repositories: {
      edges: Array<{
        node: {
          name: string;
          owner: {
            login: string;
          };
          isFork: boolean;
          defaultBranchRef: commitNode;
          createtAt: Date;
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
        contrinbutions: {
          nodes: {
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
};