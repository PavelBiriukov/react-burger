import { useEffect, FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../Orders/OrderDetails/OrderDetails';
import IngredientDetails from '../BurgerIngredients/IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import StylesApp from './App.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SignIn from '../../pages/sign-in/signIn';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Registration from '../../pages/registration/Registration';
import ForgotPassword from '../../pages/forgotPassword/ForgotPassword';
import ResetPassword from '../../pages/resetPassword/ResetPassword';
import Profile from '../../pages/profile/Profile';

import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { getCookie } from '../../utils/utils';
import { Feed } from '../../pages/feed/feed';
import { OrderInfo } from '../Orders/OrderInfo/OrderInfo';
import { useDispatch, useSelector } from '../../utils/hooks/reduxHooks';
import { useActions } from '../../utils/hooks/useActions';
import { PopupActionTypes } from '../../services/popup/popup-type';
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any,  ): ReactElement<any, any> | null;
  }
}

export type TLocation = {
	background: {
		pathname: string;
		search: string;
		hash: string;
		state: null;
		key: string;
	}
	from: string;
	state?: object;
};

const App: FC = () => {
  const { popupCard, popupOrder, popupOrderInfo } = useSelector(store => store.popupReduser); 
  const orderState = useSelector(store => store.orderDetailsReduser.feedFailed);
  
  const token = getCookie('token');
  const refreshToken = localStorage.getItem('refreshToken')
  const location = useLocation<TLocation>();
  const history = useHistory();
  const background = location.state?.background;

  const {fetchIngredients, getUserAction, updateTokenAction} = useActions()
  const dispatch = useDispatch();
  useEffect(() => {
    getUserAction();
    fetchIngredients();
    history.replace({ state: null })
  }, [dispatch])

  useEffect(() => {
    if (!token && refreshToken) {
      updateTokenAction()
    }
  }, [dispatch, token]);



  const onClose = () => {
    history.replace('/');
    dispatch({ type: PopupActionTypes.POPUP_CLOSE }) 
  }
  const onCloseOrder = () => {
    history.goBack();
    dispatch({ type: PopupActionTypes.POPUP_CLOSE })
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
            <OrderInfo />
          </Modal>
        </Route>
      }
      {popupOrderInfo && background &&
        <Route path={"/profile/orders/:id"} exact={true}>
          <Modal active={popupOrderInfo} onClose={() => onCloseOrder()}>
            <OrderInfo />
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
