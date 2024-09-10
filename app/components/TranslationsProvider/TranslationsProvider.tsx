'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/services/internationalization/i18n';
import { createInstance, Resource } from 'i18next';
import { ReactNode, useState } from 'react';
import styles from './TranslationsProvider.module.css';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}) {
  const [error, setError] = useState<Error | null>(null);

  const [i18n] = useState(() => {
    const instance = createInstance();

    initTranslations(locale, namespaces, instance, resources).catch((e) => {
      const newError = e as Error;
      setError(newError);
    });

    return instance;
  });

  return (
    <>
      {error && <p className={styles.errorMsg}>{error.message}</p>}
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </>
  );
}
