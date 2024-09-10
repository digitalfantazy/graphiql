import { cookies } from 'next/headers';
import { COOKIE_NAME } from './config';

export default function getAuthToken(): string | undefined {
  const authToken = cookies().get(COOKIE_NAME)?.value;
  return authToken;
}
