export type TFeedResponce = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<TOrder1>;
}

export type TOrder1 = {
  createdAt: string;
  ingredients?: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: number;
  _id: string;
}

export type TInitialState = {
	wsConnected: boolean; 
	wsConnectedAuth: boolean;
	orders: TOrder1[];
	myOrders: TOrder1[];
	total: number | null;
	totalToday: number | null;
  loader: boolean;
}

export enum WsActionTypes {
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_SEND_ORDER = 'WS_SEND_ORDER',
  WS_GET_ORDER = 'WS_GET_ORDER',
  WS_GET_ORDER_AUTH = 'WS_GET_ORDER_AUTH',
  WS_CONNECTION_START_AUTH = 'WS_CONNECTION_START_AUTH',
  WS_CONNECTION_CLOSED_AUTH = 'WS_CONNECTION_CLOSED_AUTH',
}
export interface IWsConnectionStart {
	readonly type: typeof WsActionTypes.WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
	readonly type: typeof WsActionTypes.WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
	readonly type: typeof WsActionTypes.WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
	readonly type: typeof WsActionTypes.WS_CONNECTION_CLOSED;
}
export interface IWsConnectionClosedAuth {
	readonly type: typeof WsActionTypes.WS_CONNECTION_CLOSED_AUTH;
}
export interface IWsConnectionStartAuth {
	readonly type: typeof WsActionTypes.WS_CONNECTION_START_AUTH;
}
export interface IWsGetMessage {
	readonly type: typeof WsActionTypes.WS_GET_ORDER;
	payload: TFeedResponce
}
export interface IWsSendMessage {
	readonly type: typeof WsActionTypes.WS_SEND_ORDER;
	payload: TFeedResponce
}
export interface IWsGetOrderAuth {
	readonly type: typeof WsActionTypes.WS_GET_ORDER_AUTH;
	payload: TFeedResponce
}
export type TWsActions =
	| IWsConnectionStart
	| IWsConnectionSuccess
	| IWsConnectionError
	| IWsConnectionClosed
	| IWsGetMessage
	| IWsGetOrderAuth
	| IWsConnectionClosedAuth
  | IWsConnectionStartAuth
	| IWsSendMessage;