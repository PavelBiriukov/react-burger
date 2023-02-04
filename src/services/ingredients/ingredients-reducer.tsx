import { ListIgredientsActionTypes, TBurgerIngredients, TInitialState } from "../ingredients/ingredients-types";

const initialState: TInitialState = {
  feedRequest: true,
  feedFailed: false, 
  feed: [],
};


export const listIgredientsReducer = (state = initialState,  action: TBurgerIngredients): TInitialState => {
  switch (action.type) {
    case ListIgredientsActionTypes.GET_FEED: {
      return {
        ...state,
        feedRequest: true,
        feedFailed: false
      }
    }
    case ListIgredientsActionTypes.GET_FEED_SUCCESS: {
      return {
        ...state,
        feed: action.feed,
        feedRequest: false
      }
    }
    case ListIgredientsActionTypes.GET_FEED_FAILED: {
      return {
        ...state,
        feedFailed: true,
        feedRequest: false
      }
    }
    default: {
      return state
    }
  }
}