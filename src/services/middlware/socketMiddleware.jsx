import { useSelector } from "react-redux";
import { getCookie } from "../../utils/utils";

export const socketMiddleware = (wsUrl, wsActions) => {
 
  return store => {
    let socket = null;
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendOrder, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie('token');

      if (type === wsInit && !token) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event});
        };
        socket.onerror = event => {
          dispatch({ type: onError, payload: event});
        };
        socket.onmessage = event => {
          const { data } = event;
          const parseData = JSON.parse(data);
          const { succes, ...restParseData } = parseData;
          
          dispatch({ type: onMessage, payload: restParseData});
        };
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event});
        };
        if (type === wsSendOrder) {
          const order = { ...payload, token: token};
          socket.send(JSON.stringify(order))
        }
      }
      next(action);
    };
  };
};