import { AuthActionTypes, TAuthActions, TAuthInitialState } from '../auth/auth-type';



const initialState: TAuthInitialState = {
  user: {
    email: '',
    name: '',
    password: ''
  },
  success: false,
  loader: false,
  inLogin: false,
  message: '',
  resetEmailSuccess: false,
  updateToken: false
}

export const authReducer = (state = initialState, action: TAuthActions) : TAuthInitialState => {

  switch (action.type) {
    case AuthActionTypes.UPDATE_TOKEN: {
      return {
        ...state,
        inLogin: true
      }
    }
    case AuthActionTypes.GET_REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loader: false,
        inLogin: true
      }
    }
    case AuthActionTypes.GET_REGISTER_FAILED: {
      return {
        ...state,
        message: action.message,
        loader: false,
        inLogin: false
      }
    }
    case AuthActionTypes.GET_AUTH_SUCCESS: {
      return {
        ...state,
        loader: false,
        success: action.payload.success,
        inLogin: true,
        message: undefined,
        user: {email: action.payload.user.email, name: action.payload.user.name}
      }
    }
    case AuthActionTypes.LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case AuthActionTypes.INLOADER: {
      return {
        ...state,
        loader: false
      }
    }
    case AuthActionTypes.GET_AUTH_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: action.message
      }
    }
    case AuthActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        user: {email: action.user.email, name: action.user.name},
        inLogin: true,
        message: undefined
      }

    }
    case AuthActionTypes.GET_USER_FAILED: {
      return {
        ...state,
        message: action.message,
        inLogin: false
      }
    }
    case AuthActionTypes.USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: undefined
      }
    }
    case AuthActionTypes.USER_LOGOUT_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: true,
        message: action.message
      }
    }
    case AuthActionTypes.USER_RESET_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: action.message
      }
    }
    case AuthActionTypes.USER_RESET_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: undefined,
        success: action.success
      }
    }
    case AuthActionTypes.USER_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: undefined,
        resetEmailSuccess: true
      }
    }
    case AuthActionTypes.USER_RESET_EMAIL_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: action.message,
        resetEmailSuccess: false
      }
    }
    case AuthActionTypes.USER_CHANGE_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: true,
        message: undefined,
        user: {
          email: action.user.email, 
          name: action.user.name,
          password: action.user.password
        }
      }
    }
    case AuthActionTypes.USER_CHANGE_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: true,
        message: action.message
      }
    }
    default:
      return state;
  }
}