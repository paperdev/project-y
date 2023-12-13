const fetcher = (url: string) => fetch(url).then((res) => res.json());

const generateURL = (
  url: string,
  params: Record<string, any>
): string | undefined => {
  const seartchParams = new URLSearchParams({ ...params });
  return url + '?' + seartchParams.toString();
};

const generateYoutubeURL = (
  url: string,
  params: Record<string, any>
): string | undefined => {
  if (!process.env.YOUTUBE_KEY || !params) {
    return;
  }

  const newURL = new URL(url);
  const seartchParams = new URLSearchParams({
    key: process.env.YOUTUBE_KEY,
    ...params,
  });
  return newURL + '?' + seartchParams.toString();
};

async function getYoutubeList(
  regionCode: string | null | undefined,
  nextPageToken?: string
) {
  if (!process.env.YOUTUBE_BASE_URL) {
    return;
  }

  let params = {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    regionCode: regionCode ? regionCode : process.env.DEFAULT_REGION,
    maxResults: 5,
  };

  if (nextPageToken) {
    Object.assign(params, {
      pageToken: nextPageToken,
    });
  }

  const url = generateYoutubeURL(process.env.YOUTUBE_BASE_URL, params);
  if (!url) {
    return;
  }

  const res = await fetch(url, {
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data.');
  }

  return res.json();
}

async function getRegionList() {
  if (!process.env.YOUTUBE_REGION_URL) {
    return;
  }

  let params = {
    part: 'snippet',
    hl: 'en_US',
  };

  const url = generateYoutubeURL(process.env.YOUTUBE_REGION_URL, params);
  if (!url) {
    return;
  }

  const res = await fetch(url, {
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data.');
  }

  return res.json();
}

async function getTrendList(regionCode: string | null | undefined) {
  if (!process.env.GOOGLE_TREND_DAILY_URL) {
    return;
  }

  let params = {
    geo: regionCode ? regionCode : process.env.DEFAULT_REGION,
  };

  const url = generateURL(process.env.GOOGLE_TREND_DAILY_URL, params);
  if (!url) {
    return;
  }

  const res = await fetch(
    url,
    {
      headers: {
        'Content-type': 'application/json',
        'Accept-Encoding': 'gzip',
        'Accept': 'application/json, text/plain, */*',
        'Content-Encoding': 'gzip',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data.');
  }

  const ab = await res.arrayBuffer();
  const bytes = new Uint8Array(ab);
  const temp = bytes.slice(6); // TODO: so weird
  var bytesString = new TextDecoder().decode(temp);
  return JSON.parse(bytesString);
}

export { fetcher, getYoutubeList, getRegionList, getTrendList };
