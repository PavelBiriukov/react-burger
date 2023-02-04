import { AuthActionCreators } from "../services/auth/auth-action";
import { IngredientsActionCreators } from "../services/ingredients/ingredients-action";
import { OrderActionCreators } from "../services/order/order-action";

export const allActionsCeaters = {
  ...IngredientsActionCreators,
  ...AuthActionCreators,
  ...OrderActionCreators,
}