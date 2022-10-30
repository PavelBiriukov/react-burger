import { authUser, logoutUser, getUserInfo, resetPassword, resetPasswordEmail, changeUserInfo, registerUser, updateToken } from "../../utils/burger-api";
import { deleteCookie, setCookie } from "../../utils/utils";
import { inLoader, loader } from "./actionCreator";

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILED = 'GET_AUTH_FAILED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const USER_RESET_FAILED = 'USER_RESET_FAILED';
export const USER_RESET_SUCCESS = 'USER_RESET_SUCCESS';
export const USER_RESET_EMAIL_SUCCESS = 'USER_RESET_EMAIL_SUCCESS';
export const USER_RESET_EMAIL_FAILED = 'USER_RESET_EMAIL_FAILED';
export const USER_CHANGE_SUCCESS = 'USER_CHANGE_SUCCESS';
export const USER_CHANGE_FAILED = 'USER_CHANGE_FAILED';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';
export const INLOADER = 'INLOADER';

export const registerUserAction = (email, password, name) => {
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать 
    // ввод на время выполнения запроса
    dispatch(loader());
    // Запрашиваем данные у сервера
    registerUser(email, password, name)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken, { 'max-age': 1200, path: '/' });
        localStorage.setItem('refreshToken', refreshToken);
        return res;
      })
      .then(res => {
        if (res && res.success) {

          // В случае успешного получения данных вызываем экшен
          // для записи полученных данных в хранилище
          dispatch({
            type: GET_REGISTER_SUCCESS,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          });
        }
      }).catch(err => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: GET_REGISTER_FAILED,
          message: err.message
        })

      })
      .finally(() => {
        dispatch(inLoader())
      })
  }
}

export const getUserAction = () => {
  return function (dispatch) {
    getUserInfo()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          })
        } else {
          dispatch({
            type: GET_USER_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_USER_FAILED,
          message: err.message
        })
      })
      .finally(() => {
        dispatch(inLoader())
      })
  }
}

export const authAction = (email, password) => {

  return function (dispatch) {
    dispatch(loader());
    authUser(email, password)
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken, { 'max-age': 1200, path: '/' });
        localStorage.setItem('refreshToken', refreshToken);
        return res;
      })
      .then(res => {
        if (res) {

          dispatch({
            type: GET_AUTH_SUCCESS,
            user: res.user,
            success: res.success
          })
        } else {
          dispatch({
            type: GET_AUTH_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_AUTH_FAILED,
          message: err.message
        })
      })
      .finally(() => {
        dispatch(inLoader())
      })
  }
}
export const updateTokenAction = () => {
  return function (dispatch) {
    dispatch(loader())
    updateToken(localStorage.getItem('refreshToken'))
      .then(res => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken, { 'max-age': 1200, path: '/' });
        localStorage.setItem('refreshToken', refreshToken);
        return res;
      }).then(res => {
        if (res && res.success) {
          dispatch({ type: UPDATE_TOKEN })
        }
      })
      .finally(() => {
        dispatch(inLoader())
      })
  }
}
export const logoutUserAction = () => {

  return function (dispatch) {
    dispatch(loader())
    logoutUser(localStorage.getItem('refreshToken'))
      .then(res => {
        if (res && res.success) {
          dispatch({ type: USER_LOGOUT_SUCCESS });
          deleteCookie('token');
          localStorage.clear();

        }
      })
      .catch(err => dispatch({
        type: GET_AUTH_FAILED,
        message: err.message
      })
      )
      .finally(() => {
        dispatch(inLoader())
      })
  }
}

export const resetPasswordEmailAction = (email) => {

  return function (dispatch) {
    dispatch(loader())
    resetPasswordEmail(email)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_RESET_EMAIL_SUCCESS
          });
        }
      })
      .catch(err => dispatch({
        type: USER_RESET_EMAIL_FAILED,
        message: err.message
      }))
      .finally(() => {
        dispatch(inLoader())
      })
  }
}
export const resetPasswordAction = (password, code) => {
  return function (dispatch) {
    dispatch(loader())
    resetPassword(password, code)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_RESET_SUCCESS,
            success: res.success
          });
        }
      })
      .catch(err => dispatch({
        type: USER_RESET_FAILED,
        message: err.message
      }))
      .finally(() => {
        dispatch(inLoader())
      })
  }
}
export const changeUserInfoAction = (email, name, password) => {
  return function (dispatch) {
    dispatch(loader())
    changeUserInfo(email, name, password)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_CHANGE_SUCCESS,
            user: res.user
          });
        }
      })
      .catch(err => dispatch({
        type: USER_CHANGE_FAILED,
        message: err.message
      }))
      .finally(() => {
        dispatch(inLoader())
      })
  }
}
