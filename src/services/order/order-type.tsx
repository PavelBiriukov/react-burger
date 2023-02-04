
export type TInitialState = {
	feedRequest: boolean;
  feedFailed: boolean;
  loader: boolean;
	order: number | null ;
}
export enum OrderDetailsActionTypes {
  GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
  GET_ORDER_FAILED = 'GET_ORDER_FAILED',
  GET_ORDER = 'GET_ORDER',
  LOADER = 'LOADER',
  RESET_ITEMS = 'RESET_ITEMS',
  INLOADER = 'INLOADER'
}

export interface ILoader {
  readonly type: typeof OrderDetailsActionTypes.LOADER;
  loader?: boolean;
}

export interface IInLoader {
  readonly type: typeof OrderDetailsActionTypes.INLOADER;
  loader?: boolean;
}
export interface IGetOrderSuccess {
  type: OrderDetailsActionTypes.GET_ORDER_SUCCESS,
  order: number;
}

export interface IGetOrderFailed {
  type: OrderDetailsActionTypes.GET_ORDER_FAILED;
}

export interface IResetItems {
  type: OrderDetailsActionTypes.RESET_ITEMS;
}

export type TGetOrder = 
  | IGetOrderSuccess
  | IGetOrderFailed
  | IResetItems
  | ILoader
  | IInLoader;