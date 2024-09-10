import { RowElement } from '../components/RestFormEditor/types';

type RequestProps = {
  method: string;
  url: string;
  headers: RowElement[];
  variables: RowElement[];
  body: string;
};

export default function makeRestPath({
  method,
  url,
  headers,
  variables,
  body,
}: RequestProps): string {
  let tempUrl = url;
  let tempHeaders = headers.slice();
  let tempBody = body;

  variables.forEach((v) => {
    const variable = `{{${v.key}}}`;
    tempUrl = tempUrl.replaceAll(variable, v.value);
    tempBody = tempBody.replaceAll(variable, v.value);
    tempHeaders = JSON.parse(
      JSON.stringify(tempHeaders).replaceAll(variable, v.value)
    ) as RowElement[];
  });

  const encodedURL = btoa(tempUrl);
  if (method.toLowerCase() === 'get') return `/${method}/${encodedURL}`;

  const encodedBody = btoa(tempBody.replace(/\s+/g, ''));

  const encodedHeaders = tempHeaders
    .map((header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
    .join('&');

  return `/${method}/${encodedURL}${encodedBody ? `/${encodedBody}` : ''}${encodedHeaders !== '=' ? `?${encodedHeaders}` : ''}`;
}
