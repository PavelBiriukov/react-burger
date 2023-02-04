import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useEffect, FC } from 'react';
import style from './Profile.module.css'
import { NavLink } from 'react-router-dom';
import { LoaderAuth } from '../../utils/Loader/Loader';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';
import { ProtectedRoute } from '../../components/protectedRoute/protectedRoute';
import { Orders } from '../../components/Orders/Orders';
import { useDispatch, useSelector } from '../../utils/hooks/reduxHooks';
import { useActions } from '../../utils/hooks/useActions';
import { wsConnectionClosedAuth, wsConnectionStartAuth } from '../../services/webSocket/webSocket-action';

type TReverceOrders = {
  number: number
}

const Profile: FC = () => {
  const orders = useSelector(store => store.wsReduser.myOrders);
  const loader = useSelector(store => store.authReducer.loader);
  const inLogin = useSelector(store => store.authReducer.inLogin);

  const reverceOrders = orders?.sort((a:TReverceOrders, b: TReverceOrders) => {
    if (a.number < b.number) {
      return 1
    } else {
      return -1
    }
  })

  const dispatch = useDispatch()
  const {logoutUserAction} = useActions()

  const handleLogout = () => {
    logoutUserAction();
  };

  useEffect(() => {
    dispatch(wsConnectionStartAuth());
    return () => {
      dispatch(wsConnectionClosedAuth());
    }
  }, [dispatch]);
  
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