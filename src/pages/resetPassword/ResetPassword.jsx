import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback } from 'react';
import style from './ResetPassword.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../services/action/authAction';
import { LoaderAuth } from '../../utils/Loader/Loader';
import { useForm } from '../../utils/hooks/useForm';

const ResetPassword = () => {
  const inLogin = useSelector(store => store.authReducer.inLogin);
  const messageErr = useSelector(store => store.authReducer.message);
  const successReset = useSelector(store => store.authReducer.success);
  const resetEmailSuccess = useSelector(store => store.authReducer.resetEmailSuccess);
  const loader = useSelector(store => store.authReducer.loader);

  const location = useLocation();
  const dispatch = useDispatch();

  const { values, handleChange, setValues } = useForm({});
  const { code, password } = values;

  const passwordRef = React.useRef(null);
  const codeRef = React.useRef(null);

  const onIconPasswordClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
  }

  const newPassword = useCallback((e) => {
    e.preventDefault();
    setValues({});
    dispatch(resetPasswordAction(password, code))
  }, [dispatch])

  if (inLogin) {
    return (
      <Redirect to={location.state?.from || '/'} />
    );
  }

  if (!resetEmailSuccess) {
    return (
      <Redirect to={"/forgot-password"} />
    )
  }

  return (
    <LoaderAuth loader={loader}>
      <section className={style.container}>
        <form className={style.form} onSubmit={(e) => { newPassword(e) }}>
          <h2 className={'text text_type_main-medium'}>Восстановление пароля</h2>
          <div className={`${style.wrapper} mt-6`}>
            <Input
              type={'password'}
              placeholder={'Введите новый пароль'}
              onChange={(e) => { handleChange(e) }}
              icon={'ShowIcon'}
              value={password || ''}
              name={'password'}
              error={messageErr ? true : false}
              ref={passwordRef}
              onIconClick={onIconPasswordClick}
              errorText={messageErr}
              size={undefined}
            />
          </div>
          <div className={`${style.wrapper} mt-6 mb-6`}>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={(e) => { handleChange(e) }}
              icon={undefined}
              value={code || ''}
              name={'code'}
              error={messageErr ? true : false}
              ref={codeRef}
              onIconClick={undefined}
              errorText={messageErr}
              size={undefined}
            />
          </div>
          <Button type="primary" size="large">
            {successReset ?
              (<Redirect to={'/login'} />)
              : ''
            }
            Сохранить
          </Button>
          <p className={`${style.info} mt-20 text text_type_main-default text_color_inactive`} >
            Вспомнили пароль?
            <Link to='/login' className={`${style.span} ml-2 text text_type_main-default`}>Войти</Link>
          </p>
        </form>
      </section>
    </LoaderAuth>
  )
}


export default ResetPassword;