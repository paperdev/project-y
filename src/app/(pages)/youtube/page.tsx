import ComponentVideo from '@/components/(youtube)/video';

async function getYoutubeList() {
  if (!process.env.YOUTUBE_TREND_VIDEO || !process.env.YOUTUBE_KEY) {
    return undefined;
  }

  const res = await fetch(
    process.env.YOUTUBE_TREND_VIDEO + process.env.YOUTUBE_KEY,
    {
      headers: {
        'Content-type': 'application/json;',
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

  return (
    <>
      <ComponentVideo dataVideo={dataYoutube.items} />
    </>
  );
}
