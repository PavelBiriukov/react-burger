import { POPUP_ITEM } from "../action/IngredientDetailsAction"

const initialState = {
  item: []
}

export const IngredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPUP_ITEM: {
      
      return {
        ...state,
        item: action.item
      }
    }
    default: {
      return state
    }

  }
}