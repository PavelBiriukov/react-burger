import { useCallback, useEffect, useMemo, useState } from 'react';
import React, {FC} from 'react';
import {
  ConstructorElement,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesConstructor from './BurgerConstructor.module.css';

import { useDrop } from 'react-dnd';
import BurgerConstructorItem from './BurgerConstrucntorItem/BurgerConstructorItem';
import { useHistory } from 'react-router-dom';
import { TLocation } from '../App/App'; 
import { useDispatch, useSelector } from '../../utils/hooks/reduxHooks';
import { TIngredient } from '../../services/ingredients/ingredients-types';
import { useActions } from '../../utils/hooks/useActions';
import { PopupActionTypes } from '../../services/popup/popup-type';
import { ConstructorActionTypes, TIngredientConstructor } from '../../services/constructor/constructor-type';


interface IDropItem {
	ingredient: TIngredient;
}

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.constructorReducer.feed);
  
  const allIngredients = useSelector(store => store.constructorReducer.ingredients);
  const bun = useSelector(store => store.constructorReducer.bun);
  const inLogin = useSelector(store => store.authReducer.inLogin);
  const [total, setTotal] = useState(0);
  const history = useHistory<TLocation>();

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item: IDropItem) {
      dispatch({
        type: ConstructorActionTypes.ADD_INGREDIENT,
        data: { ...item, id: Date.now() }
      })
    },
  })


  let burgerId:string[] = useMemo(() => allIngredients.map((item) => item.card._id), [allIngredients]);

  useEffect(() => {
    const ingredientsPrice = ingredients.reduce((sum: any, item) => +sum + item.card.price, []);
    const bunPrice = bun[0] ? bun[0].card.price * 2 : 0;
    const totalPrice = bunPrice + ingredientsPrice;
    setTotal(totalPrice)
  }, [ingredients, bun])
  const {getOrderAction} = useActions()
  const orderDispatch = useCallback((id: string[]) => {
    getOrderAction(id)
  }, [dispatch])

  const checkAuthUser = () => {
    if (!inLogin) {
      history.push('/login')
    } else {
      orderDispatch(burgerId);
      dispatch({type: PopupActionTypes.POPUP_ORDER})
    }
  }

  return (
    <section className={`${stylesConstructor.constructor} mt-25 ml-10`} ref={dropTarget}>
      <div className={`${stylesConstructor.ingredient} ml-8`}>
        {bun.length !== 0
          ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun[0].card.name} (вверх)`}
              price={bun[0].card.price}
              thumbnail={bun[0].card.image}
            />
          )
          : (
            <p className={`${stylesConstructor.bun}`}>Выберите булочку для бургера</p>
          )}
      </div>
      <div className={`${stylesConstructor.topings}`}>
        {ingredients.map((item: TIngredientConstructor, index: number) => {
          return (
            <BurgerConstructorItem
              key={item.id}
              id={item.id}
              type={item.card.type}
              name={item.card.name}
              price={item.card.price}
              image={item.card.image}
              index={index} />
          )
        })}

      </div>
      <div className={`${stylesConstructor.ingredient} ml-8`}>
        {bun.length !== 0 && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun[0].card.name} (низ)`}
            price={bun[0].card.price}
            thumbnail={bun[0].card.image}
          />
        )}
      </div>
      <div className={`${stylesConstructor.order} mt-6`}>
        <p className={`text text_type_digits-medium`}>
          {total}
          <span className='ml-2'><CurrencyIcon type="primary" /></span>
        </p>
        <Button
          htmlType='button'
          type="primary"
          size="large"
          disabled={bun.length === 0}
          onClick={() => {
            checkAuthUser();
          }}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default React.memo(BurgerConstructor);