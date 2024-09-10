import { JSX, PropsWithChildren, useEffect, useState } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import logOutAction from '@/app/services/firebase/logOutAction';
import { auth } from '../../../services/firebase/config';
import styles from './ProtectedRoute.module.css';

const ProtectedRoute = (
  Component: (props: PropsWithChildren) => JSX.Element,
  type: 'withAuth' | 'withoutAuth'
) => {
  function AuthenticatedComponent(props: PropsWithChildren) {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    const { t } = useTranslation('sign');

    useEffect(() => {
      const unsubscribe = onIdTokenChanged(auth, (user) => {
        if (user && type === 'withAuth') {
          setIsAuth(true);
        } else if (!user && type === 'withoutAuth') {
          setIsAuth(true);
        } else if (user && type === 'withoutAuth') {
          router.replace(`/${window.location.pathname.split('/')[1]}/`);
        } else {
          logOutAction(window.location.pathname.split('/')[1]);
        }
      });

      return unsubscribe;
    }, [router]);

    if (isAuth) return <Component {...props} />;

    return (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{t('checking_auth')}</h3>
      </div>
    );
  }

  return AuthenticatedComponent;
};

export default ProtectedRoute;
