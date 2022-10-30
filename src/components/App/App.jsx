import { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../Orders/OrderDetails/OrderDetails';
import IngredientDetails from '../BurgerIngredients/IngredientDetails/IngredientDetails';
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
import { Feed } from '../../pages/feed/feed';
import { OrderInfo } from '../Orders/OrderInfo/OrderInfo';
import { POPUP_CLOSE } from '../../services/action/popupAction';
import { WS_CONNECTION_START } from '../../services/action/wsActions';

function App() {
  const { popupCard, popupOrder, popupOrderInfo } = useSelector(store => store.popupReduser);
  const token = getCookie('token');
  const refreshToken = localStorage.getItem('refreshToken')
  const location = useLocation();
  const history = useHistory();
  const orderState = useSelector(store => store.orderDetailsReduser.feedFailed);
  const background = location.state?.background;

  const orders = useSelector(store => store.wsReduser.orders);
  const myOrders = useSelector(store => store.wsReduser.myOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAction());
    dispatch(fetchIngredients());
    history.replace({ state: null })
  }, [dispatch])

  useEffect(() => {
    if (!token && refreshToken) {
      dispatch(updateTokenAction())
    }
  }, [dispatch, token]);



  const onClose = () => {
    history.replace('/');
    dispatch({ type: POPUP_CLOSE })
  }
  const onCloseOrder = () => {
    history.goBack();
    dispatch({ type: POPUP_CLOSE })
  }

  return (
    <div className={StylesApp.page}>
      <AppHeader />
      <main className={`${StylesApp.main} pl-5 `}>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
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
          <Route path='/feed' exact={true}>
            <Feed />
          </Route>

          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <OrderInfo />
          </ProtectedRoute>

          <Route path='/feed/:id' exact={true}>
            <OrderInfo />
          </Route>

          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
        </Switch>
      </main>
      {popupCard &&
        <Route path='/ingredients/:id' exact={true}>
          <Modal active={popupCard} onClose={() => onClose()}>
            < IngredientDetails />
          </Modal>
        </Route>
      }
      {popupOrderInfo && background &&
        <Route path={"/feed/:id"} exact={true}>
          <Modal active={popupOrderInfo} onClose={() => onCloseOrder()}>
            <OrderInfo popupOrder={orders} />
          </Modal>
        </Route>
      }
      {popupOrderInfo && background &&
        <Route path={"/profile/orders/:id"} exact={true}>
          <Modal active={popupOrderInfo} onClose={() => onCloseOrder()}>
            <OrderInfo popupOrder={myOrders} />
          </Modal>
        </Route>
      }
      {popupOrder && !orderState &&
        <Modal active={popupOrder} onClose={() => onClose()}>
          <OrderDetails />
        </Modal>
      }
    </div>
  )
}

export default App;
