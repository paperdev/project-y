interface iSearchVideo {
  kind: string;
  etag: string;
  items: iSearchVideoItem[];
  nextPageToken: string;
  pageInfo: iPageInfo;
}

interface iSearchVideoItem {
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
  thumbnails: {
    [key: string] : iThumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface iThumbnail {
  url: string;
  width: string;
  height: string;
}

export {
  type iSearchVideo,
  type iSearchVideoItem,
}