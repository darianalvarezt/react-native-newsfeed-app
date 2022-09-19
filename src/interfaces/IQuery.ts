export default interface IQuery {
  q: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  searchIn?: 'title' | 'description' | 'content';
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  from?: Date;
  to?: Date;
  pageSize?: number;
  page?: number;
};
