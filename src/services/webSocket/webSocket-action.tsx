import { IWsConnectionClosed, IWsConnectionClosedAuth, IWsConnectionError, IWsConnectionStart, IWsConnectionStartAuth, IWsConnectionSuccess, IWsGetMessage, IWsGetOrderAuth, IWsSendMessage, TFeedResponce, WsActionTypes } from "../webSocket/WebSocket-type";


export const wsConnectionOpen = (): IWsConnectionStart => {
	return {
		type: WsActionTypes.WS_CONNECTION_START
	}
}

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WsActionTypes.WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WsActionTypes.WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WsActionTypes.WS_CONNECTION_CLOSED
  };
};
export const wsConnectionClosedAuth = (): IWsConnectionClosedAuth => {
  return {
    type: WsActionTypes.WS_CONNECTION_CLOSED_AUTH
  };
};

export const wsConnectionStartAuth = (): IWsConnectionStartAuth => {
	return {
		type: WsActionTypes.WS_CONNECTION_START_AUTH
	}
}

export const wsGetOrder = (order: TFeedResponce):IWsGetMessage => {
  return {
    type: WsActionTypes.WS_GET_ORDER,
    payload: order
  };
};

export const wsSendOrder =  (order: TFeedResponce): IWsSendMessage => {
  return {
    type: WsActionTypes.WS_SEND_ORDER,
    payload: order
  };
};
export const wsGetOrderMy =  (order: TFeedResponce): IWsGetOrderAuth => {
  return {
    type: WsActionTypes.WS_GET_ORDER_AUTH,
    payload: order
  };
};



