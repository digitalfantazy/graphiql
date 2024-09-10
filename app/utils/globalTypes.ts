import { RowElement } from '../components/RestFormEditor/types';

export type UrlParams = {
  params: {
    slug: string | string[];
    locale: string;
    rest: string;
  };
  searchParams: { [key: string]: string };
};

export type Query = {
  id: string;
  type: 'rest' | 'graphql';
  method: string;
  url: string;
  encodedUrl: string;
  headers: RowElement[];
  variables: RowElement[];
  body: string;
  sdlUrl: string;
  jsonVariables: string;
};

export type RouteParams = Pick<UrlParams, 'params'>;
