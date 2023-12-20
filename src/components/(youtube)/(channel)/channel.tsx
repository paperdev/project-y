import React from 'react';
import {
  Card,
  CardBody,
  Image,
} from '@nextui-org/react';
import { iChannelItem } from '@/shared/interface/channel';

export default function ComponentChannel({
  dataChannel,
}: {
  dataChannel: iChannelItem;
}) {
  return (
    <>
      <Card
        isBlurred
        shadow='sm'
      >
        <CardBody>
          <div className='flex flex-row gap-10 justify-center'>
            <div className='flex flex-col items-center'>
              <Image src={dataChannel.snippet.thumbnails.default.url} />
              <div className='text-primary-500'>
                {dataChannel.snippet.customUrl}
              </div>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <div className='flex flex-col'>
                <div>
                  subscriber Count:
                </div>
                <div>
                  view Count:
                </div>
                <div>
                  video Count:
                </div>
                <div>
                  register Date:
                </div>
              </div>

              <div className='text-primary-500'>
                <div>
                  {dataChannel.statistics.subscriberCount}
                </div>
                <div>
                  {dataChannel.statistics.viewCount}
                </div>
                <div>
                  {dataChannel.statistics.videoCount}
                </div>
                <div>
                  {dataChannel.snippet.publishedAt}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
