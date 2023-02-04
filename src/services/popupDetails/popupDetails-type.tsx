import { TIngredient } from "../ingredients/ingredients-types";

export type TIngredientsInfo = {
  _id: string;
  ingredients: TIngredient[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}
export type TInitialState = {
	item: TIngredientsInfo | null;
  priceOrder: string | number | null;
  loader: boolean;
} 

export enum FetchPopapDetalisAction {
  INLOADER = 'INLOADER',
  LOADER = 'LOADER',
  POPUP_ITEM = 'POPUP_ITEM'
}

export interface IItemInfo {
  readonly type: typeof FetchPopapDetalisAction.POPUP_ITEM;
  item: TIngredientsInfo;
  priceOrder: string | number ;
}
interface ILoader {
  readonly type: typeof FetchPopapDetalisAction.LOADER;
  loader?: boolean;
}
interface IInLoader {
  readonly type: typeof FetchPopapDetalisAction.INLOADER;
  loader?: boolean;
}

export type TOrderInfo = 
  | IItemInfo
  | ILoader
  | IInLoader;