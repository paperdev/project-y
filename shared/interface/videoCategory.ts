interface iVideoCategory {
  kind: string;
  etag: string;
  items: iVideoCategoryItem[];
}

interface iVideoCategoryItem {
  kind: string;
  etag: string;
  id: string;
  snippet: iSnippet;
}

interface iSnippet {
  title: string;
  assignable: boolean;
  channelId: string;
}

export {
  type iVideoCategory,
  type iVideoCategoryItem,
}