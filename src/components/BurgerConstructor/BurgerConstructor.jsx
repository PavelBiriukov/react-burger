import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesConstructor from './BurgerConstructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENT } from '../../services/action/constructorAction';
import BurgerConstructorItem from './BurgerConstrucntorItem/BurgerConstructorItem';
import { getOrderAction } from '../../services/action/orderDetailsAction';


const BurgerConstructor = ({ setActive }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.constructorReducer.feed);
  const allIngredients = useSelector(store => store.constructorReducer.ingredients);
  const bun = useSelector(store => store.constructorReducer.bun);
  const [total, setTotal] = useState(0);
  const [, dropTarget] = useDrop({

    accept: 'ingredients',
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        data: { ...item, id: Date.now() }
      })
    },
  })


  let burgerId = useMemo(() => allIngredients.map((item) => item.card._id), [allIngredients]);
  const orderDispatch = (id) => {
    dispatch(getOrderAction(id))
  }

  useEffect(() => {

    const ingredientsPrice = ingredients.reduce((sum, item) => +sum + item.card.price, []);
    const bunPrice = bun[0] ? bun[0].card.price * 2 : 0;
    const totalPrice = bunPrice + ingredientsPrice;
    setTotal(totalPrice)
  }, [ingredients, bun])

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
        {ingredients.map((item, index) => {
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
          type="primary"
          size="large"
          disabled={bun.length === 0}
          onClick={() => {
            setActive(true);
            orderDispatch(burgerId)
          }}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
BurgerConstructor.propTypes = {
  setActive: PropTypes.func
}
export default React.memo(BurgerConstructor);