import { redirect } from 'next/navigation';
import { UrlParams } from './globalTypes';

export type RequestArgs = UrlParams & {
  type: 'rest' | 'graphql';
};

export default async function makeRequest({ params, searchParams, type }: RequestArgs) {
  let status = '';
  let data = '';
  let errorMsg = '';
  const fetchParams = params.slug;

  if (fetchParams && fetchParams.length > 2) redirect('/wrong-request-structure');

  if (fetchParams && fetchParams.length) {
    try {
      let method;
      if (type === 'rest') method = params.rest;
      if (type === 'graphql') method = 'POST';

      const url = atob(decodeURIComponent(fetchParams[0]));
      const body = fetchParams[1] ? atob(decodeURIComponent(fetchParams[1])) : null;
      const headers = searchParams || null;

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      data = JSON.stringify(await response.json());
      status = `${String(response.status)} ${response.statusText}`;
    } catch (error) {
      const err = error as Error;
      errorMsg = `${err.name} ${err.message} ${String(err.cause)}`;
    }
  }

  return { data, status, errorMsg };
}
