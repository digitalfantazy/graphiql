import { ChangeEvent, useRef, useState } from 'react';
import gqlPrettier from 'graphql-prettier';
import { useTranslation } from 'react-i18next';
import styles from './QueryEditor.module.css';

interface Props {
  value: string;
  name: string;
  rows: number;
  cols: number;
  placeholder: string;
  handleChangeQuery: (value: string) => void;
  handleFocusOut: () => void;
}

export default function QueryEditor({
  value,
  rows,
  cols,
  name,
  placeholder,
  handleChangeQuery,
  handleFocusOut,
}: Props) {
  const [error, setError] = useState<Error | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { t } = useTranslation('common');

  const handlePrettifyBody = (): void => {
    let textareaValue = textareaRef.current?.value || '';

    try {
      textareaValue = gqlPrettier(textareaValue);
      setError(null);
    } catch (e) {
      const newError = e as Error;
      setError(newError);
    }

    handleChangeQuery(textareaValue);
  };

  return (
    <div className={styles.queryEditor}>
      <h2 className={styles.title}>{t('query')}</h2>
      <div className={styles.wrapper}>
        <div>
          <textarea
            ref={textareaRef}
            value={value}
            rows={rows}
            cols={cols}
            name={name}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeQuery(e.target.value)}
            onBlur={handleFocusOut}
          />
          {error && <p className={styles.errorMsg}>{error.message}</p>}
        </div>
        <button type="button" onClick={handlePrettifyBody}>
          {t('prettify')}
        </button>
      </div>
    </div>
  );
}
