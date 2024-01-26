interface iTrendVideo {
  kind: string;
  etag: string;
  items: iTrendVideoItem[];
  nextPageToken: string;
  pageInfo: iPageInfo;
}

interface iTrendVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: iSnippet;
  statistics: iStatistics;
  status: iStatus;
  contentDetails: iContentDetails;
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
  tags: string[];
}

interface iStatistics {
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
}

interface iStatus {
  uploadStatus: string;
  privacyStatus: string;
  license: string;
  embeddable: boolean;
  publicStatsViewable: boolean;
  madeForKids: boolean;
}

interface iContentDetails {
  regionRestriction: {
    allowed: string[];
  }
}

interface iThumbnail {
  url: string;
  width: string;
  height: string;
}

export {
  type iTrendVideo,
  type iTrendVideoItem,
}