import { iSearchItem } from '@/shared/interface/searchItem';
import { getTrendList } from '@/utils/request';
import ComponentItem from '@/components/(trend)/item';

export default async function Page() {
  const resData = await getTrendList('US');
  // const endDateForNextRequest = resData.default.endDateForNextRequest;
  const trendingSearchesDays = resData.default.trendingSearchesDays;
  const trendingSearches = trendingSearchesDays[0].trendingSearches;

  return (
    <>
      <ComponentItem dataItem={trendingSearches} />
    </>
  );
}
