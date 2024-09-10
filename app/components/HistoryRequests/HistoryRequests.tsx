'use client';

import { useEffect, useState } from 'react';
import { Query } from '@/app/utils/globalTypes';
import Link from 'next/link';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import { useTranslation } from 'react-i18next';
import styles from './HistoryRequests.module.css';

export default function HistoryRequests() {
  const [requests, setRequests] = useState<Query[] | null | 'loading'>('loading');

  const { t } = useTranslation(['history', 'main']);

  useEffect(() => {
    const lsRequests = localStorageApi.getAllQueries();
    setRequests(lsRequests);
  }, []);

  if (requests === 'loading') {
    return <p className={styles.loading}>{t('loading')}</p>;
  }

  if (!requests)
    return (
      <div className={styles.emptyContent}>
        <p>{t('no_requests')}</p>
        <p>{t('try_options')}</p>
        <div className={styles.pageLinksWrapper}>
          <Link href="/GET" className={`buttonLink ${styles.pageLink}`}>
            {t('main:rest_btn')}
          </Link>
          <Link href="/GRAPHQL" className={`buttonLink ${styles.pageLink}`}>
            {t('main:graphiql_btn')}
          </Link>
        </div>
      </div>
    );

  return (
    <ul className={styles.historyList}>
      {requests.map((req) => (
        <li key={req.id} className={styles.historyElement}>
          <Link
            href={`${req.type === 'rest' ? req.method : 'GRAPHQL'}`}
            className={styles.historyLink}
            onClick={() => localStorageApi.saveRestoreQuery(req)}
          >
            <span className={styles.method}>{req.type === 'rest' ? req.method : 'GRAPHQL'}</span>
            <span className={styles.url}>{req.url}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
