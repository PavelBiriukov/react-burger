import { TIngredient } from "../ingredients/ingredients-types";

export type TIngredientConstructor = {
  card: TIngredient;
  id: string;
}
export type TInitialState = {
	ingredients: TIngredientConstructor[];
  feed: TIngredientConstructor[];
	bun: TIngredientConstructor[];
}

export enum ConstructorActionTypes {
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  DELETE_ITEM = 'DELETE_ITEM',
  CHANGE_ITEM = 'CHANGE_ITEM',
  RESET_ITEMS = 'RESET_ITEMS',
}

export interface IAddIngredient {
  readonly type: typeof ConstructorActionTypes.ADD_INGREDIENT;
  ingredients: TIngredientConstructor;
  feed: TIngredientConstructor;
	bun: TIngredientConstructor;
  data: TIngredientConstructor;
}

export interface IDeleteItem {
  readonly type: typeof ConstructorActionTypes.DELETE_ITEM;
  feed: TIngredientConstructor;
  id: string
}

export interface IResetItem {
  readonly type: typeof ConstructorActionTypes.RESET_ITEMS;
  ingredients: TIngredientConstructor;
  feed: TIngredientConstructor;
	bun: TIngredientConstructor;
}
export interface IChangeItem {
  readonly type: typeof ConstructorActionTypes.CHANGE_ITEM;
  data: {
    dragIndex: number;
    dropIndex: number;
  }
}

export type TBurgerConstructorActions =
  | IAddIngredient
  | IDeleteItem
  | IChangeItem
  | IResetItem;