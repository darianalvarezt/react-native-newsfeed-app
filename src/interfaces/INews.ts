import IArticle from './IArticle';

export default interface INews {
  status: string;
  totalResults: number;
  articles: IArticle[];
};
