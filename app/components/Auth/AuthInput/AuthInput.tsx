import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { HTMLProps, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './AuthInput.module.css';
import { IFormInput } from '../types';

interface InputProps extends HTMLProps<HTMLInputElement> {
  register: UseFormRegister<IFormInput>;
  name: keyof IFormInput;
  label: string;
  error: string;
}

function AuthInput(props: InputProps) {
  const { register, label, error, name, ...inputProps } = props;

  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <>
      <label className={styles.label} htmlFor={inputProps.id}>
        <span className={styles.labelName}>{label}</span>

        {inputProps.type === 'text' && (
          <input {...register(name)} className={styles.input} id={inputProps.id} />
        )}

        {inputProps.type === 'password' && (
          <>
            <input
              {...register(name)}
              className={styles.input}
              id={inputProps.id}
              type={isPassVisible ? 'text' : 'password'}
            />
            <button
              className={styles.passToggler}
              type="button"
              onClick={() => setIsPassVisible(!isPassVisible)}
              aria-label={isPassVisible ? 'Hide password' : 'Show password'}
            >
              <FontAwesomeIcon icon={isPassVisible ? faEyeSlash : faEye} />
            </button>
          </>
        )}
      </label>
      {error && <p className={styles.errorMsg}>{error}</p>}
    </>
  );
}

export default AuthInput;
