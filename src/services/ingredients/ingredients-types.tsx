export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number; 
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "main" | "sauce";
  __v: number;
  _id: string;
  id?: string;
  count?: number;
  index?: number;
}

export type TInitialState = {
	feedRequest: boolean;
  feedFailed: boolean;
	feed: TIngredient[];
}

export enum ListIgredientsActionTypes {
  GET_FEED = 'GET_FEED',
  GET_FEED_SUCCESS = 'GET_FEED_SUCCESS',
  GET_FEED_FAILED = 'GET_FEED_FAILED', 
  COUNT = 'COUNT',
}

export interface IGetFeedSuccess {
  readonly type: ListIgredientsActionTypes.GET_FEED_SUCCESS;
  feed: Array<TIngredient>; 
}
export interface IGetFeedFailed {
  readonly type: ListIgredientsActionTypes.GET_FEED_FAILED;
}
export interface IGetFeedReqest {
  readonly type: ListIgredientsActionTypes.GET_FEED;
}

export type TBurgerIngredients = 
  | IGetFeedSuccess
  | IGetFeedReqest
  | IGetFeedFailed