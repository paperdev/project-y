import ComponentVideo from '@/components/(youtube)/video';
import { getYoutubeList } from '@/utils/request';

export default async function Page() {
  const dataYoutube = await getYoutubeList();

  return (
    <>
      <ComponentVideo 
      dataVideo={dataYoutube.items} 
      nextPageToken={dataYoutube.nextPageToken}
      totalResults={dataYoutube.pageInfo.totalResults}
      />
    </>
  );
}
