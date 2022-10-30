import React, { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import StylesApp from './App.module.css';
import { fetchIngredients } from '../../services/action/listIgredientsAction';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SignIn from '../../pages/sign-in/signIn';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Registration from '../../pages/registration/Registration';
import ForgotPassword from '../../pages/forgotPassword/ForgotPassword';
import ResetPassword from '../../pages/resetPassword/ResetPassword';
import Profile from '../../pages/profile/Profile';

import { getUserAction, updateTokenAction } from '../../services/action/authAction';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { getCookie } from '../../utils/utils';

function App() {
  const [popupIngredients, setPopupIngredients] = React.useState(false);
  const [popupCard, setPopupCard] = React.useState(false);
  const token = getCookie('token');
  const refreshToken = localStorage.getItem('refreshToken')
  const location = useLocation();
  const history = useHistory();
  const orderState = useSelector(store => store.orderDetailsReduser.feedFailed);

  const background = location.state?.background;

  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getUserAction());
    dispatch(fetchIngredients());
    history.replace({state: null})
  }, [dispatch])

  useEffect(() => {
    if (!token && refreshToken) {
      dispatch(updateTokenAction())
    }
  }, [dispatch, token])

  const onClose = (setActive) => { 
    setActive(false);
    history.replace('/');
  }

  return (
    <div className={StylesApp.page}>
      <AppHeader />
      <main className={`${StylesApp.main} pl-5 `}>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients setActive={setPopupCard} />
              <BurgerConstructor setActive={setPopupIngredients} />
            </DndProvider>
          </Route>
          <Route path="/login" exact={true}>
            <SignIn />
          </Route>
          <Route path="/register" exact={true}>
            <Registration />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientDetails />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>

        </Switch>
      </main>
      {popupCard && 
        <Route path='/ingredients/:id' exact={true}>
          <Modal active={popupCard} onClose={() => onClose(setPopupCard)}>
            < IngredientDetails />
          </Modal>
        </Route>
      }
      {popupIngredients && !orderState &&
        <Modal active={popupIngredients} onClose={() => onClose(setPopupIngredients)}>
          <OrderDetails />
        </Modal>
      }
    </div>
  )
}

export default App;
