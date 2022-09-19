import {useInfiniteQuery} from '@tanstack/react-query';
import APIService from '../api/APIService';
import {IQueryParams} from '../interfaces';

export default (params: IQueryParams) => {
  const {key, path, params: queryParams, queryConfig} = params;

  return useInfiniteQuery({
    queryKey: key,
    queryFn: async ({pageParam = 1}) => {
      try {
        const {
          data: {articles},
        } = await APIService.get(path, {
          params: {...queryParams, page: pageParam, pageSize: 20},
        });
        return {articles, nextPage: pageParam + 1};
      } catch (e) {
        return {error: e};
      }
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    cacheTime: 1000 * 60,
    ...queryConfig,
    select: data => ({
      pages: [...data.pages.map(page => page.articles).flat(1)],
      pageParams: data.pageParams,
    }),
  });
};
