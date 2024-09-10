'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import { ChangeEvent } from 'react';
import styles from './LanguageSelect.module.css';

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push(`/${newLocale}${currentPathname}`);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <select onChange={handleChange} value={currentLocale} className={styles.select}>
      <option value="en">En</option>
      <option value="ru">Ru</option>
    </select>
  );
}
