import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './JsonEditor.module.css';

interface Props {
  title: string;
  value: string;
  name: string;
  rows: number;
  cols: number;
  placeholder: string;
  handleChangeValue: (value: string) => void;
  handleFocusOut: () => void;
}

export default function JsonEditor({
  title,
  value,
  rows,
  cols,
  name,
  placeholder,
  handleChangeValue,
  handleFocusOut,
}: Props) {
  const [isJSON, setIsJSON] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { t } = useTranslation('common');

  const handlePrettify = (): void => {
    const textareaValue = textareaRef.current?.value || '';

    try {
      const uglyJSON = JSON.parse(textareaValue) as object;
      const prettyJSON = JSON.stringify(uglyJSON, undefined, 2);

      setError(null);
      handleChangeValue(prettyJSON);
    } catch (e) {
      const newError = e as Error;
      setError(newError);
    }
  };

  return (
    <div className={styles.jsonEditor}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.wrapper}>
        <div className={styles.textareaWrapper}>
          <textarea
            ref={textareaRef}
            value={value}
            rows={rows}
            cols={cols}
            name={name}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeValue(e.target.value)}
            onBlur={handleFocusOut}
          />
          {error && <p className={styles.errorMsg}>{error.message}</p>}
        </div>
        <div className={styles.controlWrapper}>
          {title === t('body') && (
            <select
              onChange={() => {
                setError(null);
                setIsJSON(!isJSON);
              }}
            >
              <option value="JSON">JSON</option>
              <option value="Text">{t('text')}</option>
            </select>
          )}
          {isJSON && (
            <button type="button" onClick={handlePrettify}>
              {t('prettify')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
