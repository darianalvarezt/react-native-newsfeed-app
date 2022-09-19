import useFetch from './useFetch';
import {IQuery} from '../interfaces';

export default (params: IQuery) => {
  const {q, language} = params;
  return useFetch({
    key: ['newsfeed', q, language],
    path: '/v2/everything/',
    params,
    queryConfig: {
      enabled: !!params,
    },
  });
};
