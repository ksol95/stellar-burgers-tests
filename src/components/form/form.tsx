import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState
} from 'react';
import { IFormProps } from './types';

import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
// Используйте для проверки формата введённого имени
import { namePattern } from '../../utils/constants';

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [repeatPasswor, setReapeatPasswor] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => {
    setName(target.value);
    if (!namePattern.test(target.value)) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
  };
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => {
    setEmail(target.value);
  };
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => {
    setPasswordErr(false);
    setPassword(target.value);
  };
  const handleRepeatPasswordChange: ChangeEventHandler<HTMLInputElement> = ({
    target
  }) => {
    setPasswordErr(false);
    setReapeatPasswor(target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== repeatPasswor) {
      setPasswordErr(true);
      return;
    }
    setMode('complete');
  };

  return (
    <form
      className={clsx(styles.form, className)}
      data-testid='form'
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        <Input
          data-testid='name-input'
          value={name}
          type='text'
          placeholder='Имя'
          name='name'
          error={nameErr}
          errorText={'Некорректный формат имени'}
          extraClass={clsx(styles.input, { [styles.input_error]: nameErr })}
          onChange={handleNameChange}
          required
        />
        <EmailInput
          data-testid='email-input'
          value={email}
          placeholder='E-mail'
          name='email'
          onChange={handleEmailChange}
          required
          extraClass={clsx(styles.input, { [styles.input_error]: false })}
        />
        <PasswordInput
          data-testid='password-input'
          value={password}
          placeholder='Пароль'
          name='password'
          extraClass={clsx(styles.input, { [styles.input_error]: false })}
          onChange={handlePasswordChange}
          required
        />
        <PasswordInput
          data-testid='repeat-password-input'
          value={repeatPasswor}
          placeholder='Повторите пароль'
          name='repeat-password'
          extraClass={clsx(styles.input, {
            [styles.input_error]: passwordErr
          })}
          onChange={handleRepeatPasswordChange}
          required
        />
        {passwordErr && (
          <p
            className='text input__error text_type_main-default mt-2 mb-2'
            data-testid='password-error'
          >
            Пароли не совпадают
          </p>
        )}
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={!formRef.current?.checkValidity()}
        >
          Зарегистрироваться
        </Button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass={styles.signin_btn}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
