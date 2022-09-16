import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, LOADER } from "../action/orderDetailsAction"

const initialState = {
  feedRequest: true,
  feedFailed: false,
  loader: false,
  order: []
}

export const orderDetailsReduser = ( state = initialState, action ) => {
  switch(action.type) {
    case GET_ORDER: {
      return {
        ...state,
        feedRequest: true,
        feedFailed: false
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        loader: false,
        order: action.order,
        feedRequest: false
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        feedFailed: false,
        loader: true,
        feedRequest: false
      }
    }
    case LOADER: {
      return {
        loader: true
      }
    }
    default: {
      return state
    }
  }
}