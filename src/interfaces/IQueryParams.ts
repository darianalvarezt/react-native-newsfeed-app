import IQuery from './IQuery';

export default interface IQueryParams {
  method?: string;
  key: unknown[];
  path: string;
  params: IQuery;
  queryConfig: object;
}
