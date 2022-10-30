import { POPUP_CLOSE, POPUP_ITEM_INFO, POPUP_ITEM_INFO_CLOSE, POPUP_ORDER, POPUP_ORDER_CLOSE, POPUP_ORDER_ITEM_INFO, POPUP_ORDER_ITEM_INFO_CLOSE } from "../action/popupAction"

const initialState = {
  popupCard: false,
  popupOrder: false,
  popupOrderInfo: false
}

export const popupReduser = (state = initialState, action) => {
  switch (action.type) {
    case POPUP_ITEM_INFO: {
      return {
        ...state,
        popupCard: true
      }
    }    
    case POPUP_ORDER_ITEM_INFO: {
      return {
        ...state,
        popupOrderInfo: true
      }
    }
    case POPUP_ORDER: {
      return {
        ...state,
        popupOrder: true
      }
    }
    case POPUP_CLOSE: {
      return {
        popupCard: false,
        popupOrder: false,
        popupOrderInfo: false
      }
    }
    default: {
      return state
    }

  }
}
