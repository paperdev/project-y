export default function ComponentPlayer({
  videoId: videoId,
}: {
  videoId: string;
}) {
  return (
    <>
      <div className='aspect-video'>
        <iframe
          className='h-full w-full rounded-lg'
          src={process.env.YOUTUBE_URL_EMBED + videoId}
          loading='lazy'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
          allowFullScreen
          sandbox='allow-scripts allow-same-origin allow-presentation'
          // referrerPolicy='strict-origin-when-cross-origin'
        ></iframe>
      </div>
    </>
  );
}
