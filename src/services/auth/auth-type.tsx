export type TUser = {
  email: string;
  name: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type TAuthInitialState = {      
  user: TUser, 
  success?: boolean,
  loader: boolean,
  inLogin: boolean,
  message: string | undefined,
  resetEmailSuccess: boolean,
  updateToken: boolean 
}

export enum AuthActionTypes {
  GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS',
  GET_AUTH_FAILED = 'GET_AUTH_FAILED',
  USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
  USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
  GET_USER_FAILED = 'GET_USER_FAILED',
  USER_RESET_FAILED = 'USER_RESET_FAILED',
  USER_RESET_SUCCESS = 'USER_RESET_SUCCESS',
  USER_RESET_EMAIL_SUCCESS = 'USER_RESET_EMAIL_SUCCESS',
  USER_RESET_EMAIL_FAILED = 'USER_RESET_EMAIL_FAILED',
  USER_CHANGE_SUCCESS = 'USER_CHANGE_SUCCESS',
  USER_CHANGE_FAILED = 'USER_CHANGE_FAILED',
  GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS',
  GET_REGISTER_FAILED = 'GET_REGISTER_FAILED',

  UPDATE_TOKEN = 'UPDATE_TOKEN',
  INLOADER = 'INLOADER',
  LOADER = 'LOADER'
}



export interface FetchInloaderAction {
  type: AuthActionTypes.INLOADER
  payload?: boolean
}

export interface FetchLoaderTokenAction {
  type: AuthActionTypes.LOADER,
  payload?: boolean,
}

export interface IRegisterSuccess {
  type: AuthActionTypes.GET_REGISTER_SUCCESS;
  user: TUser; 
  accessToken: string;
  refreshToken: string;
}


export interface IRegisterFailed {
  type: AuthActionTypes.GET_REGISTER_FAILED;
  message?: string; 
}

export interface IGetUserFailed {
  type: AuthActionTypes.GET_USER_FAILED;
  message?: string; 
}
export interface IGetUserSuccess {
  type: AuthActionTypes.GET_USER_SUCCESS;
  user: TUser; 
}
export interface IAuthFailed {
  type: AuthActionTypes.GET_AUTH_FAILED;
  message?: string; 
}

export interface IAuthUserSuccess {
  user: TUser; 
  success: boolean;
}

export interface IAuthSuccess {
  type: AuthActionTypes.GET_AUTH_SUCCESS;
  payload: IAuthUserSuccess
}

export interface IUpdateToken {
  type: AuthActionTypes.UPDATE_TOKEN;
}

export interface ILogoutUserFailed {
  type: AuthActionTypes.USER_LOGOUT_FAILED;
  message?: string;
}

export interface ILogoutUserSuccess {
  type: AuthActionTypes.USER_LOGOUT_SUCCESS;
}

export interface IResetPasswordEmailFailed {
  type: AuthActionTypes.USER_RESET_EMAIL_FAILED;
  message?: string;
}

export interface IResetPasswordEmailSuccess {
  type: AuthActionTypes.USER_RESET_EMAIL_SUCCESS;
}

export interface IResetPasswordFailed {
  type: AuthActionTypes.USER_RESET_FAILED;
  message?: string;
}
export interface IResetPasswordSuccess {
  type: AuthActionTypes.USER_RESET_SUCCESS;
  success?: boolean;
}

export interface IChangeUserInfoFailed {
  type: AuthActionTypes.USER_CHANGE_FAILED;
  message?: string;
}

export interface IChangeUserInfoSuccess {
  type: AuthActionTypes.USER_CHANGE_SUCCESS;
  user: any;
}

export type TAuthActions =
  | IRegisterSuccess
  | IRegisterFailed
  | IGetUserFailed
  | IGetUserSuccess
  | IAuthFailed
  | IAuthSuccess
  | IUpdateToken
  | ILogoutUserFailed
  | ILogoutUserSuccess
  | IResetPasswordFailed
  | IResetPasswordSuccess
  | IResetPasswordEmailFailed
  | IResetPasswordEmailSuccess
  | IChangeUserInfoFailed
  | IChangeUserInfoSuccess
  | FetchLoaderTokenAction
  | FetchInloaderAction;