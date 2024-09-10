'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/services/firebase/config';
import setCookies from '@/app/services/firebase/setCookies';
import { updateProfile } from 'firebase/auth';
import localStorageApi from '@/app/services/localStorageApi/localStorageApi';
import { IFormInput } from '../types';
import AuthInput from '../AuthInput/AuthInput';
import styles from '../authStyles.module.css';
import authStyles from '../AuthInput/AuthInput.module.css';
import useValidationSchema from '../schema';
import useAuthErrors from '../errors';

export default function SignUpForm() {
  const [name, setName] = useState('');

  const { t } = useTranslation('sign');
  const schema = useValidationSchema();
  const authErrors = useAuthErrors();

  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  const handleSignUp = async (data: IFormInput) => {
    const res = await createUserWithEmailAndPassword(data.email, data.password);

    if (res) {
      const token = await res.user.getIdToken();
      setCookies(token, window.location.pathname.split('/')[1]);

      localStorageApi.setData('firebaseUserName', name);
      await updateProfile(res.user, { displayName: name });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
      <h1 className={styles.title}>{t('sign_up')}</h1>

      <label className={authStyles.label} htmlFor="name">
        <span className={authStyles.labelName}>{t('name')}</span>
        <input
          className={authStyles.input}
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

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
        {t('have_account')}{' '}
        <Link href="/sign-in" className={styles.link}>
          {t('sign_in')}
        </Link>
      </p>
      <button className={styles.submitButton} type="submit" disabled={!isValid || loading}>
        {loading ? t('sending_btn') : t('submit_btn')}
      </button>
    </form>
  );
}
