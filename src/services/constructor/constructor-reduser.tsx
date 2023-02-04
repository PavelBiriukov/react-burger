import { ConstructorActionTypes, TBurgerConstructorActions, TInitialState } from '../constructor/constructor-type';

const initialState: TInitialState = { 
  ingredients:[],
  feed: [],
  bun: []
};

export const constructorReducer = (state = initialState, action: TBurgerConstructorActions): TInitialState => {
  switch (action.type) {
    case ConstructorActionTypes.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.data],
        bun: action.data.card.type === 'bun' ? [action.data] : [...state.bun],
        feed: action.data.card.type !== 'bun' ? [...state.feed, action.data] : [...state.feed]
      }
    };

    case ConstructorActionTypes.DELETE_ITEM: {

      return {
        ...state,
        feed:
          [...state.feed].filter(item => {;
            return item.id !== action.id
          })
      }
    };
    case ConstructorActionTypes.RESET_ITEMS: {
      return {
        ingredients:[],
        feed: [],
        bun: []
      }
    };

    case ConstructorActionTypes.CHANGE_ITEM: {
      const constructorItems = [...state.feed];
      constructorItems.splice(action.data.dragIndex, 0, constructorItems.splice(action.data.dropIndex, 1)[0])

      return {
        ...state,
        feed: constructorItems
      }
    };

    default: {
      return state
    }
  }
}