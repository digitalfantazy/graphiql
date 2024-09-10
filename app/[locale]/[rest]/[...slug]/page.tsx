import ResponseSection from '@/app/components/ResponseSection/ResponseSection';
import RestFormEditor from '@/app/components/RestFormEditor/ProtectedRest';
import initTranslations from '@/app/services/internationalization/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import makeRequest from '@/app/utils/makeRequest';

export default async function RestPage({ params, searchParams }: UrlParams) {
  const { data, status, errorMsg } = await makeRequest({ params, searchParams, type: 'rest' });
  const { t } = await initTranslations(params.locale, ['common', 'rest']);

  return (
    <>
      <h1 className="pageTitle">{t('rest:rest_title')}</h1>
      <RestFormEditor>
        <ResponseSection data={data} status={status} errorMsg={errorMsg} t={t} />
      </RestFormEditor>
    </>
  );
}
