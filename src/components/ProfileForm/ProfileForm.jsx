import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfoAction } from '../../services/action/authAction';
import { useForm } from '../../utils/hooks/useForm';

import style from './ProfileForm.module.css';

export const ProfileForm = () => {
  const user = useSelector(store => store.authReducer.user);
  const dispatch = useDispatch();
  let [showPassword, setShowPassword] = React.useState(false);

  const { values, handleChange, setValues } =
    useForm({
      email: user.email || '',
      name: user.name || '',
      password: ''
    });
  const { email, password, name } = values

  const nameRef = React.useRef(null);
  const loginRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onSubmit = (e) => {
    setValues({});
    dispatch(changeUserInfoAction(email, name, password))
  };



  const onIconClick = (ref) => { ref.current.focus() };
  const onShowPassword = () => { setShowPassword(showPassword ? showPassword = false : showPassword = true) };

  const resetInfo = () => {
    setValues({
      email: user.email,
      name: user.name,
      password: ''
    })
  }
  return (
    <form className={style.form} onSubmit={e => onSubmit(e)}>
      <div className={`${style.wrapper}`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => { handleChange(e) }}
          icon={'EditIcon'}
          value={name || ''}
          name={'name'}
          error={false}
          ref={nameRef}
          onIconClick={() => onIconClick(nameRef)}
          errorText={'Ошибка'}
          size={undefined}
        />
      </div>
      <div className={`${style.wrapper} mt-6`}>
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={(e) => { handleChange(e) }}
          icon={'EditIcon'}
          value={email || ''}
          name={'email'}
          error={false}
          ref={loginRef}
          onIconClick={() => onIconClick(loginRef)}
          errorText={'Ошибка'}
          size={undefined} />
      </div>
      <div className={`${style.wrapper} mt-6 mb-6`} >
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={(e) => { handleChange(e) }}
          icon={showPassword ? 'HideIcon' : 'ShowIcon'}
          value={password || ''}
          name={'password'}
          error={false}
          ref={passwordRef}
          onIconClick={() => onShowPassword(passwordRef)}
          errorText={'Ошибка'}
          size={undefined}
        />
      </div>
      <div className={style.btns}>
        <Button type="secondary" size="large" onClick={resetInfo}>
          Отмена
        </Button>
        <Button type="primary" size="large" >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
