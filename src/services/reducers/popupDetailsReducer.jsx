import { INLOADER } from "../action/authAction"
import { POPUP_ITEM } from "../action/IngredientDetailsAction"
import { LOADER } from "../action/orderDetailsAction"

const initialState = {
  item: [],
  priceOrder: null,
  loader: false
}

export const popupDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPUP_ITEM: {
      return {
        ...state,
        item: action.item,
        loader: false,
        priceOrder: action.priceOrder ? action.priceOrder : ''
      }
    }
    case LOADER: {
      return {
        loader: true
      }
    }
    case INLOADER: {
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