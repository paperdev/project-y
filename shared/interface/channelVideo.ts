interface iChannelVideo {
  kind: string;
  etag: string;
  items: iChannelVideoItem[];
  nextPageToken: string;
  pageInfo: iPageInfo;
}

interface iChannelVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: iSnippet;
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
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
}

interface iThumbnail {
  url: string;
  width: string;
  height: string;
}

export {
  type iChannelVideo,
  type iChannelVideoItem,
}