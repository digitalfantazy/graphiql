import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TableEditor, { TableProps } from '../TableEditor/TableEditor';
import styles from './ToggledTableEditor.module.css';

export default function ToggledTableEditor({
  title,
  data,
  handleAddData,
  handleChangeData,
  handleRemoveData,
  handleFocusOut,
}: TableProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation('common');

  const wrapperClassName = isVisible
    ? `${styles.variablesWrapper} ${styles.visible}`
    : styles.variablesWrapper;

  return (
    <div>
      <button
        className={styles.visibilityBtn}
        type="button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? `${t('close')} ${title}` : `${t('manage')} ${title}`}
      </button>
      <div className={wrapperClassName}>
        {title === t('variables') ? (
          <p className={styles.warningMsg}>
            {t('use_variable')}
            <span className={styles.accentMsg}>{` {{variable_key}}`}</span>
          </p>
        ) : (
          <br />
        )}
        <TableEditor
          title={title}
          data={data}
          handleAddData={handleAddData}
          handleChangeData={handleChangeData}
          handleRemoveData={handleRemoveData}
          handleFocusOut={handleFocusOut}
        />
      </div>
    </div>
  );
}
