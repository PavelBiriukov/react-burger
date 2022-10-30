import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './SignIn.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../services/action/authAction';
import { LoaderAuth } from '../../utils/Loader/Loader';
import { useForm } from '../../utils/hooks/useForm';

const SignIn = () => {
  const inLogin = useSelector(store => store.authReducer.inLogin);
  const loader = useSelector(store => store.authReducer.loader);
const user = useSelector(store => store.authReducer.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const { values, handleChange, setValues } = useForm({
    email: user.email || '',
    password: user.password || ''
  });
  const { email, password } = values;

  const login = (e) => {
    setValues({})
    e.preventDefault();
    dispatch(authAction(email, password))
  };

  if (inLogin) {
    return (
      <Redirect to={location.state?.from || '/'} />
    )
  };
  return (
    <LoaderAuth loader={loader}>
      <section className={style.container}>
        <form className={style.form} onSubmit={login}>
          <h2 className={'text text_type_main-medium'}>Вход</h2>
          <div className={`${style.wrapper} mt-6`}>
            <EmailInput onChange={handleChange} value={email || ''} name={'email'} size={"default"} />
          </div>
          <div className={`${style.wrapper} mt-6 mb-6`} >
            <PasswordInput onChange={handleChange} value={password || ''} name={'password'} size={"default"} />
          </div>
          <Button type="primary" size="large">
            Войти
          </Button>
          <p className={`${style.info} mt-20 text text_type_main-default text_color_inactive`} >
            Вы — новый пользователь?
            <Link to='/register' className={`${style.span} ml-2 text text_type_main-default`}>Зарегистрироваться</Link>
          </p>
          <p className={`${style.info} mt-4 text text_type_main-default text_color_inactive`} >
            Забыли пароль?
            <Link to='/forgot-password' className={`${style.span} ml-2 text text_type_main-default`}>Восстановить пароль</Link>
          </p>
        </form>
      </section>
    </LoaderAuth>
  );
};

export default SignIn;