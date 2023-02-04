import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { store } from "../../index";
import { TLoader } from "../action/actionCreator";
import { TAuthActions } from "../auth/auth-type";
import { TBurgerIngredients } from "../ingredients/ingredients-types";
import { TGetOrder } from "../order/order-type";
import { rootReducer } from "../reducers/rootReducer"
import { TWsActions } from "../webSocket/WebSocket-type";

type TApplicationActions =
  | TAuthActions
  | TBurgerIngredients
  | TGetOrder
  | TWsActions
  | TLoader;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>