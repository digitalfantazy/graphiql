'use client';

import { ChangeEvent, FormEvent, PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import makeRestPath from '@/app/utils/makeRestPath';
import { Query } from '@/app/utils/globalTypes';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import useLocalStorage from '@/app/services/localStorageApi/useLocalStorage';
import { addEmptyRow, changeRow, removeRow } from '@/app/utils/tableEditorHelpers';
import { useTranslation } from 'react-i18next';
import { RowElement } from './types';
import styles from '../shared/editForm.module.css';
import MethodEditor from '../MethodEditor/MethodEditor';
import TableEditor from '../TableEditor/TableEditor';
import ControlledInput from '../ControlledInput/ControlledInput';
import ToggledTableEditor from '../ToggledTableEditor/ToggledTableEditor';
import BodyEditor from '../JsonEditor/JsonEditor';
import Loader from '../Loader/Loader';

export default function RestFormEditor({ children }: PropsWithChildren) {
  const initData = useLocalStorage();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [method, setMethod] = useState(initData.method);
  const [endpointUrl, setEndpointUrl] = useState(initData.url);
  const [headers, setHeaders] = useState<RowElement[]>(initData.headers);
  const [variables, setVariables] = useState<RowElement[]>(initData.variables);
  const [body, setBody] = useState(initData.body);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (initData.type !== 'rest') return;

    setMethod(initData.method);
    setEndpointUrl(initData.url);
    setHeaders(initData.headers);
    setVariables(initData.variables);
    setBody(initData.body);
  }, [initData]);

  const handleFocusOut = (): void => {
    const path = makeRestPath({ method, url: endpointUrl, headers, variables, body });
    window.history.replaceState(null, '', `/${window.location.pathname.split('/')[1]}${path}`);
  };

  const handleChangeMethod = (value: string): void => {
    const path = makeRestPath({ method: value, url: endpointUrl, headers, variables, body });
    window.history.replaceState(null, '', `/${window.location.pathname.split('/')[1]}${path}`);

    setMethod(value);
  };

  const handleChangeEndpointUrl = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim();
    setEndpointUrl(value);

    const path = makeRestPath({ method, url: value, headers, variables, body });
    window.history.replaceState(null, '', `/${window.location.pathname.split('/')[1]}${path}`);
  };

  const handleAddHeader = () => addEmptyRow(setHeaders, headers);
  const handleRemoveHeader = (id: number) => removeRow(setHeaders, headers, id);
  const handleChangeHeader = (e: ChangeEvent<HTMLInputElement>, id: number) =>
    changeRow(e, id, setHeaders, headers);

  const handleAddVariables = () => addEmptyRow(setVariables, variables);
  const handleRemoveVariables = (id: number) => removeRow(setVariables, variables, id);
  const handleChangeVariables = (e: ChangeEvent<HTMLInputElement>, id: number) =>
    changeRow(e, id, setVariables, variables);

  const handleChangeBody = (value: string): void => setBody(value);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const path = makeRestPath({ method, url: endpointUrl, headers, variables, body });
    router.push(path);
    setLoader(true);
    setTimeout(() => setLoader(false), 1000);

    const newQuery = {
      id: crypto.randomUUID(),
      type: 'rest',
      method,
      url: endpointUrl,
      encodedUrl: path,
      headers,
      variables,
      body,
      sdlUrl: '',
      jsonVariables: '',
    } satisfies Query;

    localStorageApi.saveQuery(newQuery);
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.submitWrapper}>
          <MethodEditor method={method} handleChangeMethod={handleChangeMethod} />
          <ControlledInput
            className=""
            labelName=""
            labelClassName=""
            id=""
            name="endpointUrl"
            value={endpointUrl}
            placeholder={t('search_placeholder')}
            handleChange={handleChangeEndpointUrl}
          />
          <button type="button" onClick={handleSubmit} disabled={Boolean(!endpointUrl)}>
            {t('send')}
          </button>
        </div>
        <TableEditor
          title={t('headers')}
          data={headers}
          handleAddData={handleAddHeader}
          handleChangeData={handleChangeHeader}
          handleRemoveData={handleRemoveHeader}
          handleFocusOut={handleFocusOut}
        />
        <BodyEditor
          title={t('body')}
          value={body}
          rows={8}
          cols={30}
          name="bodyEditor"
          placeholder={t('body_placeholder')}
          handleChangeValue={handleChangeBody}
          handleFocusOut={handleFocusOut}
        />
        <ToggledTableEditor
          title={t('variables')}
          data={variables}
          handleAddData={handleAddVariables}
          handleChangeData={handleChangeVariables}
          handleRemoveData={handleRemoveVariables}
          handleFocusOut={() => {}}
        />
        {loader && <Loader />}
      </form>
      {children}
    </>
  );
}
