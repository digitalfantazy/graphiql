import { RowElement } from '../components/RestFormEditor/types';

interface Args {
  type: 'url' | 'body' | 'headers';
  value: string | RowElement[];
}

export default function updateGraphUrl({ type, value }: Args): void {
  const [empty, lang, method, url, body] = window.location.pathname.split('/');
  let headers = window.location.search.slice(1);

  const newLang = lang || 'en';
  const newMethod = method || 'GRAPHQL';
  let newUrl = url || '';
  let newBody = body || '';

  if (type === 'url') newUrl = btoa(value as string);
  if (type === 'body') newBody = btoa(value as string);
  if (type === 'headers') {
    const newHeaders = value as RowElement[];
    headers = newHeaders
      .map((header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
      .join('&');
  }

  const updatedUrl = `${[empty, newLang, newMethod, newUrl, newBody].join('/')}${
    headers && headers !== '=' ? `?${headers}` : ''
  }`;

  window.history.replaceState(
    null,
    '',
    updatedUrl.endsWith('/') ? updatedUrl.slice(0, -1) : updatedUrl
  );
}
