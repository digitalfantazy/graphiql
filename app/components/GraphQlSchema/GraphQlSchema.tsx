import { useTranslation } from 'react-i18next';
import styles from './GraphQlSchema.module.css';

export default function GraphQlSchema({ schema, isError }: { schema: string; isError: boolean }) {
  const { t } = useTranslation('common');
  return (
    <section className={styles.schemaSection}>
      <h2 className={styles.title}>{t('schema')}</h2>
      {isError ? (
        <p>{t('schema_not_found')}</p>
      ) : (
        <textarea className={styles.textarea} value={schema} rows={20} cols={70} readOnly />
      )}
    </section>
  );
}
