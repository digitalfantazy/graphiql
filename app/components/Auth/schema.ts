import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {
  const { t } = useTranslation('validation');

  const schema = yup.object({
    email: yup
      .string()
      .required(t('required'))
      .email(t('invalid_email'))
      .matches(/^[\w-]+@([\w-]+\.)+[a-z]{2,4}$/, t('invalid_email')),
    password: yup
      .string()
      .required(t('required'))
      .matches(/[0-9]/, t('at_least_one_digit'))
      .matches(/[a-zA-Z]/, t('at_least_one_letter'))
      .matches(/[!?@#$%^&*]/, t('at_least_one_special_char'))
      .min(8, t('min_symbols')),
  });

  return schema;
};

export default useValidationSchema;
