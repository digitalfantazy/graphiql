import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TableEditor.module.css';
import { RowElement } from '../RestFormEditor/types';

const titleTranslationMap: { [key: string]: string } = {
  headers: 'header',
  заголовки: 'header',
  variables: 'variable',
  переменные: 'variable',
};

export interface TableProps {
  title: string;
  data: RowElement[];
  handleAddData: () => void;
  handleChangeData: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  handleRemoveData: (id: number) => void;
  handleFocusOut: () => void;
}

function TableEditor({
  title,
  data,
  handleAddData,
  handleChangeData,
  handleRemoveData,
  handleFocusOut,
}: TableProps) {
  const tableTitle = `${title[0].toUpperCase()}${title.slice(1)}`;

  const { t } = useTranslation('common');
  const key = titleTranslationMap[title];

  return (
    <div className={styles.tableEditor}>
      <h2 className={styles.title}>{tableTitle}</h2>
      <table className={styles.table} onBlur={handleFocusOut}>
        <tbody>
          <tr>
            <td>{t('key')}</td>
            <td colSpan={2}>{t('value')}</td>
          </tr>
          {data.map((el) => (
            <tr key={el.id}>
              <td>
                <input
                  type="text"
                  name="key"
                  value={el.key}
                  onChange={(e) => handleChangeData(e, el.id)}
                  placeholder={t('key')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="value"
                  value={el.value}
                  onChange={(e) => handleChangeData(e, el.id)}
                  placeholder={t('value')}
                />
              </td>
              <td>
                <button
                  className={styles.removeBtn}
                  type="button"
                  onClick={() => handleRemoveData(el.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addBtn} type="button" onClick={handleAddData}>
        {t('add', { item: t(key) })}
      </button>
    </div>
  );
}

export default TableEditor;
