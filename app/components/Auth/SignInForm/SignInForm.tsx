'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '@/app/services/firebase/config';
import setCookies from '@/app/services/firebase/setCookies';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import styles from '../authStyles.module.css';
import useValidationSchema from '../schema';
import useAuthErrors from '../errors';

export default function SignInForm() {
  const { t } = useTranslation('sign');
  const schema = useValidationSchema();
  const authErrors = useAuthErrors();

  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  const handleSignIn = async (data: IFormInput) => {
    const res = await signInWithEmailAndPassword(data.email, data.password);

    if (res) {
      const token = await res.user.getIdToken();
      setCookies(token, window.location.pathname.split('/')[1]);

      localStorageApi.setData('firebaseUserName', res.user.displayName as string);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
      <h1 className={styles.title}>{t('sign_in')}</h1>
      <AuthInput
        register={register}
        type="text"
        label={t('email')}
        name="email"
        error={errors.email?.message || ''}
      />
      <AuthInput
        register={register}
        type="password"
        label={t('password')}
        name="password"
        error={errors.password?.message || ''}
      />
      {error && (
        <p className={styles.errorMsg}>{authErrors[error?.code] || authErrors.unexpectedError}</p>
      )}
      <p>
        {t('no_account')}{' '}
        <Link href="/sign-up" className={styles.link}>
          {t('sign_up')}
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid || loading}>
        {loading ? t('sending_btn') : t('submit_btn')}
      </button>
    </form>
  );
}
