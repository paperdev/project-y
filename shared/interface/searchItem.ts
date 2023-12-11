interface iSearchItem {
  title: iTitle;
  formattedTraffic: string;
  relatedQueries: iTitle[];
  image: iImage;
  articles: iArticle[];
  shareUrl: string;
}

interface iTitle {
  query: string;
  exploreLink: string;
}

interface iImage {
  newsUrl: string;
  source: string;
  imageUrl: string;
}

interface iArticle {
  title: string;
  timeAgo: string;
  source: string;
  image: iImage[];
  url: string;
  snippet: string;
}

export {
  type iSearchItem,
}