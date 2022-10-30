import { getOrder } from "../../utils/burger-api";
import { inLoader, loader } from "./actionCreator";
import { RESET_ITEMS } from "./constructorAction";

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER = 'GET_ORDER';
export const LOADER = 'LOADER';

export const getOrderAction = (id) => {
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать 
    // ввод на время выполнения запроса
    dispatch(loader())
    // Запрашиваем данные у сервера
    getOrder(id)
    .then(res => {
      if (res && res.success) {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number
        });
        dispatch({
          type: RESET_ITEMS
        })
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    }).catch(err => {
      // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
        type: GET_ORDER_FAILED
      })
    })
    .finally(() => {
      dispatch(inLoader())
    })
  }
}