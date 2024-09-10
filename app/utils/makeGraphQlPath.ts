import { RowElement } from '../components/RestFormEditor/types';

type RequestProps = {
  url: string;
  query: string;
  variables: string;
  headers: RowElement[];
};

type VariableType = { [key: string]: string };

export default function makeGraphQlPath({ url, query, variables, headers }: RequestProps): string {
  let tempUrl = url;
  let tempQuery = query;
  let tempHeaders = headers.slice();

  if (variables) {
    const varsObject = JSON.parse(variables) as VariableType;

    Object.keys(varsObject).forEach((key) => {
      const variable = `{{${key}}}`;
      const varValue = varsObject[key];
      tempUrl = tempUrl.replaceAll(variable, varValue);
      tempQuery = tempQuery.replaceAll(variable, varValue);
      tempHeaders = JSON.parse(
        JSON.stringify(tempHeaders).replaceAll(variable, varValue)
      ) as RowElement[];
    });
  }

  const encodedURL = btoa(tempUrl);
  const encodedQuery = btoa(
    JSON.stringify({
      query: tempQuery,
      variables: variables ? (JSON.parse(variables) as VariableType) : {},
    })
  );

  const encodedHeaders = tempHeaders
    .map((header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
    .join('&');

  return `/GRAPHQL/${encodedURL}/${encodedQuery}${encodedHeaders !== '=' ? `?${encodedHeaders}` : ''}`;
}
