'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { onIdTokenChanged, signOut } from 'firebase/auth';
import { auth } from '@/app/services/firebase/config';
import logOutAction from '@/app/services/firebase/logOutAction';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import styles from './Header.module.css';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

export default function Header({ hasToken }: { hasToken: boolean }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setIsAuth(Boolean(user));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <Link className={styles.navLogo} href="/">
            <Image
              src="/images/logo.svg"
              className={styles.logoImg}
              alt="App logo"
              width={38}
              height={38}
            />
          </Link>
          <nav className={styles.nav}>
            {!isAuth && !hasToken ? (
              <>
                <Link href="/sign-in" className="buttonLink">
                  {t('sign_in')}
                </Link>
                <Link href="/sign-up" className="buttonLink">
                  {t('sign_up')}
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="buttonLink"
                onClick={async () => {
                  await signOut(auth);
                  localStorageApi.deleteUserName();
                  logOutAction(window.location.pathname.split('/')[1]);
                }}
              >
                {t('sign_out')}
              </button>
            )}
            <LanguageSelect />
          </nav>
        </div>
      </div>
    </header>
  );
}
