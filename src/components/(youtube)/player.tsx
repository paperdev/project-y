import { IonRippleEffect, IonSpinner, IonThumbnail } from '@ionic/react';
import { useEffect, useState } from 'react';

const PlayerThumbnail = ({
  url,
  onClick,
}: {
  url: string;
  onClick: any;
}) => {

  return (
    <IonThumbnail 
      className='w-full h-full ion-activatable flex items-center justify-center overflow-hidden rounded-xl'
      onClick={onClick}
    >
      <img src={url} />
      <IonRippleEffect type='bounded' />
    </IonThumbnail>
  )
}

const PlayerContent = ({
  videoId,
  onLoad,
}: {
  videoId: string | undefined;
  onLoad: any;
}) => {
  console.log(`${process.env.YOUTUBE_URL_PLAYER}${JSON.stringify({videoId_s: videoId, autoplay: 1})}`);
  return (
    <>
      {videoId && (
        <iframe
          onLoad={onLoad}
          className='h-full w-full rounded-lg invisible'
          src={`${process.env.YOUTUBE_URL_PLAYER}${JSON.stringify({videoId_s: videoId, autoplay: 1})}`}
          loading='lazy'
          allow='autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
          allowFullScreen
          sandbox='allow-scripts allow-same-origin allow-presentation'
        />
      )}
    </>
  )
}

export default function ComponentPlayer({
  videoId,
  thumbnailURL
}: {
  videoId: string | undefined;
  thumbnailURL?: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!thumbnailURL) {
      setIsLoading(false);
      setIsVisible(true);
      setIsReady(true);
    }
  }, [])
  
  const onClick = () => {
    setIsLoading(true);
    setIsVisible(true);
    setIsReady(false);
  }

  const onLoad = (event: React.SyntheticEvent) => {
    if (event.currentTarget) {
      event.currentTarget.classList.remove('invisible');
    }
    setIsLoading(false);
    setIsReady(true);
    setIsVisible(true);
  }

  return (
    <>
      <div className='relative aspect-video'>
        {
          isLoading && thumbnailURL && <PlayerThumbnail url={thumbnailURL} onClick={onClick} />
        }
        {
          (isVisible && !isReady) && <IonSpinner color={'primary'} name='circular' className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
        }
        
        {
          isVisible &&
            <div className='absolute w-full h-full'>
              <PlayerContent videoId={videoId} onLoad={onLoad}/>
            </div>
        }
      </div>
    </>
  );
}
