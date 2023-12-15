import axios from 'axios';

const axiosInstance = axios.create(
  {
    baseURL: process.env.YOUTUBE_BASE_URL,
    headers: {
      // 'Authorization': 'Bearer ' + 'abcdefg',
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    responseType: 'json',
  },
)

const generateURL = (
  url: string,
  params: Record<string, any>
): string | undefined => {
  if (!params) {
    return;
  }

  const searchParams = new URLSearchParams({ ...params });
  return url + '?' + searchParams.toString();
};

const generateURLWithKey = (
  url: string,
  params: Record<string, any>
): string | undefined => {
  if (!process.env.YOUTUBE_KEY || !params) {
    return;
  }

  const searchParams = new URLSearchParams({
    key: process.env.YOUTUBE_KEY,
    ...params,
  });
  return url + '?' + searchParams.toString();
};

async function getTrendList(
  regionCode: string | null | undefined,
  nextPageToken?: string
) {
  if (!process.env.YOUTUBE_VIDEO_URL) {
    return null;
  }

  let params = {
    // part: 'snippet,contentDetails,statistics',
    part: 'snippet,statistics',
    chart: 'mostPopular',
    regionCode: regionCode ? regionCode : process.env.DEFAULT_REGION,
    maxResults: 5,
  };

  if (nextPageToken) {
    Object.assign(params, {
      pageToken: nextPageToken,
    });
  }

  const url = generateURLWithKey(process.env.YOUTUBE_VIDEO_URL, params);
  if (!url) {
    return null;
  }

  const res = await axiosInstance.get(url);
  if (200 !== res.status) {
    throw new Error('Failed to fetch data.');
  }

  return res.data;
}

async function getSearchList(
  regionCode: string | null | undefined,
  searchKey: string | null,
  nextPageToken?: string
) {
  if (!process.env.YOUTUBE_SEARCH_URL || !searchKey) {
    return null;
  }

  let params = {
    part: 'id,snippet',
    regionCode: regionCode ? regionCode : process.env.DEFAULT_REGION,
    q: searchKey,
    maxResults: 5,
  };

  if (nextPageToken) {
    Object.assign(params, {
      pageToken: nextPageToken,
    });
  }

  const url = generateURLWithKey(process.env.YOUTUBE_SEARCH_URL, params);
  if (!url) {
    return null;
  }

  const res = await axiosInstance.get(url);
  if (200 !== res.status) {
    throw new Error('Failed to fetch data.');
  }

  return res.data;
}

async function getRegionList() {
  if (!process.env.YOUTUBE_REGION_URL) {
    return null;
  }

  let params = {
    part: 'snippet',
    hl: 'en_US',
  };

  const url = generateURLWithKey(process.env.YOUTUBE_REGION_URL, params);
  if (!url) {
    return null;
  }

  const res = await axiosInstance.get(url);
  if (200 !== res.status) {
    throw new Error('Failed to fetch data.');
  }

  return res.data;
}

async function getVideoCategoryList(regionCode: string | null | undefined,) {
  if (!process.env.YOUTUBE_VIDEO_CATEGORY_URL) {
    return null;
  }

  let params = {
    regionCode: regionCode ? regionCode : process.env.DEFAULT_REGION,
    part: 'snippet'
  };

  const url = generateURLWithKey(process.env.YOUTUBE_VIDEO_CATEGORY_URL, params);
  if (!url) {
    return null;
  }

  const res = await axiosInstance.get(url);
  if (200 !== res.status) {
    throw new Error('Failed to fetch data.');
  }

  return res.data;
}

export { getTrendList, getSearchList, getRegionList, getVideoCategoryList };
