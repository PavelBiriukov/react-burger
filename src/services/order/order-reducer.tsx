import { OrderDetailsActionTypes, TGetOrder, TInitialState } from "../order/order-type"

const initialState: TInitialState = {
  feedRequest: true,
  feedFailed: false,
  loader: false,
  order: null
}

export const orderDetailsReduser = ( state = initialState, action: TGetOrder ): TInitialState  => {
  switch(action.type) {
    case OrderDetailsActionTypes.GET_ORDER_SUCCESS: {
      return {
        ...state,
        loader: false,
        order: action.order,
        feedRequest: false,
        feedFailed: false,
      }
    }
    case OrderDetailsActionTypes.GET_ORDER_FAILED: {
      return {
        ...state,
        feedFailed: true,
        loader: true,
        feedRequest: false
      }
    }
    case OrderDetailsActionTypes.LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case OrderDetailsActionTypes.INLOADER: {
      return {
        ...state,
        loader: false
      }
    }
    default: {
      return state
    }
  }
}