import { useEffect, useState } from 'react';
import { Query } from '@/app/utils/globalTypes';
import localStorageApi from './localStorageApi';

const initQuery: Query = {
  id: '',
  type: 'rest',
  method: 'GET',
  url: '',
  encodedUrl: '',
  headers: [{ id: 0, key: '', value: '' }],
  variables: [{ id: 0, key: '', value: '' }],
  body: '',
  sdlUrl: '',
  jsonVariables: '',
};

const useLocalStorage = (): Query => {
  const [query, setQuery] = useState<Query>(initQuery);

  useEffect(() => {
    const restoreQuery = localStorageApi.getRestoreQuery();
    if (restoreQuery) setQuery(restoreQuery);
  }, []);

  return query;
};

export default useLocalStorage;
