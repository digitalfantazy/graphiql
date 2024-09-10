import GraphiQLFormEditor from '@/app/components/GraphiQLFormEditor/ProtectedGraphiQl';
import ResponseSection from '@/app/components/ResponseSection/ResponseSection';
import initTranslations from '@/app/services/internationalization/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';

export default async function GraphQLPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams, type: 'graphql' });
  const { t } = await initTranslations(params.locale, ['common', 'graphiql']);

  return (
    <>
      <h1 className="pageTitle">{t('graphiql:graphiql_title')}</h1>
      <GraphiQLFormEditor>
        <ResponseSection data={data} status={status} errorMsg={errorMsg} t={t} />
      </GraphiQLFormEditor>
    </>
  );
}
