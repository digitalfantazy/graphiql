import Image from 'next/image';
import styles from './ResponseSection.module.css';

interface Props {
  data: string;
  status: string;
  errorMsg: string;
  t: (key: string) => string;
}

export default function ResponseSection({ data, status, errorMsg, t }: Props) {
  if (errorMsg) {
    return (
      <section className={styles.responseSection}>
        <h2 className={styles.errorTitle}>{t('could_not_send_request')}</h2>
        <Image
          className={styles.errorImg}
          src="/images/request-error.png"
          alt={t('request_error_picture') || ''}
          width={200}
          height={200}
        />
        <p className={styles.errorMessage}>{errorMsg}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={styles.responseSection}>
        <h2 className={styles.title}>{t('response')}</h2>
        <p className={styles.text}>{t('send_your_request')}</p>
      </section>
    );
  }

  const value = JSON.stringify(JSON.parse(data), undefined, 2);
  const statusClassName = status.startsWith('2') ? `${styles.goodReq}` : `${styles.badReq}`;

  return (
    <section className={styles.responseSection}>
      <h2 className={styles.title}>{t('response')}</h2>
      <p className={statusClassName}>
        {t('status')}: {status}
      </p>
      <textarea className={styles.textarea} value={value} rows={10} cols={36} readOnly />
    </section>
  );
}
