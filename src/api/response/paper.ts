export interface PaperProjectResponse {
  versions: string[];
}

export interface PaperVersionResponse {
  version: string;
  builds: number[];
}

export interface PaperBuildResponse {
  version: string;
  build: number;
  changes: {
    commit: string;
    summary: string;
  }[];
  downloads: Record<string, {
    name: string;
    sha256: string;
  }>;
}

