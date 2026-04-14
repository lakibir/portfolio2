export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stargazersCount: number;
  language: string | null;
  updatedAt: string;
};

export async function getGithubRepositories(username: string): Promise<GitHubRepo[]> {
  if (!username) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return [];
    }

    const repos = (await response.json()) as Array<{
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      stargazers_count: number;
      language: string | null;
      updated_at: string;
      archived: boolean;
      fork: boolean;
    }>;

    return repos
      .filter((repo) => !repo.archived && !repo.fork)
      .slice(0, 4)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        stargazersCount: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
      }));
  } catch {
    return [];
  }
}
