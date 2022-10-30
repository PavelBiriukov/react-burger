import { GET_AUTH_FAILED, GET_AUTH_SUCCESS, GET_REGISTER_FAILED, GET_REGISTER_SUCCESS, GET_USER_FAILED, GET_USER_SUCCESS, INLOADER, UPDATE_TOKEN, USER_CHANGE_FAILED, USER_CHANGE_SUCCESS, USER_LOGOUT_FAILED, USER_LOGOUT_SUCCESS, USER_RESET_EMAIL_FAILED, USER_RESET_EMAIL_SUCCESS, USER_RESET_FAILED, USER_RESET_SUCCESS } from "../action/authAction";
import { LOADER } from "../action/orderDetailsAction";

const initialState = {
  user: {},
  success: false,
  loader: false,
  inLogin: false,
  message: null,
  resetEmailSuccess: false,
  updateToken: false
}

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_TOKEN: {
      return {
        ...state,
        inLogin: true
      }
    }
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loader: false,
        inLogin: true
      }
    }
    case GET_REGISTER_FAILED: {
      return {
        ...state,
        message: action.message,
        loader: false,
        inLogin: false
      }
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        loader: false,
        success: action.success,
        inLogin: true,
        message: null,
        user: {email: action.user.email, name: action.user.name}
      }
    }
    case LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case INLOADER: {
      return {
        ...state,
        loader: false
      }
    }
    case GET_AUTH_FAILED: {
      return {
        ...state,
        message: action.message,
        loader: false,
        inLogin: false,
        message: action.message
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: {email: action.user.email, name: action.user.name},
        inLogin: true,
        message: null
      }

    }
    case GET_USER_FAILED: {
      return {
        ...state,
        message: action.message,
        inLogin: false,
        message: action.message
      }
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: null
      }
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: true,
        message: action.message
      }
    }
    case USER_RESET_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: action.message
      }
    }
    case USER_RESET_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: null,
        success: action.success
      }
    }
    case USER_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: null,
        resetEmailSuccess: true
      }
    }
    case USER_RESET_EMAIL_FAILED: {
      return {
        ...state,
        loader: false,
        inLogin: false,
        message: action.message,
        resetEmailSuccess: false
      }
    }
    case USER_CHANGE_SUCCESS: {
      return {
        ...state,
        loader: false,
        inLogin: true,
        message: null,
        user: {
          email: action.user.email, 
          name: action.user.name,
          password: action.user.password
        }
      }
    }
    case USER_CHANGE_FAILED: {
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