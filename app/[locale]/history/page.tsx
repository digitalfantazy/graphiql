import initTranslations from '@/app/services/internationalization/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import HistoryRequests from '../../components/HistoryRequests/ProtectedHistory';

export default async function HistoryPage({ params }: UrlParams) {
  const { t } = await initTranslations(params.locale, ['common', 'history']);

  return (
    <>
      <h1 className="pageTitle">{t('history:history_title')}</h1>
      <HistoryRequests />
    </>
  );
}
