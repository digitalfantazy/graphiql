import { UrlParams } from '@/app/utils/globalTypes';
import { notFound } from 'next/navigation';
import RestPage from './[...slug]/page';

export default function Rest({ params, searchParams }: UrlParams) {
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
  if (!methods.includes(params.rest)) notFound();

  return <RestPage params={params} searchParams={searchParams} />;
}
