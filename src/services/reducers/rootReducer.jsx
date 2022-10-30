import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { constructorReducer } from "./constructorReducer";
import { popupDetailsReducer } from "./popupDetailsReducer";
import { listIgredientsReducer } from "./listIgredientsReducer";
import { orderDetailsReduser } from "./orderDetailsReduser";
import { popupReduser } from "./popupReduser";
import { wsReduser } from "./wsReduser";

export const rootReducer = combineReducers({
  listIgredients: listIgredientsReducer,
  constructorReducer: constructorReducer,
  popupDetailsReducer: popupDetailsReducer,
  orderDetailsReduser: orderDetailsReduser,
  authReducer: authReducer,
  popupReduser: popupReduser,
  wsReduser: wsReduser
})