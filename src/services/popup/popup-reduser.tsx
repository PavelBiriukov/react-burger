import { PopupActionTypes, TInitialState, TPopup } from "../popup/popup-type"




const initialState: TInitialState = { 
  popupCard: false,
  popupOrder: false,
  popupOrderInfo: false
}

export const popupReduser = (state = initialState, action: TPopup): TInitialState => {
  switch (action.type) {
    case PopupActionTypes.POPUP_ITEM_INFO: {
      return {
        ...state,
        popupCard: true
      }
    }    
    case PopupActionTypes.POPUP_ORDER_ITEM_INFO: {
      return {
        ...state,
        popupOrderInfo: true
      }
    }
    case PopupActionTypes.POPUP_ORDER: {
      return {
        ...state,
        popupOrder: true
      }
    }
    case PopupActionTypes.POPUP_CLOSE: {
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
