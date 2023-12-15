import ComponentProfile from '@/components/(about)/profile';
import React from 'react';
import { profile } from '@/shared/data/profile';
import { Card, CardBody, CardHeader, Spacer } from '@nextui-org/react';

export default function Page() {
  return (
    <>
      <Card isFooterBlurred radius='lg' className='border-none'>
        <CardHeader>
         <div className='flex justify-center mx-auto font-extrabold text-secondary-500'>
            Developer
          </div>
        </CardHeader>
        <CardBody>
          <ComponentProfile className='' dataProfile={profile} />
        </CardBody>
      </Card>
    </>
  );
}
