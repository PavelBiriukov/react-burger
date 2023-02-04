import IngredientServis from "../../api/IngredientsServis";
import { IGetFeedFailed, IGetFeedReqest, IGetFeedSuccess, ListIgredientsActionTypes, TIngredient } from "../ingredients/ingredients-types";
import { AppDispatch} from "../types";

export const IngredientsActionCreators = {
  setFeed: (): IGetFeedReqest => ({type: ListIgredientsActionTypes.GET_FEED}),
  setIngredient: (ingredients: TIngredient[]): IGetFeedSuccess => ({type: ListIgredientsActionTypes.GET_FEED_SUCCESS, feed: ingredients}),
  setError: (): IGetFeedFailed => ({type: ListIgredientsActionTypes.GET_FEED_FAILED}),
  fetchIngredients: () => async (dispatch: AppDispatch) => {
    try{ 
      dispatch(IngredientsActionCreators.setFeed());
      const response = (await IngredientServis.getIngredient()).data;
      if (response && response.success) {
        dispatch(IngredientsActionCreators.setIngredient(response.data))
      }
    }
    catch(e){
      dispatch(IngredientsActionCreators.setError())
    }
  },
}

