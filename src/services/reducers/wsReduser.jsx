import { WS_CONNECTION_CLOSED, WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDER, WS_GET_ORDER_AUTH } from "../action/wsActions";

const initialState = {
  wsConnected: false,
  wsConnectedAuth: false,
  orders: [],
  myOrders: [],
  total: null,
  totalToday: null
};

export const wsReduser = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectedAuth: true
      }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsConnectedAuth: false
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      }
    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        wsConnectedAuth: false
      }
    case WS_GET_ORDER:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders,
        loader: false
      }
    case WS_GET_ORDER_AUTH:
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