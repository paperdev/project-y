interface iChannel {
  kind: string;
  etag: string;
  pageInfo: iPageInfo;
  items: iChannelItem[];
}

interface iChannelItem {
  kind: string;
  etag: string;
  id: string;
  snippet: iSnippet;
  statistics: iStatistics;
  contentDetails: iContentDetails;
}

interface iPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface iSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: {
    [key: string] : iThumbnail;
  };
  defaultLanguage: string;
  country: string;
  localized: iLocalized;
}

interface iStatistics {
  viewCount: number;
  subscriberCount: number;
  hiddenSubscriberCount: boolean;
  videoCount: number;
}

interface iContentDetails {
  relatedPlaylists: {
    likes: string;
    uploads: string;
  };
}

interface iLocalized {
  title: string;
  description: string;
}

interface iThumbnail {
  url: string;
  width: string;
  height: string;
}

export {
  type iChannel,
  type iChannelItem,
}