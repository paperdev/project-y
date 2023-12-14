interface iVideo {
  kind: string;
  etag: string;
  items: iItem[];
  nextPageToken: string;
  pageInfo: iPageInfo;
}

interface iItem {
  kind: string;
  etag: string;
  id: string;
  snippet: iSnippet;
  statistics: iStatistics;
  tagExpanded?: boolean;
  descExpanded?: boolean;
}

interface iPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface iSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {};
  channelTitle: string;
  tags: string[];
}

interface iStatistics {
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
}

export {
  type iVideo,
  type iItem,
}