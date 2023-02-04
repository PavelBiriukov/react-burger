import OrderServis from "../../api/OrderServis";
import { inLoader, loader } from "../action/actionCreator";
import { IGetOrderFailed, IGetOrderSuccess, IResetItems, OrderDetailsActionTypes } from "../order/order-type";
import { AppDispatch } from "../types";



export const OrderActionCreators = {
  orderSuccess: (id: number): IGetOrderSuccess => ({type: OrderDetailsActionTypes.GET_ORDER_SUCCESS, order: id}),
  orderFailed: (): IGetOrderFailed => ({type: OrderDetailsActionTypes.GET_ORDER_FAILED}),
  resetItem: (): IResetItems => ({type: OrderDetailsActionTypes.RESET_ITEMS}),
  getOrderAction: (id: string[]) => async (dispatch: AppDispatch) => {
    try {
      loader();
      const response = (await OrderServis.postOrder(id)).data;
      if (response && response.success) {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch(OrderActionCreators.orderSuccess(response.order.number));
        dispatch(OrderActionCreators.resetItem())
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(OrderActionCreators.orderFailed())
      }
    } catch (error) {
      dispatch(OrderActionCreators.orderFailed())
    }
    finally {
      inLoader()
    }
  }
}