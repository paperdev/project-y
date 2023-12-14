interface iSearchVideo {
  kind: string;
  etag: string;
  items: iItem[];
  nextPageToken: string;
  pageInfo: iPageInfo;
}

interface iItem {
  kind: string;
  etag: string;
  id: iItemId;
  snippet: iSnippet;
  descExpanded?: boolean;
}

interface iItemId {
  kind: string;
  channelId?: string;
  videoId?: string;
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
  liveBroadcastContent: string;
  publishTime: string;
}

export {
  type iSearchVideo,
  type iItem as iSearchItem,
}