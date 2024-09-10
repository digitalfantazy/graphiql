import { useTranslation } from 'react-i18next';

const useAuthErrors = () => {
  const { t } = useTranslation('auth');

  const errors: { [key: string]: string } = {
    'auth/invalid-credential': t('invalid_credentials'),
    'auth/credential-already-in-use': t('credential_already_in_use'),
    'auth/email-already-in-use': t('email_already_in_use'),
    'auth/invalid-email': t('invalid_email'),
    'auth/internal-error': t('internal_error'),
    'auth/invalid-user-token': t('invalid_user_token'),
    'auth/user-token-expired': t('user_token_expired'),
    'auth/timeout': t('timeout'),
    'auth/too-many-requests': t('too_many_requests'),
    'auth/user-not-found': t('user_not_found'),
    unexpectedError: t('unexpected_error'),
  };

  return errors;
};

export default useAuthErrors;
