import ComponentVideo from '@/components/(youtube)/video';

const generateURL = (params: Record<string, any>): string | undefined => {
  if (!process.env.YOUTUBE_BASE_URL || !process.env.YOUTUBE_KEY || !params) {
    return;
  }

  const url = new URL(process.env.YOUTUBE_BASE_URL);
  const seartchParams = new URLSearchParams({key: process.env.YOUTUBE_KEY, ...params});
  return url + '?' + seartchParams.toString();
}

async function getYoutubeList(nextPageToken?: string) {
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
  const url = generateURL(params);

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
    throw new Error('Failed to fetch data from youtube.');
  }

  return res.json();
}

export default async function Page() {
  const dataYoutube = await getYoutubeList();
  // const nextPageToken = dataYoutube.nextPageToken;
  // const totalResults = dataYoutube.pageInfo.totalResults;

  return (
    <>
      <ComponentVideo dataVideo={dataYoutube.items} />
    </>
  );
}
