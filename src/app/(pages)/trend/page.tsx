import React from 'react';

const getData = async (url: string) => {
  const res = await fetch(
    url,
    {
      headers: {
        'Content-type': 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Encoding': 'gzip',
      },
    }
  );

  if (!res.ok || !res.body) {
    throw new Error('Failed to fetch data.');
  }

  const ab = await res.arrayBuffer();
  const bytes = new Uint8Array(ab);
  const temp = bytes.slice(6);
  const bytesString = String.fromCharCode(...temp);
  return JSON.parse(bytesString);
}

export default async function Page() {
  if (!process.env.GOOGLE_TREND_URL) {
    return;
  }
  const data = await getData(process.env.GOOGLE_TREND_URL);
  // console.log(data.default.trendingSearchesDays);

  return (
    <>
      <div className='flex justify-center'>hello trend.</div>
    </>
  )
}
 