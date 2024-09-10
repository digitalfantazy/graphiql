'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './page.module.css';

export default function NotFoundPage() {
  const { t } = useTranslation(['not-found']);

  return (
    <div className={styles.notFound}>
      <h1>{t('not_found')}</h1>
      <p>{t('page_does_not_exist')}</p>
      <Link href="/" className="buttonLink">
        {t('go_back_home')}
      </Link>
    </div>
  );
}
