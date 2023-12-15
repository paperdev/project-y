interface iTrendVideo {
  kind: string;
  etag: string;
  items: iTrendItem[];
  nextPageToken: string;
  pageInfo: iPageInfo;
}

interface iTrendItem {
  kind: string;
  etag: string;
  id: string;
  snippet: iSnippet;
  statistics: iStatistics;
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
  type iTrendVideo,
  type iTrendItem,
}