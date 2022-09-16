import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { IngredientDetailsReducer } from "./IngredientDetailsReducer";
import { listIgredientsReducer } from "./listIgredientsReducer";
import { orderDetailsReduser } from "./orderDetailsReduser";

export const rootReducer = combineReducers({
  listIgredients: listIgredientsReducer,
  constructorReducer: constructorReducer,
  IngredientDetailsReducer: IngredientDetailsReducer,
  orderDetailsReduser: orderDetailsReduser
})