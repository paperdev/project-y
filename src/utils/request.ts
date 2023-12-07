const generateURL = (url: string, params: Record<string, any>): string | undefined => {
  if (!process.env.YOUTUBE_KEY || !params) {
    return;
  }

  const newURL = new URL(url);
  const seartchParams = new URLSearchParams({key: process.env.YOUTUBE_KEY, ...params});
  return newURL + '?' + seartchParams.toString();
}

async function getYoutubeList(nextPageToken?: string) {
  if (!process.env.YOUTUBE_BASE_URL) {
    return;
  }

  let params = {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    regionCode: 'KR',
    maxResults: 5,
  };

  if (nextPageToken) {
    Object.assign(params, {
      pageToken: nextPageToken
    });
  }

  const url = generateURL(process.env.YOUTUBE_BASE_URL, params);
  if (!url) {
    return;
  }

  const res = await fetch(
    url,
    {
      headers: {
        'Content-type': 'application/json',
      },
    }
  );

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
    hl: 'es_MX',
  };
  
  const url = generateURL(process.env.YOUTUBE_REGION_URL, params);
  if (!url) {
    return;
  }

  const res = await fetch(
    url,
    {
      headers: {
        'Content-type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data.');
  }

  return res.json();
}

export {
  getYoutubeList,
  getRegionList
}