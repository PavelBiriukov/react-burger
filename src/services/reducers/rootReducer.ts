import { combineReducers } from "redux";
import { listIgredientsReducer } from "../ingredients/ingredients-reducer";
import { authReducer } from "../auth/auth-reducer";
import { constructorReducer } from "../constructor/constructor-reduser";
import { popupDetailsReducer } from "../popupDetails/popupDetails-reduser";
import { orderDetailsReduser } from "../order/order-reducer";
import { popupReduser } from "../popup/popup-reduser";
import { wsReduser } from "../webSocket/WebSocket-reduser";

export const rootReducer = combineReducers({
  listIgredients: listIgredientsReducer,
  constructorReducer: constructorReducer,
  popupDetailsReducer: popupDetailsReducer,
  orderDetailsReduser: orderDetailsReduser,
  authReducer: authReducer,
  popupReduser: popupReduser,
  wsReduser: wsReduser
})