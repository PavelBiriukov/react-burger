import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, FC, FormEvent } from 'react';
import style from './Registration.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { LoaderAuth } from '../../utils/Loader/Loader';
import { useForm} from '../../utils/hooks/useForm';
import { TLocation } from '../../components/App/App';
import { useDispatch, useSelector } from '../../utils/hooks/reduxHooks';
import { useActions } from '../../utils/hooks/useActions';

const Registration: FC = () => {
  const inLogin = useSelector(store => store.authReducer.inLogin);
  const loader = useSelector(store => store.authReducer.loader);
  const location = useLocation<TLocation>();

  const dispatch = useDispatch();
  
  const inputRef = React.useRef(null);

  const { values, handleChange, setValues } = useForm({});
  const { email, password, name} = values;
  
  const {registerUserAction} = useActions()

  const newUser = useCallback((e: FormEvent, email: string, password: string, name: string) => {
    e.preventDefault();
    setValues({});
    registerUserAction(email, password, name);
  }, [dispatch]);

  if (inLogin) {
    return (
      <Redirect to={location.state?.from || '/'} />
    );
  }
  return (
    <LoaderAuth loader={loader}>
      <section className={style.container}>
        <h2 className={'text text_type_main-medium'}>Регистрация</h2>
        <form className={style.form} onSubmit={(e) => newUser(e, email, password, name)}>
          <div className={`${style.wrapper} mt-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={(e) => { handleChange(e) }}
              icon={undefined}
              value={name || ''}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={undefined}
              errorText={'Ошибка'}
              size={undefined}
            />
          </div>
          <div className={`${style.wrapper} mt-6`}>
            <EmailInput
              onChange={(e) => { handleChange(e) }}
              value={email || ''}
              name={'email'}
              size={undefined} />
          </div>
          <div className={`${style.wrapper} mt-6 mb-6`} >
            <PasswordInput
              onChange={(e) => { handleChange(e) }}
              value={password || ''}
              name={'password'}
              size={undefined} />
          </div>
          <Button htmlType='button' type="primary" size="large" >
            Зарегистрироваться
          </Button>
          <p className={`${style.info} mt-20 text text_type_main-default text_color_inactive`} >
            Уже зарегистрированы?
            <Link to='/login' className={`${style.span} ml-2 text text_type_main-default`}>Войти</Link>
          </p>
        </form>
      </section>
    </LoaderAuth>
  )
}

export default Registration;
