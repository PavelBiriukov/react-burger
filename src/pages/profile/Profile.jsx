import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useEffect, useMemo } from 'react';
import style from './Profile.module.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfoAction, logoutUserAction } from '../../services/action/authAction';
import { LoaderAuth } from '../../utils/Loader/Loader';
import { useForm } from '../../utils/hooks/useForm';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';
import { ProtectedRoute } from '../../components/protectedRoute/protectedRoute';
import { Orders } from '../../components/Orders/Orders';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_START, WS_CONNECTION_START_AUTH } from '../../services/action/wsActions';

const Profile = () => {
  const orders = useSelector(store => store.wsReduser.myOrders);
  const loader = useSelector(store => store.authReducer.loader);
  const inLogin = useSelector(store => store.authReducer.inLogin);

  const reverceOrders = orders?.sort((a, b) => {
    if (a.number < b.number) {
      return 1
    } else {
      return -1
    }
  })

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
  }, [inLogin]);
  
  return (
    <LoaderAuth loader={loader}>
      <section className={style.container}>
        <nav className={style.navigation}>
          <ul className={`${style.ul} mb-20`}>
            <li className={`${style.list} `}>
              <NavLink
                to='/profile'
                className={`${style.link} text text_type_main-medium text_color_inactive`}
                activeClassName={style.activeLink}
                exact>
                Профиль
              </NavLink>
            </li>
            <li className={`${style.list} `}>
              <NavLink
                to='/profile/orders'
                exact
                className={`${style.link} text text_type_main-medium text_color_inactive`}
                activeClassName={style.activeLink}>
                История заказов
              </NavLink>
            </li>
            <li className={`${style.list} `}>
              <NavLink
                to='/login'
                className={`${style.link} text text_type_main-medium text_color_inactive`}
                activeClassName={style.activeLink}
                onClick={handleLogout}>
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={`${style.info} mt-20 text text_type_main-default text_color_inactive`} >
            В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp; свои данные
          </p>
        </nav>
        <ProtectedRoute path="/profile" exact>
          <ProfileForm />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <Orders orders={reverceOrders} />
        </ProtectedRoute>
      </section>
    </LoaderAuth>
  );
};

export default Profile;