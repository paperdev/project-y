import { IonIcon, IonText } from '@ionic/react';
import { cloudDownload, cloudDownloadOutline } from 'ionicons/icons';

const CIRCUMFERENCE = 50 * 2 * Math.PI;
const STROKE_WIDTH = 10;
const CIRCLE_R = 50;
const CIRCLE_CX = 60;
const CIRCLE_CY = 60;
const PERCENT_MAX = 100;

function ComponentProgressCircle({ percent }: { percent: number }) {
  return (
    <>
      <div className='flex items-center justify-center flex-wrap rounded-2xl shadow-xl'>
        <div className='flex items-center justify-center -m-6 overflow-hidden rounded-full bg-white'>
          <svg className='w-32 h-32 transform translate-x-1 translate-y-1'>
            <circle
              className='text-gray-300'
              strokeWidth={STROKE_WIDTH}
              stroke='currentColor'
              fill='transparent'
              r={CIRCLE_R}
              cx={CIRCLE_CX}
              cy={CIRCLE_CY}
            />
            <circle
              className='text-blue-600'
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={
                CIRCUMFERENCE - (percent / PERCENT_MAX) * CIRCUMFERENCE
              }
              strokeLinecap='round'
              stroke='currentColor'
              fill='transparent'
              r={CIRCLE_R}
              cx={CIRCLE_CX}
              cy={CIRCLE_CY}
            />
          </svg>

          <span className='absolute text-2xl text-blue-700'>{percent}</span>
        </div>
      </div>
    </>
  );
}

function ComponentProgressBar({
  percent,
  showProgress,
  isDownloaded,
  onClick,
}: {
  percent: number;
  showProgress: boolean;
  isDownloaded: boolean;
  onClick: any;
}) {
  return (
    <>
      <div className='ion-button rounded-xl shadow-sm p-1 w-full h-12 border border-blue-500 cursor-pointer' onClick={onClick}>
        <div className='relative h-full flex items-center justify-center'>
          <div className={`absolute top-0 bottom-0 left-0 rounded-xl bg-blue-500`} style={{width : `${percent}%`}}></div>
          {
            showProgress
              ? <IonText color='medium' className='relative font-bold'>{percent}%</IonText>
              : <IonIcon color='primary' size='large' icon={isDownloaded ? cloudDownload : cloudDownloadOutline}></IonIcon>
          }
        </div>
      </div>
    </>
  );
}

export {
  ComponentProgressCircle,
  ComponentProgressBar,
};
