import { TInitialState, TWsActions, WsActionTypes } from '../webSocket/WebSocket-type';



const initialState: TInitialState = {
  wsConnected: false,
  wsConnectedAuth: false,
  orders: [], 
  myOrders: [],
  total: null,
  totalToday: null,
  loader: false
};

export const wsReduser = (state = initialState, action: TWsActions): TInitialState => {
  switch (action.type) {
    case WsActionTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectedAuth: true
      }
    case WsActionTypes.WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsConnectedAuth: false
      }
    case WsActionTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      }
    case WsActionTypes.WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        wsConnectedAuth: false
      }
    case WsActionTypes.WS_GET_ORDER:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders,
        loader: false
      }
    case WsActionTypes.WS_GET_ORDER_AUTH:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        myOrders: action.payload.orders,
        loader: false
      }
    default:
      return state;
  }
}