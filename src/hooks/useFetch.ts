import {useInfiniteQuery} from '@tanstack/react-query';
import APIService from '../api/APIService';
import {IQueryParams} from '../interfaces';

export default (params: IQueryParams) => {
  const {method, key, path, params: queryParams, queryConfig} = params;

  return useInfiniteQuery({
    queryKey: key,
    queryFn: async ({pageParam = 1}) => {
      const {
        data: {articles},
      } = await APIService[method || 'get'](path, {
        params: {...queryParams, page: pageParam, pageSize: 20},
      });
      return {articles, nextPage: pageParam + 1};
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    cacheTime: 1000 * 60,
    ...queryConfig,
    select: (data) => (data.pages.map((page) => page.articles).flat(1))
  });
};
