import axios from 'axios';
import { Http, HttpDownloadFileOptions, HttpDownloadFileResult } from '@capacitor-community/http';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor, CapacitorCookies } from '@capacitor/core';

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
  regionCode: string | null,
  videoCategoryId: string | null,
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

  if (videoCategoryId) {
    Object.assign(params, {
      videoCategoryId: videoCategoryId,
    });
  }

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
  regionCode: string | null,
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

async function getChannel(
  channelId: string | null
) {
  if (!process.env.YOUTUBE_CHANNEL_URL || !channelId) {
    return null;
  }

  let params = {
    part: 'snippet,contentDetails,statistics',
    id: channelId,
  };

  const url = generateURLWithKey(process.env.YOUTUBE_CHANNEL_URL, params);
  if (!url) {
    return null;
  }

  const res = await axiosInstance.get(url);
  if (200 !== res.status) {
    throw new Error('Failed to fetch data.');
  }

  return res.data;
}

async function getPlayListItems(
  playlistId: string | null,
  nextPageToken?: string
) {
  if (!process.env.YOUTUBE_PLAYLISTITEMS_URL || !playlistId) {
    return null;
  }

  let params = {
    part: 'snippet',
    playlistId: playlistId,
    maxResults: 5,
  };

  if (nextPageToken) {
    Object.assign(params, {
      pageToken: nextPageToken,
    });
  }

  const url = generateURLWithKey(process.env.YOUTUBE_PLAYLISTITEMS_URL, params);
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

async function getGoogleTrendList(regionCode: string | null | undefined) {
  if (!process.env.GOOGLE_TREND_URL || !process.env.GOOGLE_TREND_DAILY_URL) {
    return null;
  }

  let params = {
    geo: regionCode ? regionCode : process.env.DEFAULT_REGION,
  };

  
  if (Capacitor.getPlatform() === 'ios') {
    const url = generateURL(process.env.GOOGLE_TREND_URL + process.env.GOOGLE_TREND_DAILY_URL, params);
    if (!url) {
      return null;
    }

    const options: HttpDownloadFileOptions = {
      url: url,
      filePath: 'json.txt',
      fileDirectory: Directory.Cache,
      method: 'GET',
    };

    try {
      await Filesystem.stat({
        directory: options.fileDirectory,
        path: options.filePath,
      });
      await Filesystem.deleteFile({
        directory: options.fileDirectory,
        path: options.filePath,
      });
    } catch {}

    const currentCookies = await CapacitorCookies.getCookies();
    if (0 === Object.keys(currentCookies).length) {
      const resCookies = await Http.getCookies({url: url});
      resCookies.cookies.map(async (cookie) => {
        console.log(`${cookie.key} : ${cookie.value}`)
        await CapacitorCookies.setCookie({
          url: url,
          key: cookie.key,
          value: cookie.value,
        });
      })
    }
    
    const res: HttpDownloadFileResult = await Http.downloadFile(options);
    if (res.path) {
      const read = await Filesystem.readFile({
        path: options.filePath,
        directory: options.fileDirectory,
        encoding: Encoding.UTF8,
      });

      const temp = read.data.slice(6);
      return JSON.parse(temp.toString());
    }

    return null;
  }

  const url = generateURL(process.env.GOOGLE_TREND_DAILY_URL, params);
  if (!url) {
    return null;
  }

  const res = await axios.get(
    url,
    {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true
    }
  );

  if (200 !== res.status) {
    throw new Error('Failed to fetch data.');
  }

  const temp = res.data.slice(6);
  return JSON.parse(temp);
}

export { 
  getTrendList, 
  getSearchList, 
  getChannel, 
  getPlayListItems, 
  getRegionList, 
  getVideoCategoryList, 
  getGoogleTrendList
};
