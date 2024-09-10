'use client';

import { ChangeEvent, FormEvent, PropsWithChildren, useEffect, useState } from 'react';
import useLocalStorage from '@/app/services/localStorageApi/useLocalStorage';
import { addEmptyRow, changeRow, removeRow } from '@/app/utils/tableEditorHelpers';
import makeGraphQlPath from '@/app/utils/makeGraphQlPath';
import { useRouter } from 'next/navigation';
import { Query } from '@/app/utils/globalTypes';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import { useTranslation } from 'react-i18next';
import updateGraphUrl from '@/app/utils/updateGraphUrl';
import { RowElement } from '../RestFormEditor/types';
import selfStyles from './GraphiQLFormEditor.module.css';
import styles from '../shared/editForm.module.css';
import ControlledInput from '../ControlledInput/ControlledInput';
import QueryEditor from '../QueryEditor/QueryEditor';
import VariablesEditor from '../JsonEditor/JsonEditor';
import ToggledTableEditor from '../ToggledTableEditor/ToggledTableEditor';
import GraphQlSchema from '../GraphQlSchema/GraphQlSchema';
import Loader from '../Loader/Loader';

export default function GraphiQLFormEditor({ children }: PropsWithChildren) {
  const initData = useLocalStorage();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [endpointUrl, setEndpointUrl] = useState(initData.url);
  const [sdlUrl, setSdlUrl] = useState(initData.sdlUrl || `${endpointUrl}?sdl`);
  const [query, setQuery] = useState(initData.body);
  const [variables, setVariables] = useState(initData.jsonVariables || '');
  const [headers, setHeaders] = useState<RowElement[]>(initData.headers);

  const [schema, setSchema] = useState('');
  const [isSchemaError, setIsSchemaError] = useState(true);

  const [isValidVars, setIsValidVars] = useState(true);
  const [isVisibleVarEditor, setIsVisibleVarEditor] = useState(false);

  const { t } = useTranslation('common');

  useEffect(() => {
    if (initData.type !== 'graphql') return;

    setEndpointUrl(initData.url);
    setSdlUrl(initData.sdlUrl);
    setQuery(initData.body);
    setVariables(initData.jsonVariables);
    setHeaders(initData.headers);

    if (initData.sdlUrl.length && window.location.pathname !== '/GRAPHQL') {
      fetch(initData.sdlUrl)
        .then((res) => res.text())
        .then((data) => {
          if (!data.startsWith('<!')) {
            setSchema(data);
            setIsSchemaError(false);
          }
        })
        .catch(() => setIsSchemaError(true));
    }
  }, [initData]);

  const wrapperClassName = isVisibleVarEditor
    ? `${selfStyles.variablesWrapper} ${selfStyles.visible}`
    : selfStyles.variablesWrapper;

  const handleChangeEndpointUrl = (e: ChangeEvent<HTMLInputElement>): void => {
    const endpoint = e.target.value.trim();
    updateGraphUrl({ type: 'url', value: endpoint });

    setEndpointUrl(endpoint);
    setSdlUrl(`${endpoint}?sdl`);
  };

  const handleChangeSdlUrl = (e: ChangeEvent<HTMLInputElement>): void =>
    setSdlUrl(e.target.value.trim());

  const handleChangeQuery = (value: string): void => setQuery(value);

  const handleChangeVariables = (value: string): void => {
    setVariables(value);
    setIsValidVars(true);
  };

  const handleAddHeader = () => addEmptyRow(setHeaders, headers);
  const handleRemoveHeader = (id: number) => removeRow(setHeaders, headers, id);
  const handleChangeHeader = (e: ChangeEvent<HTMLInputElement>, id: number) =>
    changeRow(e, id, setHeaders, headers);

  const handleFocusOutQuery = (): void => updateGraphUrl({ type: 'body', value: query });

  const handleFocusOutHeader = (): void => updateGraphUrl({ type: 'headers', value: headers });

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    try {
      const path = makeGraphQlPath({ url: endpointUrl, query, headers, variables });
      router.push(path);
      setLoader(true);
      setTimeout(() => setLoader(false), 1000);

      const newQuery = {
        id: crypto.randomUUID(),
        type: 'graphql',
        method: 'POST',
        url: endpointUrl,
        encodedUrl: path,
        headers,
        variables: [],
        body: query,
        sdlUrl,
        jsonVariables: variables,
      } satisfies Query;

      localStorageApi.saveQuery(newQuery);
    } catch {
      setIsValidVars(false);
    }
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.submitWrapper}>
          <ControlledInput
            className=""
            labelName={t('endpoint_url')}
            labelClassName={selfStyles.labelInput}
            id="graphEndpointUrl"
            name="endpointUrl"
            value={endpointUrl}
            placeholder={t('search_placeholder')}
            handleChange={handleChangeEndpointUrl}
          />
          <button
            className={styles.submitBtn}
            type="button"
            onClick={handleSubmit}
            disabled={Boolean(!endpointUrl) || !isValidVars}
          >
            {t('send')}
          </button>
        </div>
        {!isValidVars && <p className={selfStyles.errorMsg}>{t('invalid_json')}</p>}
        <div className={styles.sdlInputWrapper}>
          <ControlledInput
            className=""
            labelName="SDL URL: "
            labelClassName={selfStyles.labelInput}
            id="graphSdlUrl"
            name="sdlUrl"
            value={sdlUrl}
            placeholder={t('enter_sdl_url_placeholder')}
            handleChange={handleChangeSdlUrl}
          />
        </div>
        <QueryEditor
          value={query}
          rows={10}
          cols={30}
          name="queryEditor"
          placeholder={t('use_graphql_syntax')}
          handleChangeQuery={handleChangeQuery}
          handleFocusOut={handleFocusOutQuery}
        />
        <div>
          <button
            className={selfStyles.visibilityBtn}
            type="button"
            onClick={() => setIsVisibleVarEditor(!isVisibleVarEditor)}
          >
            {isVisibleVarEditor
              ? `${t('close')} ${t('variables')}`
              : `${t('manage')} ${t('variables')}`}
          </button>
          <div className={wrapperClassName}>
            <br />
            <VariablesEditor
              title={t('variables_upper')}
              value={variables}
              rows={8}
              cols={30}
              name="variableEditor"
              placeholder={t('use_valid_json')}
              handleChangeValue={handleChangeVariables}
              handleFocusOut={() => {}}
            />
          </div>
        </div>
        <ToggledTableEditor
          title={t('headers')}
          data={headers}
          handleAddData={handleAddHeader}
          handleChangeData={handleChangeHeader}
          handleRemoveData={handleRemoveHeader}
          handleFocusOut={handleFocusOutHeader}
        />
      </form>
      <GraphQlSchema schema={schema} isError={isSchemaError} />
      {children}
      {loader && <Loader />}
    </>
  );
}
