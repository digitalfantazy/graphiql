'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME } from './config';

function logOutAction(locale: string) {
  cookies().delete(COOKIE_NAME);

  redirect(`/${locale}/`);
}

export default logOutAction;
