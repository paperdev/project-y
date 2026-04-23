interface iRegion {
  kind: string;
  etag: string;
  items: iRegionItem[];
}

interface iRegionItem {
  kind: string;
  etag: string;
  id: string;
  snippet: iSnippet;
}

interface iSnippet {
  gl: string;
  name: string;
}

interface iRegionElement {
  label: string;
  value: string;
  src?: string;
}

export {
  type iRegion,
  type iRegionItem,
  type iRegionElement,
}