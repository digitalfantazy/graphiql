'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME } from './config';

function setCookies(token: string, locale: string) {
  const config = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    domain: process.env.HOST ?? 'localhost',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  cookies().set(COOKIE_NAME, token, config);
  redirect(`/${locale}/`);
}

export default setCookies;
