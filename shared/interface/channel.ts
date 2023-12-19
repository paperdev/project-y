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
  thumbnails: any;
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

interface iLocalized {
  title: string;
  description: string;
}

export {
  type iChannel,
  type iChannelItem,
}