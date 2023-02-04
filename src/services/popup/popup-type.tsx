export type TInitialState = {
	popupCard: boolean;
	popupOrder: boolean;
	popupOrderInfo: boolean;
}

export enum PopupActionTypes {
  POPUP_ITEM_INFO = 'POPUP_ITEM_INFO',
  POPUP_ORDER_ITEM_INFO = 'POPUP_ORDER_ITEM_INFO',
  POPUP_ORDER = 'POPUP_ORDER',
  POPUP_CLOSE = 'POPUP_CLOSE',
}
interface IPopupItemInfo {
  readonly type: typeof PopupActionTypes.POPUP_ITEM_INFO;
}

interface IPopuoOrder { 
  readonly type: typeof PopupActionTypes.POPUP_ORDER;
}

interface IPopupOrderInfo {
  readonly type: typeof PopupActionTypes.POPUP_ORDER_ITEM_INFO;
}
interface IPopupClose {
  readonly type: typeof PopupActionTypes.POPUP_CLOSE;
}

export type TPopup = 
  | IPopupItemInfo
  | IPopuoOrder
  | IPopupOrderInfo
  | IPopupClose;