import { getIngredients } from "../../components/utils/burger-api";

export const GET_FEED = 'GET_FEED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';

export const COUNT = 'COUNT';

export const fetchIngredients  = () => {
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать 
    // ввод на время выполнения запроса
    dispatch({
      type: GET_FEED
    })
    // Запрашиваем данные у сервера
    getIngredients()
    .then(res => {
      if (res && res.success) {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch({
          type: GET_FEED_SUCCESS,
          feed: res.data
        })
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch({
          type: GET_FEED_FAILED
        })
      }
    }).catch(err => {
      // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
        type: GET_FEED_FAILED
      })
    })
  }
}