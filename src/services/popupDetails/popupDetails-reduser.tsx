import { FetchPopapDetalisAction, TInitialState, TOrderInfo } from "../popupDetails/popupDetails-type"




const initialState: TInitialState = {
  item: null,
  priceOrder: null,
  loader: false
}

export const popupDetailsReducer = (state = initialState, action: TOrderInfo): TInitialState => {
  switch (action.type) {
    case FetchPopapDetalisAction.POPUP_ITEM: {
      return {
        ...state,
        item: action.item,
        loader: false,
        priceOrder: action.priceOrder ? action.priceOrder : ''
      }
    }
    case FetchPopapDetalisAction.LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case FetchPopapDetalisAction.INLOADER: {
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