import { deleteCookie, setCookie } from "../../utils/utils";
import { AppDispatch } from "../types"; 
import { AuthActionTypes, FetchInloaderAction, FetchLoaderTokenAction, IAuthFailed, IAuthSuccess, IAuthUserSuccess, IChangeUserInfoFailed, IChangeUserInfoSuccess, IGetUserFailed, IGetUserSuccess, ILogoutUserFailed, ILogoutUserSuccess, IRegisterFailed, IRegisterSuccess, IResetPasswordEmailFailed, IResetPasswordEmailSuccess, IResetPasswordFailed, IResetPasswordSuccess, IUpdateToken, TUser } from "../auth/auth-type";
import AuthServis from "../../api/AuthServis";
import PasswordServis from "../../api/PasswordServis";

export const AuthActionCreators = {
  //
  loader: (): FetchLoaderTokenAction => ({type: AuthActionTypes.LOADER}),
  inLoader: (): FetchInloaderAction => ({type: AuthActionTypes.INLOADER}),
  //
  registrSucces: (user: TUser, accessToken: string , refreshToken: string): IRegisterSuccess => ({type: AuthActionTypes.GET_REGISTER_SUCCESS, user:user, accessToken: accessToken, refreshToken: refreshToken}),
  registrFailed: (err: string): IRegisterFailed => ({type: AuthActionTypes.GET_REGISTER_FAILED, message: err}),
  //
  userSucces: (userResponse: TUser): IGetUserSuccess => ({type: AuthActionTypes.GET_USER_SUCCESS, user: userResponse}),
  userFailed: (err?: string): IGetUserFailed => ({type: AuthActionTypes.GET_USER_FAILED, message: err}),
  //
  authSucces: (authResponse: IAuthUserSuccess): IAuthSuccess => ({type: AuthActionTypes.GET_AUTH_SUCCESS, payload: authResponse}),
  authFailed: (err?: string): IAuthFailed => ({type: AuthActionTypes.GET_AUTH_FAILED, message: err}),
  //
  updateToken: (): IUpdateToken => ({type: AuthActionTypes.UPDATE_TOKEN}),
  //
  logoutSucces: (): ILogoutUserSuccess => ({type: AuthActionTypes.USER_LOGOUT_SUCCESS}),
  logoutFailed: (err: string): ILogoutUserFailed => ({type: AuthActionTypes.USER_LOGOUT_FAILED, message: err}),
  //
  resetEmailSucces: (): IResetPasswordEmailSuccess => ({type: AuthActionTypes.USER_RESET_EMAIL_SUCCESS}),
  resetEmailFailed: (err: string): IResetPasswordEmailFailed => ({type: AuthActionTypes.USER_RESET_EMAIL_FAILED, message: err}),
  //
  userResetSucces: (success: boolean): IResetPasswordSuccess => ({type: AuthActionTypes.USER_RESET_SUCCESS, success}),
  userResetFailed: (err: string): IResetPasswordFailed => ({type: AuthActionTypes.USER_RESET_FAILED, message: err}),
  //
  userChangeSucces: (userChangeResponse: TUser): IChangeUserInfoSuccess => ({type: AuthActionTypes.USER_CHANGE_SUCCESS, user: userChangeResponse}),
  userChangeFailed: (err: string): IChangeUserInfoFailed => ({type: AuthActionTypes.USER_CHANGE_FAILED, message: err}),
  //
  registerUserAction: (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.loader());
    try{
      const response = (await AuthServis.postRegisterUser(email, password, name)).data;
      const accessToken = response.accessToken.split('Bearer ')[1];
      const refreshToken = response.refreshToken;
      setCookie('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (response && response.success) {
        dispatch(AuthActionCreators.registrSucces(response.user, response.accessToken, response.refreshToken));
      }
      return response;
    }
    catch(e){
      dispatch(AuthActionCreators.registrFailed('Ошибка в регистрации'))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
  getUserAction: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.loader());
      const response = (await AuthServis.getUserInfo());
        if (response && response.success) {
          dispatch(AuthActionCreators.userSucces(response.user))
        } else {
          dispatch(AuthActionCreators.userFailed(response.message))
        }
    } catch (error) {
      dispatch(AuthActionCreators.userFailed('error: getUserAction'))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
  authAction: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.loader());
      const response = (await AuthServis.postLoginUser(email, password)).data;
      const accessToken = response.accessToken.split('Bearer ')[1];
      const refreshToken = response.refreshToken;
      setCookie('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (response) {
        dispatch(AuthActionCreators.authSucces(response))
      } else {
        dispatch(AuthActionCreators.authFailed())
      }
      return response;
    } catch (error) {
      dispatch(AuthActionCreators.authFailed("error: authAction"))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
  updateTokenAction: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.loader());
      const response = (await AuthServis.postUpdateToken(localStorage.getItem('refreshToken'))).data;
      const accessToken = response.accessToken.split('Bearer ')[1];
      const refreshToken = response.refreshToken;
      setCookie('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (response && response.success) {
        dispatch(AuthActionCreators.updateToken())
      }
      return response;

    } catch (error) {
      dispatch(AuthActionCreators.authFailed("error: updateTokenAction"))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
  logoutUserAction: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.loader());
      const response = (await AuthServis.postLogoutUser(localStorage.getItem('refreshToken'))).data;
      if (response && response.success) {
        dispatch(AuthActionCreators.logoutSucces());
        deleteCookie('token');
        localStorage.clear();
      }
    } catch (error) {
      dispatch(AuthActionCreators.logoutFailed('error: logoutUserAction'))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
  resetPasswordEmailAction: (email: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.loader());
      const response = (await PasswordServis.postResetPasswordEmail(email)).data;
        if (response && response.success) {
          dispatch({
            type: AuthActionTypes.USER_RESET_EMAIL_SUCCESS
          });
        }
    } catch (error) {
      dispatch(AuthActionCreators.resetEmailFailed('error: resetPasswordEmailAction'))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
  resetPasswordAction: (password: string, code: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.loader());
      const response = (await PasswordServis.postresetPassword(password, code)).data;
        if (response && response.success) {
          dispatch(AuthActionCreators.userResetSucces(response.success));
        }
    } catch (error) {
      dispatch(AuthActionCreators.userResetFailed('error: resetPasswordAction'))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
  changeUserInfoAction: (email: string, name: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.loader());
      const response = (await AuthServis.patchChangeUserInfo(email, name, password)).data;
      if (response && response.success) {
        dispatch(AuthActionCreators.userChangeSucces(response.user));
      }
    } catch (error) {
      dispatch(AuthActionCreators.userChangeFailed('error: changeUserInfoAction'))
    }
    finally {
      dispatch(AuthActionCreators.inLoader())
    }
  },
}