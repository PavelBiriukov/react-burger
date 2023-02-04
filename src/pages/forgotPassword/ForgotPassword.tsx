import { Button, Input, } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import style from './ForgotPassword.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { LoaderAuth } from '../../utils/Loader/Loader';
import { useForm} from '../../utils/hooks/useForm';
import { TLocation } from '../../components/App/App';
import { useDispatch, useSelector } from '../../utils/hooks/reduxHooks';
import { useActions } from '../../utils/hooks/useActions';

const ForgotPassword: FC = () => {
  const resetEmailSuccess = useSelector(store => store.authReducer.resetEmailSuccess);
  const inLogin = useSelector(store => store.authReducer.inLogin);
  const loader = useSelector(store => store.authReducer.loader);
  
  const emailRef = React.useRef(null)
  const location = useLocation<TLocation>();

  const { values, handleChange, setValues } = useForm({});
  const { email } = values;
  const {resetPasswordEmailAction} = useActions()

  const addEmail = () => {
    setValues({});
    resetPasswordEmailAction(email);
  }

  if (inLogin) {
    return (
      <Redirect to={location.state?.from || '/'} />
    );
  }
  return (
    <LoaderAuth loader={loader}>
      <section className={style.container}>
        <h2 className={'text text_type_main-medium'}>Восстановление пароля</h2>
        <form className={style.form} onSubmit={(e) => { addEmail() }}>
          <div className={`${style.wrapper} mt-6 mb-6`}>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={(e) => { handleChange(e) }}
              icon={undefined}
              value={email || ''}
              name={'Email'}
              error={false}
              ref={emailRef}
              onIconClick={undefined}
              errorText={'Ошибка'}
              size={undefined}
            />
          </div>
          <Button htmlType='button' type="primary" size="large">
            {resetEmailSuccess ?
              (<Redirect to='/reset-password' />)
              : ''
            }
            Восстановить
          </Button>
          <p className={`${style.info} mt-20 text text_type_main-default text_color_inactive`} >
            Вспомнили пароль?
            <Link to='/login' className={`${style.span} ml-2 text text_type_main-default`}>Войти</Link>
          </p>
        </form>
      </section>
    </LoaderAuth>
  );
};

export default ForgotPassword;