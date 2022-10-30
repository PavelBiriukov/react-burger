import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunkMiddleware from 'redux-thunk';
import { socketMiddleware } from "./middlware/socketMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_START_AUTH, WS_CONNECTION_SUCCESS, WS_GET_ORDER, WS_GET_ORDER_AUTH, WS_SEND_ORDER } from "./action/wsActions";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUrlMy = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendOrder: WS_SEND_ORDER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDER
};
const wsActionsMy = {
  wsInit: WS_CONNECTION_START_AUTH,
  wsSendOrder: WS_SEND_ORDER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED_AUTH,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDER_AUTH
};
export const initialStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrlMy, wsActionsMy)))
  )