import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunkMiddleware from 'redux-thunk';
import { socketMiddleware } from "./middlware/socketMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { WsActionTypes } from "./webSocket/WebSocket-type";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUrlMy = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsInit: WsActionTypes.WS_CONNECTION_START,
  wsSendOrder: WsActionTypes.WS_SEND_ORDER,
  onOpen: WsActionTypes.WS_CONNECTION_SUCCESS,
  onClose: WsActionTypes.WS_CONNECTION_CLOSED,
  onError: WsActionTypes.WS_CONNECTION_ERROR,
  onMessage: WsActionTypes.WS_GET_ORDER
};
const wsActionsMy = {
  wsInit: WsActionTypes.WS_CONNECTION_START_AUTH,
  wsSendOrder: WsActionTypes.WS_SEND_ORDER,
  onOpen: WsActionTypes.WS_CONNECTION_SUCCESS,
  onClose: WsActionTypes.WS_CONNECTION_CLOSED_AUTH,
  onError: WsActionTypes.WS_CONNECTION_ERROR,
  onMessage: WsActionTypes.WS_GET_ORDER_AUTH
};




export const initialStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrlMy, wsActionsMy)))
  )

